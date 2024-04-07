import { CoreDataTypes } from "@models/core";
import { map, toNumber } from "lodash";

export class CoreDataRepository {
  daily(data: CoreDataTypes.DailyResponse["Time Series (Daily)"]) {
    if (!data) return [];

    return map(data, (item, key) => ({
      date: key,
      open: toNumber(item["1. open"]),
      high: toNumber(item["2. high"]),
      low: toNumber(item["3. low"]),
      close: toNumber(item["4. close"]),
      volume: toNumber(item["5. volume"]),
    }));
  }

  dailyAdjusted(
    data: CoreDataTypes.DailyAdjustedResponse["Time Series (Daily)"]
  ) {
    if (!data) return [];

    return map(data, (item, key) => ({
      date: key,
      open: toNumber(item["1. open"]),
      high: toNumber(item["2. high"]),
      low: toNumber(item["3. low"]),
      close: toNumber(item["4. close"]),
      adjustedClose: toNumber(item["5. adjusted close"]),
      volume: toNumber(item["6. volume"]),
      dividendAmount: toNumber(item["7. dividend amount"]),
      splitCoefficient: toNumber(item["8. split coefficient"]),
    }));
  }
}
