export namespace ApiPayload {
  export interface Company {
    name: string;
    logo: string;
    symbol: string;
    isPremium?: boolean;
    hasUniqueKPIs?:boolean;
  }

  export interface Price {
    symbol: string;
    from: string;
    to: string;
    interval?: string;
  }
  export interface Benchmarking {
    symbol: string;
    from: string;
    to: string;
    investmentAmount: number;
  }
  export interface EmployeeRevenue {
    symbol: string;
    duration: string;
  }
  export interface RevenueBySegment {
    symbol: string;
    duration: string;
  }

  export interface CompanyBySymbol {
    symbol: string;
  }

  export interface Stocks {
    offset?: string;
    limit?: string;
    search?: string;
  }
  export interface Insider {
    symbol: string;
  }

  export interface balanceSheet {
    symbol: string;
    duration: string;
  }
  export interface cashFlowValuation {
    symbol: string;
  }
  export interface OperatingIncomeExpenses {
    symbol: string;
    duration: string;
  }
}
