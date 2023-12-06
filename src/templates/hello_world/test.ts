import { expect, find, resetSandbox } from "@/lib/testing";

export default async function test() {
	await resetSandbox();
	const heading = find("h1");
	expect(heading.text).toBe("Hello World");
}
