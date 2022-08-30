export type YTMUpdateData = {
	state: "playing" | "paused",
	artist: string,
	title: string,
	album: string,
	artwork: string | null,
	link: string | null
}

export enum MSGTYPE {
	ACK, // Acknowledged
	ERR, // Error
	UPD, // Updated Media
	STP, // Stopped Media
}