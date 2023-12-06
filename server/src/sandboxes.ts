import fs from "fs";
import path from "path";
import { HttpError } from "./Error.js";
import type SandboxInformation from "../../api_types/sandbox";

const sandboxTemplatesBasePath = "src/templates";
const sandboxesBasePath = "src/sandboxes";

function getAllSandboxes() {
	const sandboxTemplates = fs.readdirSync(sandboxTemplatesBasePath, {
		withFileTypes: true,
	});

	const directories = sandboxTemplates.filter((dirent) => {
		return dirent.isDirectory();
	});

	return directories.map((directory) => directory.name);
}

export function getSandboxInfos() {
	const allSandboxes = getAllSandboxes();
	const sandboxMetas = allSandboxes.map((sandbox) => getSandboxMeta(sandbox));
	const byCategory: Record<string, SandboxInformation[]> = {};

	let categories: string[] = [];
	const categoriesPath = path.join(sandboxTemplatesBasePath, "categories.json");

	try {
		categories = JSON.parse(fs.readFileSync(categoriesPath, "utf-8"));
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

function getSandboxMeta(id: string): Meta {
	const filePath = path.join(sandboxTemplatesBasePath, id, "meta.json");

	try {
		const contents = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(contents);
	} catch (_e) {
		console.warn(`Sandbox ${id} has no meta.json file`);
		return {
			category: "uncategorized",
		};
	}
}

export function prepareSandbox(id: string) {
	fs.mkdirSync(sandboxesBasePath, { recursive: true });

	if (!validSandboxId(id)) {
		throw new HttpError(`No such sandbox: ${id}`, 404);
	}

	if (!doesSandboxExist(id)) {
		console.log(`Sandbox with id "${id}" not yet created. Copying template...`);

		fs.mkdirSync(path.join(sandboxesBasePath, id), { recursive: true });

		fs.cpSync(
			path.join(sandboxTemplatesBasePath, id, "template"),
			path.join(sandboxesBasePath, id),
			{ recursive: true },
		);
	}

	return path.join(sandboxesBasePath, id);
}

function validSandboxId(id: string) {
	return getAllSandboxes().includes(id);
}

function doesSandboxExist(id: string) {
	const existingSandboxesDir = fs.readdirSync(sandboxesBasePath, {
		withFileTypes: true,
	});

	const existingSandboxes = existingSandboxesDir
		.filter((dirent) => dirent.isDirectory())
		.map((dirent) => dirent.name);

	if (existingSandboxes.includes(id)) {
		const sandboxDir = fs.readdirSync(path.join(sandboxesBasePath, id));
		return sandboxDir.includes("Index.vue");
	} else {
		return false;
	}
}
