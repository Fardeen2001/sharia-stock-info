import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface StockListProps {
  stocks: any[];
}

export function StockList({ stocks }: StockListProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Symbol</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Sector</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Analysis</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow key={stock.id}>
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>{stock.name}</TableCell>
              <TableCell>{stock.sector}</TableCell>
              <TableCell>
                <Badge variant={stock.isHalal ? "default" : "destructive"}>
                  {stock.isHalal ? "Halal" : "Non-Halal"}
                </Badge>
              </TableCell>
              <TableCell>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Analysis
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>{stock.name} ({stock.symbol})</SheetTitle>
                      <SheetDescription>
                        {stock.description}
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-6 space-y-4">
                      <h3 className="font-semibold">Analysis</h3>
                      <p className="text-muted-foreground">{stock.analysis}</p>
                    </div>
                  </SheetContent>
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}