import express, { Router } from "express";
import { YTMUpdateData } from "./types";

type callback = () => any;
type updateCallback = (data: YTMUpdateData) => any;

export default function createRoutes(update: updateCallback, stop: callback): Router {
  let router = Router();

  router.use(express.json());
  router.post("/status", (req, res) => {
    res.sendStatus(200);
    let data = req.body as YTMUpdateData;
    console.log(`+ | ${data.state}: ${data.artist} - ${data.title}`);
    update(data);
  });

  router.delete("/status", (_, res) => {
    console.log("+ | stopped");
    res.sendStatus(200);
    stop();
  });

  return router;
}
