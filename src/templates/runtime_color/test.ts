import { context, expect, find, findAll, resetSandbox } from "@/lib/testing";

export default async function test() {
	await resetSandbox();

	context("check if button color changes on input color change");
	const colorInput = find(".button-color-input");
	const colorableButton = find(".colorable-button");

	const colorBefore = colorableButton.computedStyle.color;
	const borderColorBefore = colorableButton.computedStyle.borderColor;
	const backgroundColorBefore = colorableButton.computedStyle.backgroundColor;

	await colorInput.setValue("#ff0f0f");

	const colorAfter = colorableButton.computedStyle.color;
	const borderColorAfter = colorableButton.computedStyle.borderColor;
	const backgroundColorAfter = colorableButton.computedStyle.backgroundColor;

	expect(colorBefore).not.toBe(colorAfter);
	expect(borderColorBefore).not.toBe(borderColorAfter);
	expect(backgroundColorBefore).not.toBe(backgroundColorAfter);

	context("testing if all buttons have a different color");
	const colorButtons = findAll(".color-button");
	const seenColors = new Set();

	colorButtons.wrappers.forEach((button) => {
		const color = button.computedStyle.backgroundColor;
		expect(seenColors).not.toContain(color);
		seenColors.add(color);
	});
}
