"use client";

import { useState, useEffect } from "react";
import { StockCard } from "@/components/stocks/stock-card";
import { StockAnalysis } from "@/components/stocks/stock-analysis";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function StocksPage() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStock, setSelectedStock] = useState<any>(null);

  useEffect(() => {
    async function fetchStocks() {
      try {
        const response = await fetch("/api/stocks");
        const data = await response.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStocks();
  }, []);

  const filteredStocks = stocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      stock.sector.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Halal Stocks</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Discover Shariah-compliant investment opportunities with real-time
            market data and analysis.
          </p>

          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search stocks by symbol, name, or sector..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStocks.map((stock) => (
            <StockCard
              key={stock.symbol}
              stock={stock}
              onClick={() => setSelectedStock(stock)}
            />
          ))}
        </div>

        {selectedStock && (
          <StockAnalysis
            stock={selectedStock}
            isOpen={!!selectedStock}
            onClose={() => setSelectedStock(null)}
          />
        )}
      </div>
    </div>
  );
}
