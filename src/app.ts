import { default as stockRoute } from "@routes/stockRoute";

import { Cache } from "@cache/Cache";
import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";
import { ShutdownAction, errorHandler, makeShutdownActions } from "./utils";

export function getShutdownActions(app: Express): ShutdownAction[] {
  return app.get("shutdownActions");
}

export function makeApp(): Express {
  const app = express();

  app.use(cors());

  app.use(express.json({ limit: "1mb" }));

  app.use(express.urlencoded({ extended: true }));

  app.use(morgan("dev"));

  //* connect cache storage

  const cache = Cache.getInstance();

  // TODO use helmet if needed

  //* register routes

  //! return response with status 200 on root URL for health checkup
  app.get("/", (_req, res) => res.status(200).send("Greetings!"));

  app.use("/stocks", stockRoute);

  // app.use(router);

  //* add all cleanup functions to shut down server efficiently

  const shutdownActions = makeShutdownActions();

  //* disconnect cache storage before terminating server

  shutdownActions.push(() => cache.disconnect());

  app.set("shutdownActions", shutdownActions);

  app.use(errorHandler);

  return app;
}
