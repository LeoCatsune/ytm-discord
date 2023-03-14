import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";
import createRoutes from "./routes";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {});

app.use(express.static("web"));
app.get("/", (_, res) => res.redirect("/left.html"))
app.use(createRoutes((data) => io.emit("update", data), () => io.emit("stop")));

io.on("connection", (socket) => {
  console.log(`+ | New Connection: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`+ | Disconnected: ${socket.id}`);
  });
});

httpServer.listen(3110, () => console.log("i | Listening on port 3310"))
