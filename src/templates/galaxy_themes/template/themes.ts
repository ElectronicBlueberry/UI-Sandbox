import themes from "./themes.yaml";

type RawTheme = { [key: string]: string | RawTheme };

export type CssVariable = `--${string}`;
export type Theme = Record<CssVariable, string>;
export type Themes = Record<string, Theme>;

function flattenTheme(rawTheme: RawTheme): Theme {
	const flattenedTheme: Theme = {};

	Object.entries(rawTheme).forEach(([key, value]) => {
		if (typeof value === "string") {
			flattenedTheme[`--${key}`] = value;
		} else {
			const flattenedSubTheme = flattenTheme(value);

			Object.entries(flattenedSubTheme).forEach(([subKey, subValue]) => {
				const newKey: CssVariable = `--${key}-${subKey.slice(2)}`;
				flattenedTheme[newKey] = subValue;
			});
		}
	});

	return flattenedTheme;
}

export function loadThemes(): Themes {
	const themesDict: Themes = {};

	Object.entries(themes as Record<string, RawTheme>).forEach(
		([name, rawTheme]) => {
			themesDict[name] = flattenTheme(rawTheme);
		},
	);

	return themesDict;
}
