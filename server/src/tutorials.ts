import fs from "fs/promises";
import path from "path";
import { HttpError } from "./Error.js";

const tutorialTemplatesBasePath = "src/tutorial_templates";
const tutorialsBasePath = "src/tutorials";

export async function getAllTutorials() {
	const tutorialTemplates = await fs.readdir(tutorialTemplatesBasePath, {
		withFileTypes: true,
	});

	const directories = tutorialTemplates.filter((dirent) => {
		return dirent.isDirectory();
	});

	return directories.map((directory) => directory.name);
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
