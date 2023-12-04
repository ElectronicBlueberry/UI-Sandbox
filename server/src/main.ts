import express from "express";
import cors from "cors";
import { getAllTutorials, prepareTutorial } from "./tutorials.js";
import { HttpError } from "./Error.js";

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (_req, res) => {
	res.send(JSON.stringify("running"));
});

app.get("/tutorials", async (_req, res) => {
	try {
		const tutorials = await getAllTutorials();
		res.send(JSON.stringify(tutorials));
	} catch (e) {
		HttpError.fromError(e as Error).send(res);
	}
});

app.get("/tutorial/:tutorialId", async (req, res) => {
	try {
		const path = await prepareTutorial(req.params.tutorialId);
		res.send(JSON.stringify(path));
	} catch (e) {
		HttpError.fromError(e as Error).send(res);
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
