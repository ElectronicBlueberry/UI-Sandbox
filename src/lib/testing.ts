import { nextTick } from "vue";
import { useSandboxReset } from "./useSandboxReset";
import { useTestingContext } from "./useTestingContext";

export const { context, clearContext } = useTestingContext();

const rootSelector = ".main-sandbox-component";

class ElementWrapper {
	element: Element;
	selector: string;

	constructor(element: Element, selector: string) {
		this.element = element;
		this.selector = selector;
	}

	isHtmlElement() {
		return this.element instanceof HTMLElement;
	}

	isInputElement() {
		return this.element instanceof HTMLInputElement;
	}

	isSelectElement() {
		return this.element instanceof HTMLSelectElement;
	}

	get text() {
		if (!this.isHtmlElement()) {
			throw new Error(
				`Can not get text on element "${this.selector}", because it is not an HTMLElement`,
			);
		}

		return (this.element as HTMLElement).innerText;
	}

	get html() {
		return this.element.innerHTML;
	}

	get attrs() {
		return this.element.attributes;
	}

	get value() {
		if (!this.isInputElement() && !this.isSelectElement()) {
			throw new Error(
				`Can not get value on element "${this.selector}", because it is not an HTMLInputElement or an HTMLSelectElement`,
			);
		}

		return (this.element as HTMLInputElement).value;
	}

	get computedStyle() {
		return getComputedStyle(this.element);
	}

	getComputedCssValue(property: string) {
		return this.computedStyle.getPropertyValue(property);
	}

	async setValue(newValue: string) {
		if (!this.isInputElement() && !this.isSelectElement()) {
			throw new Error(
				`Can not set value on element "${this.selector}", because it is not an HTMLInputElement or an HTMLSelectElement`,
			);
		}

		(this.element as HTMLInputElement).value = newValue;

		let event;

		if (this.isInputElement()) {
			event = new Event("input", {
				bubbles: true,
				cancelable: true,
			});
		} else {
			event = new Event("change", {
				bubbles: true,
				cancelable: true,
			});
		}

		(this.element as HTMLInputElement).dispatchEvent(event);

		await nextTick();
	}

	async click() {
		if (!this.isHtmlElement()) {
			throw new Error(
				`Can not click element "${this.selector}", because it is not an HTMLElement`,
			);
		}

		(this.element as HTMLElement).click();
		await nextTick();
	}

	async focus() {
		if (!this.isHtmlElement()) {
			throw new Error(
				`Can not focus element "${this.selector}", because it is not an HTMLElement`,
			);
		}

		(this.element as HTMLElement).focus();
		await nextTick();
	}

	find(selector: string) {
		const element = this.element.querySelector(selector);

		if (!element) {
			throw new Error(
				`No child of element "${this.selector}" found with selector "${selector}`,
			);
		}

		return new ElementWrapper(element, `${this.selector} ${selector}`);
	}

	findAll(selector: string) {
		const list = this.element.querySelectorAll(selector);

		if (list.length === 0) {
			console.warn(
				`No children of element "${this.selector}" found with selector "${selector}"`,
			);
		}

		return new ElementWrapperList(list, `${this.selector} ${selector}`);
	}

	hasChild(selector: string) {
		const element = this.element.querySelector(selector);
		return Boolean(element);
	}

	getNextSibling() {
		const element = this.element.nextElementSibling;

		if (!element) {
			throw new Error(
				`Element with selector "${this.selector}" has no next sibling`,
			);
		}

		return new ElementWrapper(element, `${this.selector} + *`);
	}
}

class ElementWrapperList {
	wrappers: ElementWrapper[];
	selector: string;

	constructor(elements: NodeListOf<Element>, selector: string) {
		this.wrappers = Array.from(elements.entries()).map(
			([_index, element]) => new ElementWrapper(element, selector),
		);
		this.selector = selector;
	}

	get elements() {
		return this.wrappers.map((wrapper) => wrapper.element);
	}

	get texts() {
		return this.wrappers.map((wrapper) => wrapper.text);
	}

	at(index: number) {
		const element = this.wrappers[index];

		if (!element) {
			throw new Error(
				`No element with index "${index}" found in element list "${this.selector}". List has a length of ${this.elements.length}`,
			);
		}

		return element;
	}
}

export function find(selector: string): ElementWrapper {
	const element = document.querySelector(`${rootSelector} ${selector}`);

	if (!element) {
		throw new Error(`No element found with selector "${selector}"`);
	}

	return new ElementWrapper(element, selector);
}

export function findAll(selector: string): ElementWrapperList {
	const list = document.querySelectorAll(`${rootSelector} ${selector}`);

	if (list.length === 0) {
		console.warn(`No elements found with selector "${selector}"`);
	}

	return new ElementWrapperList(list, selector);
}

export async function resetSandbox() {
	const { reset } = useSandboxReset();
	reset();
	await nextTick();
}

function typeMatch(a: unknown, b: unknown) {
	if (typeof a !== typeof b) {
		return false;
	}

	if ((a === null && b !== null) || (a !== null && b === null)) {
		return false;
	}

	if (
		(Array.isArray(a) && !Array.isArray(b)) ||
		(Array.isArray(b) && !Array.isArray(a))
	) {
		return false;
	}

	return true;
}

function objectEquality(a: object | null, b: object | null) {
	if (a === null && b === null) {
		return true;
	}

	if (a === null) {
		return false;
	}

	if (b === null) {
		return false;
	}

	for (const key in a) {
		const valueA = a[key as keyof object] as unknown;
		const valueB = b[key as keyof object] as unknown;

		if (!typeMatch(valueA, valueB)) {
			return false;
		}

		if (valueA === null && valueB === null) {
			continue;
		}

		if (typeof valueA === "object") {
			const isEqual = objectEquality(valueA as object, valueB as object);
			if (isEqual) {
				continue;
			}
		}

		if (valueA === valueB) {
			continue;
		}

		return false;
	}

	return true;
}

class Expecter {
	private value: unknown;

	constructor(value: unknown) {
		this.value = value;
	}

	toBe(otherValue: unknown) {
		this.assertType(otherValue);
		let valid = true;

		switch (typeof this.value) {
			case "object":
				valid =
					objectEquality(this.value, otherValue as object) &&
					objectEquality(otherValue as object, this.value);
				break;
			default:
				valid = this.value === otherValue;
		}

		if (!valid) {
			throw new Error(
				`Value mismatch!\nExpected: ${otherValue}\nFound: ${this.value}`,
			);
		}
	}

	toBeInstanceOf(classConstructor: Function) {
		if (typeof this.value !== "object" && this.value !== null) {
			const type = this.value ? typeof this.value : "null";
			throw new Error(
				`Type mismatch during instance check!\nExpected type of object\nFound: ${type}`,
			);
		}

		if (!((this.value as any) instanceof classConstructor)) {
			throw new Error(
				`Instance mismatch!\nExpected instance of: ${
					classConstructor.name
				}\nFound: ${this.value?.constructor.name ?? "constructor-less object"}`,
			);
		}
	}

	toContain(partialValue: unknown) {
		let valid = true;
		if (Array.isArray(this.value)) {
			valid = this.value.includes(partialValue);
		} else {
			this.assertType(partialValue);

			switch (typeof this.value) {
				case "object":
					valid = objectEquality(partialValue as object, this.value);
					break;
				case "string":
					valid = this.value.includes(partialValue as string);
					break;
				default:
					valid = this.value === partialValue;
			}
		}

		if (!valid) {
			throw new Error(
				`Partial value mismatch!\nExpected: ${partialValue}\nIn Actual: ${this.value}`,
			);
		}
	}

	toBeBetween(from: number) {
		if (typeof this.value !== "number") {
			throw new Error(`Wrong type! Value ${this.value} is not a number`);
		}

		return {
			and: (to: number) => {
				const valid =
					(this.value as number) >= from && (this.value as number) <= to;
				if (!valid) {
					throw new Error(
						`Range Error!\nActual value: ${this.value}\nNot in range: from ${from} to ${to}`,
					);
				}
			},
		};
	}

	private assertType(otherValue: unknown) {
		if (!typeMatch(this.value, otherValue)) {
			throw new Error(
				`Type mismatch.\nExpected: ${otherValue}\nFound: ${this.value}`,
			);
		}
	}

	asNumber() {
		switch (typeof this.value) {
			case "boolean":
				return new Expecter(this.value ? 1 : 0);
			case "string":
				return new Expecter(parseFloat(this.value));
			case "number":
				return this;
			case "bigint":
				return new Expecter(parseFloat(this.value.toString()));
			default:
				throw new Error(
					`Can not convert value of type "${typeof this.value}" to number`,
				);
		}
	}

	asString() {
		return new Expecter(`${this.value}`);
	}

	asInteger() {
		switch (typeof this.value) {
			case "boolean":
				return new Expecter(this.value ? 1 : 0);
			case "string":
				return new Expecter(parseInt(this.value));
			case "number":
				return new Expecter(Math.round(this.value));
			case "bigint":
				return this;
			default:
				throw new Error(
					`Can not convert value of type "${typeof this.value}" to integer`,
				);
		}
	}

	asBoolean() {
		switch (typeof this.value) {
			case "boolean":
				return this;
			case "string":
				if (this.value.toLowerCase() === "true") {
					return new Expecter(true);
				} else if (this.value.toLowerCase() === "false") {
					return new Expecter(false);
				} else {
					return new Expecter(undefined);
				}
			case "number":
			case "bigint":
				return new Expecter(this.value > 1);
			default:
				return new Expecter(Boolean(this.value));
		}
	}

	get not() {
		return new InvertedExpecter(this, this.value);
	}
}

class InvertedExpecter {
	private expecter: Expecter;
	private value: unknown;

	constructor(expecter: Expecter, value: unknown) {
		this.expecter = expecter;
		this.value = value;
	}

	toBe(otherValue: unknown) {
		let valid = true;

		try {
			this.expecter.toBe(otherValue);
			valid = false;
		} catch (_e) {
			valid = true;
		}

		if (!valid) {
			throw new Error(
				`Value mismatch!\nExpected not to be: ${otherValue}\nFound: ${this.value}`,
			);
		}
	}

	toBeInstanceOf(classConstructor: Function) {
		let valid = true;

		try {
			this.expecter.toBeInstanceOf(classConstructor);
			valid = false;
		} catch (_e) {
			valid = true;
		}

		if (!valid) {
			throw new Error(
				`Instance mismatch!\nExpected to not be instance of: ${
					classConstructor.name
				}\nFound: ${this.value?.constructor.name ?? "constructor-less object"}`,
			);
		}
	}

	toContain(otherValue: unknown) {
		let valid = true;

		try {
			this.expecter.toContain(otherValue);
			valid = false;
		} catch (_e) {
			valid = true;
		}

		if (!valid) {
			throw new Error(
				`Partial value mismatch!\nExpected: ${otherValue}\nNot to be in Actual: ${this.value}`,
			);
		}
	}

	toBeBetween(from: number) {
		if (typeof this.value !== "number") {
			throw new Error(`Wrong type! Value ${this.value} is not a number`);
		}

		return {
			and: (to: number) => {
				const invalid =
					(this.value as number) >= from && (this.value as number) <= to;

				if (!invalid) {
					throw new Error(
						`Range Error!\nActual value: ${this.value}\nShould not be in range: from ${from} to ${to}`,
					);
				}
			},
		};
	}
}

export function expect(value: unknown): Expecter {
	return new Expecter(value);
}
