import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (_req, res) => {
	res.send(JSON.stringify({ message: "Hello World" }));
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
