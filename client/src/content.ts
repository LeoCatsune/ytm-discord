import { MSGTYPE, YTMUpdateData } from "./types";
console.log("[ytmd] Ready");

let port = chrome.runtime.connect();

let portMsgHandler = (msg: any) => console.log("[ytmd:port]",msg);
let portDcHandler = () => {
	// Might cause a minor panic when closing the page...?
	console.warn("[ytmd:port] Disconnected from port, trying to reconnect...");
	port = chrome.runtime.connect();

	// Register the event listeners for the new port instance...
	port.onMessage.addListener(portMsgHandler);
	port.onDisconnect.addListener(portDcHandler);
}

port.onMessage.addListener(portMsgHandler);
port.onDisconnect.addListener(portDcHandler);

console.log("[ytmd:port] Connected:",port)

// ---------------- Main Section ----------------
const idRegex = /v=([^#&]{11,})/;
const getID = () => document.querySelector<HTMLAnchorElement>("a.ytp-title-link")?.href.match(idRegex)?.[1];

// Setup Initial State
let prevState: MediaMetadata | null;
let playing: "playing" | "paused" | "none" = "none";

function updateStatus() {
	let state = window.navigator.mediaSession.metadata;
	let stateChanged = state != prevState;
	let playingChanged = navigator.mediaSession.playbackState != playing;

	if(!stateChanged && !playingChanged) return;

	let id = getID()??"unknown";

	if(navigator.mediaSession.playbackState == "none") {
		console.log("[ytmd] Stopped.")
		port.postMessage({type: MSGTYPE.STP});
	} else {
		// data patches because stupid
		let artwork = state?.artwork[state?.artwork.length-1].src;
		let data: YTMUpdateData = {
			state: navigator.mediaSession.playbackState,
			artist: state?.artist ?? "Unknown Artist",
			title: state?.title ?? "Unknown Song",
			album: state?.album.length ? state.album : state?.title ?? "Unknown Album",
			artwork: artwork??null,
			link: id?`https://music.youtube.com/watch?v=${id}`:null
		};
		console.log(`[ytmd] ${data.state}: ${data.title} by ${data.artist} (on ${data.album}, id: ${id??"(unknown)"}, artwork: ${artwork})`)
		port.postMessage({type: MSGTYPE.UPD, data});
	}

	prevState = state;
	playing = navigator.mediaSession.playbackState;
}

setInterval(updateStatus, 5000);