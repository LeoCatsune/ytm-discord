// placeholder
let socket = io.connect();

socket.on("update", update);
socket.on("stop", stop);

let container = document.getElementById("main");
let cover = document.getElementById("ytm-cover");
let title = document.getElementById("ytm-title");
let artist = document.getElementById("ytm-artist");
let album = document.getElementById("ytm-album");

function imgError() {
  cover.src = "default.png";
}

function update(data) {
  if (data.state !== "playing") return stop();
  console.log("UPDATE", data);

  cover.src = data.artwork;
  title.innerText = data.title;
  artist.innerText = data.artist;
  if (data.album?.length === 0 || data.album === data.title) {
    album.innerText = ""
  }
  else album.innerText = " • " + data.album;
  container.classList.add(["shown"]);
}

function stop(data) {
  console.log("STOP", data);
  container.classList.remove(["shown"]);
}
