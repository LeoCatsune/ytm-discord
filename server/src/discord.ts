import express from "express";
import { Client } from "@xhayper/discord-rpc";
import { YTMUpdateData } from "./types";
import createRoutes from "./routes";

const client = new Client({ clientId: "1012940949191659600" });
client.on("connected", () => console.log("i | Connected to discord: " + client.user?.tag));
client.login().catch((e) => {
	console.log("! | Failed to log in to discord:", e);
	process.exit(1);
});

const app = express();
app.use(express.json());
app.use(createRoutes(updateStatus, () => client.user?.clearActivity()))

function updateStatus(data: YTMUpdateData) {
	client.user?.setActivity({
		details: data.title,
		state: "by " + data.artist,
		largeImageKey: data.artwork ?? "ytm_logo",
		largeImageText: `on ${data.album}`,
		smallImageKey: data.state,
		smallImageText: data.state[0].toUpperCase() + data.state.slice(1),
		buttons: [
			// Fallback to youtube music homepage.
			{ label: "Play on Youtube Music", url: data.link ?? "https://music.youtube.com" }
		]
	}).catch((e) => console.log("! | Failed to set status:", e));
}

app.listen(3110, () => console.log("i | Listening on port 3310"))
