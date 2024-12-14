export interface StockQuote {
  symbol: string;
  price: string;
  change: string;
  changePercent: string;
  volume: string;
  latestTradingDay: string;
}

export interface StockAnalysis {
  symbol: string;
  name: string;
  sector: string;
  shariahCompliant: boolean;
  analysis: string;
  fundamentals: {
    debtToEquity: number;
    currentRatio: number;
    profitMargin: number;
  };
}

export interface HalalStock {
  symbol: string;
  name: string;
  sector: string;
}
