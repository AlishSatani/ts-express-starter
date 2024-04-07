import { Cache } from "@cache/Cache";
import { validateService } from "@helpers/validateRequest";
import { CoreData } from "@models/core";
import { CoreDataRepository } from "@repositories/core";
import { dailyAdjustedSchema, dailySchema } from "./stock.schema";
import { StockServicePayloads } from "./stockService.types";

//* Cache key for stocks: stocks:[symbol]:[property]:[filters]

export class StockService {
  private coreDataRepositories: CoreDataRepository;

  private coreData: CoreData;

  private cache: Cache;

  constructor() {
    this.coreDataRepositories = new CoreDataRepository();
    this.coreData = new CoreData();
    this.cache = Cache.getInstance();
  }

  async daily(options: StockServicePayloads.DailyOptions) {
    const cacheKey = ["stock", options.symbol, "daily", options.outputsize];

    const callback = await this.cache.withCache<any>(
      this._daily.bind(this),
      cacheKey
    );

    return callback(options);
  }

  async _daily(options: StockServicePayloads.DailyOptions) {
    await validateService(dailySchema, options);

    const data = await this.coreData.daily(options);

    return this.coreDataRepositories.daily(data);
  }

  async dailyAdjusted(options: StockServicePayloads.DailyOptions) {
    const cacheKey = [
      "stock",
      options.symbol,
      "daily_adjusted",
      options.outputsize,
    ];

    const callback = await this.cache.withCache<any>(
      this._dailyAdjusted.bind(this),
      cacheKey
    );

    return callback(options);
  }

  async _dailyAdjusted(options: StockServicePayloads.DailyAdjustedOptions) {
    await validateService(dailyAdjustedSchema, options);

    const data = await this.coreData.dailyAdjusted(options);

    return this.coreDataRepositories.dailyAdjusted(data);
  }
}
