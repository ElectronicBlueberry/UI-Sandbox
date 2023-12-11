export function rgbToHex(rgb: { r: number; g: number; b: number }) {
	function nToH(n: number) {
		return n.toString(16).padStart(2, "0");
	}

	return `#${nToH(rgb.r)}${nToH(rgb.g)}${nToH(rgb.b)}`;
}

export function hexToRgb(hex: string) {
	const rgb = { r: 0, g: 0, b: 0 };

	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!result) {
		throw new Error(`String "${hex}" could not be parsed as rgb hex code`);
	}

	rgb.r = parseInt(result[1]!, 16);
	rgb.g = parseInt(result[2]!, 16);
	rgb.b = parseInt(result[3]!, 16);

	return rgb;
}

export function rgbFromString(rgbString: string) {
	const rgb = { r: 0, g: 0, b: 0 };

	const result = /^rgb\(([0-9]{1,3}), ([0-9]{1,3}), ([0-9]{1,3})\)/i.exec(
		rgbString,
	);
	if (!result) {
		throw new Error(`String "${rgbString}" could not be parsed as rgb`);
	}

	rgb.r = parseInt(result[1]!);
	rgb.g = parseInt(result[2]!);
	rgb.b = parseInt(result[3]!);

	return rgb;
}
