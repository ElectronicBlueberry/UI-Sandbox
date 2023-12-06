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

	find(selector: string) {
		const newSelector = `${this.selector} ${selector}`;
		const element = document.querySelector(`${rootSelector} ${newSelector}`);

		if (!element) {
			throw new Error(
				`No child of element "${this.selector}" found with selector "${selector}`,
			);
		}

		return new ElementWrapper(element, newSelector);
	}
}

export function find(selector: string): ElementWrapper {
	const element = document.querySelector(`${rootSelector} ${selector}`);

	if (!element) {
		throw new Error(`No element found with selector "${selector}"`);
	}

	return new ElementWrapper(element, selector);
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
	value: unknown;

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

	toContain(partialValue: unknown) {
		this.assertType(partialValue);
		let valid = true;

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

		if (!valid) {
			throw new Error(
				`Partial value mismatch!\nExpected: ${partialValue}\nIn Actual: ${this.value}`,
			);
		}
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
				if (this.value.toLocaleLowerCase() === "true") {
					return new Expecter(true);
				} else if (this.value.toUpperCase() === "false") {
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
}

export function expect(value: unknown): Expecter {
	return new Expecter(value);
}
