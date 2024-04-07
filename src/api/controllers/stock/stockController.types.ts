import { StockServicePayloads } from "@services/stock/stockService.types";

export namespace StockControllerTypes {
  export interface DailyOptions extends StockServicePayloads.DailyOptions {}

  export interface DailyAdjustedOptions extends StockServicePayloads.DailyAdjustedOptions {}
}
