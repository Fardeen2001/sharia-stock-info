import { StockQuote } from "@/types/stock";
import { ALPHA_VANTAGE_API_KEY } from "@/lib/config";

export async function getStockQuote(
  symbol: string
): Promise<StockQuote | null> {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    const data = await response.json();

    if (!data["Global Quote"]) {
      return null;
    }

    const quote = data["Global Quote"];

    return {
      symbol: quote["01. symbol"],
      price: quote["05. price"],
      change: quote["09. change"],
      changePercent: quote["10. change percent"],
      volume: quote["06. volume"],
      latestTradingDay: quote["07. latest trading day"],
    };
  } catch (error) {
    console.error("Error fetching stock quote:", error);
    return null;
  }
}

export async function getStockOverview(symbol: string) {
  try {
    const response = await fetch(
      `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=${ALPHA_VANTAGE_API_KEY}`
    );

    return await response.json();
  } catch (error) {
    console.error("Error fetching stock overview:", error);
    return null;
  }
}
