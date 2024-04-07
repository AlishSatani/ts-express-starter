import { ServerError } from "@utils/error";
import alpha from "alphavantage";
import { CoreDataTypes } from "./coreData.types";

export class CoreData {
  private alphaVantage: ReturnType<typeof alpha>;
  private static instance: CoreData;

  constructor() {
    this.config();
  }

  private config() {
    if (!process.env.ALPHA_VANTAGE_API_KEY) {
      throw new Error("Misconfiguration: no ALPHA_VANTAGE_API_KEY");
    }

    this.alphaVantage = alpha({ key: process.env.ALPHA_VANTAGE_API_KEY });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new CoreData();
    }

    return this.instance;
  }

  async daily(options: CoreDataTypes.DailyOptions) {
    try {
      const { symbol, outputsize, datatype } = options;

      const data = await this.alphaVantage.data.daily<
        Promise<CoreDataTypes.DailyResponse>
      >(symbol, outputsize, datatype);

      return data?.["Time Series (Daily)"];
    } catch (error: any) {
      throw new ServerError({
        code: 505,
        message: "Failed to load daily time series data.",
        cause: error?.message,
      });
    }
  }

  async dailyAdjusted(options: CoreDataTypes.DailyAdjustedOptions) {
    try {
      const { symbol, outputsize, datatype } = options;

      const data = await this.alphaVantage.data.daily_adjusted(
        symbol,
        outputsize,
        datatype
      );

      return data?.["Time Series (Daily)"];
    } catch (error: any) {
      throw new ServerError({
        code: 505,
        message: "Failed to load daily adjusted time series data.",
        cause: error?.message,
      });
    }
  }
}
