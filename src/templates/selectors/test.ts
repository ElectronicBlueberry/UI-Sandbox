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
	const parentSections = mainPanel.findAll(":scope > section");

	parentSections.wrappers.forEach((parentSection) => {
		const subSections = parentSection.findAll(":scope > section");

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

	context("checking if only boxes without heading have a border");
	const newsItemBox = mainPanel.find(".news-item-box");
	const newsItems = newsItemBox.findAll(".news-item");

	newsItems.wrappers.forEach((newsItem) => {
		const borderStyle = newsItem.computedStyle.borderWidth;

		if (!newsItem.hasChild("h3")) {
			expect(borderStyle).not.toBe("0px");
		} else {
			expect(borderStyle).toBe("0px");
		}
	});

	context("checking if only boxes with an img tag have a light-blue color");
	newsItems.wrappers.forEach((newsItem) => {
		const backgroundColor = newsItem.computedStyle.backgroundColor;

		if (newsItem.hasChild("img")) {
			expect(backgroundColor).toBe("rgb(109, 147, 252)");
		} else {
			expect(backgroundColor).not.toBe("rgb(109, 147, 252)");
		}
	});
}
