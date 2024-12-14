import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

interface StockCardProps {
  stock: any;
  onClick: () => void;
}

export function StockCard({ stock, onClick }: StockCardProps) {
  const priceChange = parseFloat(stock.quote?.change || "0");
  const changePercent = parseFloat(stock.quote?.changePercent || "0");

  return (
    <Card
      className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold">{stock.symbol}</h3>
          <p className="text-sm text-muted-foreground">{stock.name}</p>
        </div>
        <Badge variant="outline">{stock.sector}</Badge>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">
            ${parseFloat(stock.quote?.price || "0").toFixed(2)}
          </span>
          <span
            className={`text-sm font-medium ${
              priceChange >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {priceChange >= 0 ? "+" : ""}
            {priceChange.toFixed(2)} ({changePercent.toFixed(2)}%)
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Volume: {parseInt(stock.quote?.volume || "0").toLocaleString()}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Last updated: {stock.quote?.latestTradingDay}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </Card>
  );
}
