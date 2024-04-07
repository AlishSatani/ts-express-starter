import { CoreDataTypes } from "@models/index";

export namespace StockServicePayloads {
  export interface DailyOptions extends CoreDataTypes.DailyOptions {}

  export interface DailyAdjustedOptions
    extends CoreDataTypes.DailyAdjustedOptions {}
}
