import { expect, find, resetSandbox } from "@/lib/testing";

export default async function test() {
	await resetSandbox();

	const button = find("button");
	const input = find("input");

	const counter = find("#button-counter");
	const capitalized = find("#input-capitalized");

	expect(counter.text).asInteger().toBe(0);

	await button.click();
	expect(counter.text).asInteger().toBe(1);

	await button.click();
	expect(counter.text).asInteger().toBe(2);

	await button.click();
	expect(counter.text).asInteger().toBe(3);

	await input.setValue("hello");
	expect(capitalized.text).toBe("HELLO");

	await input.setValue("hello world");
	expect(capitalized.text).toBe("HELLO WORLD");

	await resetSandbox();
}
