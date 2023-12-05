import express from "express";
import cors from "cors";
import { getSandboxInfos, prepareSandbox } from "./src/sandboxes.js";
import { HttpError } from "./src/Error.js";

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (_req, res) => {
	res.send(JSON.stringify("running"));
});

app.get("/sandboxes", async (_req, res) => {
	try {
		const sandboxes = await getSandboxInfos();
		res.send(JSON.stringify(sandboxes));
	} catch (e) {
		HttpError.fromError(e as Error).send(res);
	}
});

app.post("/sandbox/:sandboxId", async (req, res) => {
	try {
		const path = await prepareSandbox(req.params.sandboxId);
		res.send(JSON.stringify(path));
	} catch (e) {
		HttpError.fromError(e as Error).send(res);
	}
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
