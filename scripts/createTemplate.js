import fs from "fs/promises";
import path from "path";

const newTemplatePath = "scripts/createTemplate";
const sandboxTemplatesBasePath = "src/templates";

async function main() {
	const templateName = process.argv[2];

	if (!templateName || templateName === "") {
		console.error("No template name provided");
		return;
	}

	const templatePath = path.join(sandboxTemplatesBasePath, templateName);

	try {
		try {
			await fs.access(templatePath);
			console.error(`Template "${templateName}" already exists`);
			return;
		} catch (_e) {
			// pass
		}

		await fs.cp(newTemplatePath, templatePath, {
			recursive: true,
			mode: fs.constants.COPYFILE_EXCL,
		});

		console.log(`Successfully created sandbox template "${templateName}"`);
	} catch (_e) {
		console.error(
			`Template "${templateName}" already exists, or directory could not be written to`,
		);
	}
}

main();
