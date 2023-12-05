export function prettifySandboxName(name: string) {
	const words = name.split("_");
	const capitalized = words.map(
		(word) => word.charAt(0).toUpperCase() + word.slice(1),
	);
	return capitalized.join(" ");
}
