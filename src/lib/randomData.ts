/**
 * Generates an array of objects, which has randomly chosen booleans in assigned fields.
 * @param fields field names to populate
 * @param length how many objects to generate
 * @returns array of randomly populated objects
 */
export function generateBooleanFields<T extends ReadonlyArray<string>>(
	fields: T,
	length: number,
): { [key in T[number]]: boolean }[] {
	const array = new Array(length).fill(0);
	return array.map(() => {
		const obj = {} as Record<string, boolean>;
		fields.forEach((field) => {
			obj[field] = Math.random() < 0.5;
		});
		return obj as { [key in T[number]]: boolean };
	});
}
