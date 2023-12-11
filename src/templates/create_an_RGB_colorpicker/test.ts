import { rgbFromString, rgbToHex } from "@/lib/color";
import { context, expect, find, findAll, resetSandbox } from "@/lib/testing";

export default async function test() {
	await resetSandbox();

	context("finding color preview");
	const colorPreview = find(".color-preview");

	context("finding rgb sliders");
	const sliders = findAll(".color-slider");
	const inputs = findAll(".color-input");

	const rSlider = sliders.at(0);
	const gSlider = sliders.at(1);
	const bSlider = sliders.at(2);

	const rInput = inputs.at(0);
	const gInput = inputs.at(1);
	const bInput = inputs.at(2);

	context("finding hex input");
	const hexInput = find(".hex-color");

	const testColor = (color: { r: number; b: number; g: number }) => {
		expect(hexInput.value).toBe(rgbToHex(color));

		expect(rSlider.value).asInteger().toBe(color.r);
		expect(gSlider.value).asInteger().toBe(color.g);
		expect(bSlider.value).asInteger().toBe(color.b);

		expect(rInput.value).asInteger().toBe(color.r);
		expect(gInput.value).asInteger().toBe(color.g);
		expect(bInput.value).asInteger().toBe(color.b);

		let colorString = colorPreview.getComputedCssValue("background-color");
		if (colorString === "") {
			colorString = colorPreview.getComputedCssValue("background");
		}

		const previewRgb = rgbFromString(colorString);
		expect(previewRgb).toBe(color);
	};

	const testColors = [
		{ r: 135, g: 39, b: 125 },
		{ r: 0, g: 0, b: 0 },
		{ r: 255, g: 255, b: 255 },
		{ r: 0, g: 255, b: 99 },
	] as const;

	for (const color of testColors) {
		context(`testing hex input with color ${rgbToHex(color)}`);
		await hexInput.setValue(rgbToHex(color));
		testColor(color);
	}

	for (const color of testColors) {
		context(`testing slider input with color ${rgbToHex(color)}`);
		await rSlider.setValue(color.r.toString());
		await gSlider.setValue(color.g.toString());
		await bSlider.setValue(color.b.toString());
		testColor(color);
	}

	for (const color of testColors) {
		context(`testing number input with color ${rgbToHex(color)}`);
		await rInput.setValue(color.r.toString());
		await gInput.setValue(color.g.toString());
		await bInput.setValue(color.b.toString());
		testColor(color);
	}

	await resetSandbox();
}
