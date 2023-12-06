import { expect, find } from "@/lib/testing";

export default function test() {
	const heading = find("h1");
	expect(heading.text).toBe("Hello World");
}
