export type YTMUpdateData = {
	state: "playing" | "paused",
	artist: string,
	title: string,
	album: string,
	artwork: string | null,
	link: string | null
}