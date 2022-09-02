import express from "express";
import { Client } from "@xhayper/discord-rpc";
import { YTMUpdateData } from "./types";

const client = new Client({clientId: "1012940949191659600"});
client.on("connected", () => console.log("i | Connected to discord: "+client.user?.tag));
client.login().catch((e) => {
	console.log("! | Failed to log in to discord:",e);
	process.exit(1);
});

const app = express();
app.use(express.json());

app.post("/status", (req, res) => {
	res.sendStatus(200);
	let data = req.body as YTMUpdateData;
	console.log(`+ | ${data.state}: ${data.artist} - ${data.title}`);
	client.user?.setActivity({
		details: data.title,
		state: "by "+data.artist,
		largeImageKey: data.artwork ?? "ytm_logo",
		largeImageText: `on ${data.album}`,
		smallImageKey: data.state,
		smallImageText: data.state[0].toUpperCase() + data.state.slice(1),
		buttons: [
			// Fallback to youtube music homepage.
			{label: "Play on Youtube Music", url: data.link ?? "https://music.youtube.com"}
		]
	}).catch((e) => console.log("! | Failed to set status:",e));
});

app.delete("/status", (_, res) => {
	console.log("+ | stopped");
	res.sendStatus(200);
	client.user?.clearActivity();
});

app.listen(3110, () => console.log("i | Listening on port 3310"))