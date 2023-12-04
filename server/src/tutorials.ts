import fs from "fs/promises";
import path from "path";
import { HttpError } from "./Error.js";
import type TutorialWithMeta from "../../api_types/tutorialsWithMeta";

const tutorialTemplatesBasePath = "src/tutorial_templates";
const tutorialsBasePath = "src/tutorials";

async function getAllTutorials() {
	const tutorialTemplates = await fs.readdir(tutorialTemplatesBasePath, {
		withFileTypes: true,
	});

	const directories = tutorialTemplates.filter((dirent) => {
		return dirent.isDirectory();
	});

	return directories.map((directory) => directory.name);
}

export async function getTutorialsWithMeta() {
	const allTutorials = await getAllTutorials();
	const tutorialMetas = await Promise.all(
		allTutorials.map((tutorial) => getTutorialMeta(tutorial)),
	);
	const byCategory: Record<string, TutorialWithMeta[]> = {};

	let categories: string[] = [];
	const categoriesPath = path.join(
		tutorialTemplatesBasePath,
		"categories.json",
	);

	try {
		categories = JSON.parse(await fs.readFile(categoriesPath, "utf-8"));
	} catch (_e) {
		console.warn(
			`No categories defined, "${categoriesPath}" could not be read.`,
		);
	}

	categories.forEach((category) => {
		byCategory[category] = [];
	});

	allTutorials.forEach((tutorial, index) => {
		const meta = tutorialMetas[index]!;

		const tutorialsInCategory = byCategory[meta.category] ?? [];
		tutorialsInCategory.push({
			name: tutorial,
			...meta,
		});

		if (!byCategory[meta.category]) {
			byCategory[meta.category] = tutorialsInCategory;
			console.warn(
				`Unknown category "${meta.category}" found in tutorial "${tutorial}". Category will be appended to end of record.`,
			);
		}
	});

	Object.values(byCategory).forEach((tutorialArray) => {
		tutorialArray.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	});

	return byCategory;
}

interface Meta {
	category: string;
	order?: number;
}

async function getTutorialMeta(id: string): Promise<Meta> {
	const filePath = path.join(tutorialTemplatesBasePath, id, "meta.json");

	try {
		const contents = await fs.readFile(filePath, "utf-8");
		return JSON.parse(contents);
	} catch (_e) {
		console.warn(`Tutorial ${id} has no meta.json file`);
		return {
			category: "uncategorized",
		};
	}
}

export async function prepareTutorial(id: string) {
	fs.mkdir(tutorialsBasePath, { recursive: true });

	if (!(await validTutorialId(id))) {
		throw new HttpError(`No such tutorial: ${id}`, 404);
	}

	if (!(await doesTutorialExist(id))) {
		console.log(
			`Tutorial with id "${id}" not yet created. Copying template...`,
		);

		fs.mkdir(path.join(tutorialsBasePath, id), { recursive: true });

		await fs.cp(
			path.join(tutorialTemplatesBasePath, id, "template"),
			path.join(tutorialsBasePath, id),
			{ recursive: true },
		);
	}

	return path.join(tutorialsBasePath, id);
}

async function validTutorialId(id: string) {
	return (await getAllTutorials()).includes(id);
}

async function doesTutorialExist(id: string) {
	const existingTutorialsDir = await fs.readdir(tutorialsBasePath, {
		withFileTypes: true,
	});

	const existingTutorials = existingTutorialsDir
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	if (existingTutorials.includes(id)) {
		const tutorialDir = await fs.readdir(path.join(tutorialsBasePath, id));
		return tutorialDir.includes("Index.vue");
	} else {
		return false;
	}
}
