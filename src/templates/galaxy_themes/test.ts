import { context, expect, find } from "@/lib/testing";

export default async function test() {
	context("testing if the alert box is themed in the pride theme");
	const alertBox = find(".alert-box");
	const themeSelector = find(".theme-selector");

	await themeSelector.setValue("none");
	const alertBoxBackgroundDefault = alertBox.computedStyle.background;

	await themeSelector.setValue("pride");
	const alertBoxBackgroundPride = alertBox.computedStyle.background;

	expect(alertBoxBackgroundPride).not.toBe(alertBoxBackgroundDefault);
}
