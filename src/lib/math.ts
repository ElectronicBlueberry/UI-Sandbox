export function clamp(value: number, min: number, max: number) {
	return Math.min(max, Math.max(value, min));
}
