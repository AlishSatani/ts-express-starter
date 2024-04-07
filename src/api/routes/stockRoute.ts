import { StockController } from "@controllers/stock";
import { Router } from "express";

//! mount middleware to check user subscriptions from stripe

const route = Router();

const stockController = new StockController();

route.get("/daily", (req, res, next) => stockController.daily(req, res, next));

route.get("/daily-adjusted", (req, res, next) =>
  stockController.dailyAdjusted(req, res, next)
);

export default route;
