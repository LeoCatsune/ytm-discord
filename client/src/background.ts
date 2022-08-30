import { MSGTYPE, YTMUpdateData } from "./types";
console.log("[ytmd:bg] Ready.");

const emit_stopped = () =>
	fetch("http://localhost:3110/status", {method: "delete"});

const emit_update = (data: YTMUpdateData) =>
	fetch("http://localhost:3110/status", {
		method: "post",
		body: JSON.stringify(data),
		headers: {"Content-Type": "application/json"}
	});

chrome.runtime.onConnect.addListener((port) => {
	console.log(`[ytmd:port] Connected to Content Script.`);

	port.onMessage.addListener((msg) => {
		switch(msg.type ?? -1) {
			case MSGTYPE.ACK:
				console.log("[ytmd:port] Got ACK from content script.");
				break;
			case MSGTYPE.ERR:
				console.log("[ytmd:port] Got ERR from content script:",msg.message ?? "No Message");
				break;
			case MSGTYPE.UPD:
				console.log("[ytmd:port] Got UPD from content script:",msg.data ?? "No Data");
				if(!msg.data) return port.postMessage({type: MSGTYPE.ERR});
				emit_update(msg.data);
				port.postMessage({type: MSGTYPE.ACK});
				break;
			case MSGTYPE.STP:
				console.log("[ytmd:port] Got STP from content script.");
				emit_stopped();
				port.postMessage({type: MSGTYPE.ACK});
				break;
		}
	});

	port.onDisconnect.addListener(() => {
		console.log("[ytmd:port] Disconnected from content script.");
		emit_stopped();
	});
});