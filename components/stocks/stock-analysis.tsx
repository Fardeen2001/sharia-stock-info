import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Progress } from "@/components/ui/progress";

interface StockAnalysisProps {
  stock: any;
  isOpen: boolean;
  onClose: () => void;
}

export function StockAnalysis({ stock, isOpen, onClose }: StockAnalysisProps) {
  const { fundamentals } = stock.analysis;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {stock.name} ({stock.symbol})
          </SheetTitle>
          <SheetDescription>
            Shariah Compliance Analysis and Market Overview
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Shariah Compliance Status</h3>
            <div className="flex items-center space-x-2">
              <span className="inline-block w-3 h-3 rounded-full bg-green-500"></span>
              <span>Halal Investment</span>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Financial Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Debt to Equity</span>
                  <span className="text-sm">{fundamentals.debtToEquity}%</span>
                </div>
                <Progress value={Math.min(fundamentals.debtToEquity, 100)} />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Current Ratio</span>
                  <span className="text-sm">{fundamentals.currentRatio}</span>
                </div>
                <Progress
                  value={Math.min(fundamentals.currentRatio * 20, 100)}
                />
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">Profit Margin</span>
                  <span className="text-sm">
                    {(fundamentals.profitMargin * 100).toFixed(2)}%
                  </span>
                </div>
                <Progress
                  value={Math.min(fundamentals.profitMargin * 100, 100)}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Analysis</h3>
            <p className="text-muted-foreground">{stock.analysis.analysis}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
