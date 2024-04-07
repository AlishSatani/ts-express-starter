export namespace CoreDataTypes {
  export type CoreDataResponse<K extends string, T> = {
    [key in K]: T;
  };

  export interface DailyOptions {
    symbol: string;
    outputsize?: string;
    datatype?: string;
  }

  export interface DailyData {
    [date: string]:
      | {
          "1. open": string;
          "2. high": string;
          "3. low": string;
          "4. close": string;
          "5. volume": string;
        }
      | undefined;
  }

  export interface DailyResponse
    extends CoreDataResponse<"Time Series (Daily)", DailyData> {}

  export interface DailyAdjustedOptions {
    symbol: string;
    outputsize?: string;
    datatype?: string;
  }

  export interface DailyAdjustedData {
    [date: string]:
      | {
          "1. open": string;
          "2. high": string;
          "3. low": string;
          "4. close": string;
          "5. adjusted close": string;
          "6. volume": string;
          "7. dividend amount": string;
          "8. split coefficient": string;
        }
      | undefined;
  }

  export interface DailyAdjustedResponse
    extends CoreDataResponse<"Time Series (Daily)", DailyAdjustedData> {}
}
