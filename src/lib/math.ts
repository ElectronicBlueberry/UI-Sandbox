export function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(value, min));
}

/**
 * Determines width given the bounding boxes of the root and draggable element,
 * smallest and largest size and the current position of the draggable element
 * */
export function determineWidth(
	rectRoot: { left: number; right: number },
	rectDraggable: { left: number; right: number },
	minWidth: number,
	maxWidth: number,
	direction: "left" | "right",
	positionX: number,
) {
	let newWidth = minWidth;

	if (direction === "right") {
		const offset = rectRoot.left - rectDraggable.left;
		newWidth = rectRoot.right - positionX - offset;
	} else {
		const offset = rectRoot.right - rectDraggable.right;
		newWidth = positionX - rectRoot.left + offset;
	}

	return clamp(newWidth, minWidth, maxWidth);
}

export function count(number: number): Array<number> {
	return new Array(number).fill(0).map((_v, i) => i);
}
