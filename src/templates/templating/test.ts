import { context, expect, find, findAll, resetSandbox } from "@/lib/testing";

export default async function test() {
	await resetSandbox();

	context("testing button count even/odd indicator");
	const button = find("button");

	const expectEven = () => {
		const spans = findAll("span");
		expect(spans.texts).toContain("Count is even");
		expect(spans.texts).not.toContain("Count is odd");
	};

	const expectOdd = () => {
		const spans = findAll("span");
		expect(spans.texts).toContain("Count is odd");
		expect(spans.texts).not.toContain("Count is even");
	};

	for (let i = 0; i < 10; i++) {
		await button.click();
		expectOdd();

		await button.click();
		expectEven();
	}

	await resetSandbox();
	context("testing name list");
	const input = find("input");
	const list = find("ol");

	{
		const names = ["Alex", "Addison", "Casey"];
		await input.setValue(names.join(","));
		const items = list.findAll("li");
		expect(items.texts).toBe(names);
	}

	{
		const names = ["foo", "bar", "baz", "fizz", "buzz", "1", "2"];
		await input.setValue(names.join(","));
		const items = list.findAll("li");
		expect(items.texts).toBe(names);
	}

	await resetSandbox();
}
