import { context, expect, find, resetSandbox } from "@/lib/testing";

export default async function test() {
	await resetSandbox();

	context("checking if slider changes box color");
	const box = find(".sliding-box");
	const slider = find(".position-slider");

	const colorBefore = box.computedStyle.backgroundColor;
	await slider.setValue("1");
	const colorAfter = box.computedStyle.backgroundColor;

	expect(colorAfter).not.toBe(colorBefore);

	context("checking if the slider moves the box");
	await slider.setValue("0");

	const positionBefore = box.computedStyle.left;
	await slider.setValue("1");
	const positionAfter = box.computedStyle.left;

	expect(positionAfter).not.toBe(positionBefore);
}
