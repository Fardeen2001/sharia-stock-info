import { NextResponse } from "next/server";
import { HALAL_STOCKS } from "@/lib/config";
import { getStockOverview, getStockQuote } from "@/lib/api/alpha-vintage";

export async function GET() {
  try {
    const stocksWithQuotes = await Promise.all(
      HALAL_STOCKS.map(async (stock) => {
        const quote = await getStockQuote(stock.symbol);
        const overview = await getStockOverview(stock.symbol);

        return {
          ...stock,
          quote,
          overview,
          analysis: {
            shariahCompliant: true,
            fundamentals: {
              debtToEquity: overview?.DebtToEquityRatio || 0,
              currentRatio: overview?.CurrentRatio || 0,
              profitMargin: overview?.ProfitMargin || 0,
            },
            analysis: `${stock.name} maintains strong Shariah compliance with acceptable debt levels and ethical business practices. The company's primary revenue comes from permissible sources.`,
          },
        };
      })
    );

    return NextResponse.json(stocksWithQuotes);
  } catch (error) {
    return new NextResponse("Internal Error", { status: 500 });
  }
}
