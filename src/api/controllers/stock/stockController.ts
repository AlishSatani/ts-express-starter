import { StockService } from "@services/stock/stock";
import { ServerError } from "@utils/error";
import { NextFunction, Request, Response } from "express";
import { StockControllerTypes } from "./stockController.types";

export class StockController {
  private stockService: StockService;

  constructor() {
    this.stockService = new StockService();
  }

  async daily(req: Request, res: Response, next: NextFunction) {
    try {
      const options: StockControllerTypes.DailyOptions = req.query as any;

      const data = await this.stockService.daily(options);

      return res.status(200).json({
        message: "Data Get successfully",
        data,
      });
    } catch (error) {
      if (error instanceof ServerError) return next(error);

      return next(
        new ServerError({
          code: 505,
          message: "Failed to daily time series data.",
        })
      );
    }
  }

  async dailyAdjusted(req: Request, res: Response, next: NextFunction) {
    try {
      const options: StockControllerTypes.DailyAdjustedOptions =
        req.query as any;

      const data = await this.stockService.dailyAdjusted(options);

      return res.status(200).json({
        message: "Data Get successfully",
        data,
      });
    } catch (error) {
      if (error instanceof ServerError) return next(error);

      return next(
        new ServerError({
          code: 505,
          message: "Failed to daily adjusted time series data.",
        })
      );
    }
  }
}
