import { context, expect, findAll, resetSandbox } from "@/lib/testing";

export default async function test() {
	await resetSandbox();

	context("testing if all buttons have a different color");
	const colorButtons = findAll(".color-button");
	const seenColors = new Set();

	colorButtons.wrappers.forEach((button) => {
		const color = button.computedStyle.backgroundColor;
		expect(seenColors).not.toContain(color);
		seenColors.add(color);
	});
}
