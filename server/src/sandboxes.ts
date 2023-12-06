import fs from "fs/promises";
import path from "path";
import { HttpError } from "./Error.js";
import type SandboxInformation from "../../api_types/sandbox";

const sandboxTemplatesBasePath = "src/templates";
const sandboxesBasePath = "src/sandboxes";

async function getAllSandboxes() {
	const sandboxTemplates = await fs.readdir(sandboxTemplatesBasePath, {
		withFileTypes: true,
	});

	const directories = sandboxTemplates.filter((dirent) => {
		return dirent.isDirectory();
	});

	return directories.map((directory) => directory.name);
}

export async function getSandboxInfos() {
	const allSandboxes = await getAllSandboxes();
	const sandboxMetas = await Promise.all(
		allSandboxes.map((sandbox) => getSandboxMeta(sandbox)),
	);
	const byCategory: Record<string, SandboxInformation[]> = {};

	let categories: string[] = [];
	const categoriesPath = path.join(sandboxTemplatesBasePath, "categories.json");

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

	allSandboxes.forEach((sandbox, index) => {
		const meta = sandboxMetas[index]!;

		const sandboxesInCategory = byCategory[meta.category] ?? [];
		sandboxesInCategory.push({
			name: sandbox,
			...meta,
		});

		if (!byCategory[meta.category]) {
			byCategory[meta.category] = sandboxesInCategory;
			console.warn(
				`Unknown category "${meta.category}" found in sandbox "${sandbox}". Category will be appended to end of record.`,
			);
		}
	});

	Object.values(byCategory).forEach((sandboxArray) => {
		sandboxArray.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
	});

	return byCategory;
}

interface Meta {
	category: string;
	order?: number;
}

async function getSandboxMeta(id: string): Promise<Meta> {
	const filePath = path.join(sandboxTemplatesBasePath, id, "meta.json");

	try {
		const contents = await fs.readFile(filePath, "utf-8");
		return JSON.parse(contents);
	} catch (_e) {
		console.warn(`Sandbox ${id} has no meta.json file`);
		return {
			category: "uncategorized",
		};
	}
}

export async function prepareSandbox(id: string) {
	fs.mkdir(sandboxesBasePath, { recursive: true });

	if (!(await validSandboxId(id))) {
		throw new HttpError(`No such sandbox: ${id}`, 404);
	}

	if (!(await doesSandboxExist(id))) {
		console.log(`Sandbox with id "${id}" not yet created. Copying template...`);

		fs.mkdir(path.join(sandboxesBasePath, id), { recursive: true });

		await fs.cp(
			path.join(sandboxTemplatesBasePath, id, "template"),
			path.join(sandboxesBasePath, id),
			{ recursive: true },
		);
	}

	return path.join(sandboxesBasePath, id);
}

async function validSandboxId(id: string) {
	return (await getAllSandboxes()).includes(id);
}

async function doesSandboxExist(id: string) {
	const existingSandboxesDir = await fs.readdir(sandboxesBasePath, {
		withFileTypes: true,
	});

	const existingSandboxes = existingSandboxesDir
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	if (existingSandboxes.includes(id)) {
		const sandboxDir = await fs.readdir(path.join(sandboxesBasePath, id));
		return sandboxDir.includes("Index.vue");
	} else {
		return false;
	}
}
