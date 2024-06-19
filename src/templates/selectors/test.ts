import { context, expect, find, resetSandbox } from "@/lib/testing";

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

	context("testing if sub-sections have different colors");
	const parentSections = mainPanel.findAll("section:has(section)");

	parentSections.wrappers.forEach((parentSection) => {
		const subSections = parentSection.findAll("section");

		const parentSectionColor =
			parentSection.computedStyle.backgroundColor ??
			parentSection.computedStyle.background;

		subSections.wrappers.forEach((section) => {
			const sectionColor =
				section.computedStyle.backgroundColor ??
				section.computedStyle.background;

			expect(sectionColor).not.toBe(parentSectionColor);
		});
	});
}
