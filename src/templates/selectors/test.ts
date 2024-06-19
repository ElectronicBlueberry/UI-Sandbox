import { context, expect, find, findAll, resetSandbox } from "@/lib/testing";

export default async function test() {
	await resetSandbox();

	const mainPanel = find(".galaxy-panel-layout .main");

	context("checking if no span or div elements were added to heading elements");
	const headings = mainPanel.findAll("h1, h2");

	headings.wrappers.forEach((heading) => {
		const sibling = heading.getNextSibling();
		expect(sibling.element).not.toBeInstanceOf(HTMLDivElement);
		expect(sibling.element).not.toBeInstanceOf(HTMLSpanElement);
	});
}
