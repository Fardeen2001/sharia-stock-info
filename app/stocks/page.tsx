import { prisma } from "@/lib/db";
import { StockList } from "@/components/stocks/stock-list";

async function getStocks() {
  return await prisma.stock.findMany({
    orderBy: {
      symbol: "asc"
    }
  });
}

export default async function StocksPage() {
  const stocks = await getStocks();
  
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Halal Stocks</h1>
        <StockList stocks={stocks} />
      </div>
    </div>
  );
}