export const ALPHA_VANTAGE_API_KEY =
  process.env.ALPHA_VANTAGE_API_KEY || "demo";
export const FIREBASE_API_KEY = process.env.FIREBASE || "";

// List of pre-screened halal stocks
export const HALAL_STOCKS = [
  // US Halal Stocks
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology" },
  { symbol: "MSFT", name: "Microsoft Corporation", sector: "Technology" },
  { symbol: "GOOGL", name: "Alphabet Inc.", sector: "Technology" },
  { symbol: "ADBE", name: "Adobe Inc.", sector: "Technology" },
  { symbol: "CSCO", name: "Cisco Systems", sector: "Technology" },
  { symbol: "PG", name: "Procter & Gamble", sector: "Consumer Goods" },
  { symbol: "JNJ", name: "Johnson & Johnson", sector: "Healthcare" },
  { symbol: "UNH", name: "UnitedHealth Group", sector: "Healthcare" },
  { symbol: "HD", name: "Home Depot", sector: "Retail" },
  { symbol: "WMT", name: "Walmart Inc.", sector: "Retail" },

  // Indian Halal Stocks
  { symbol: "RELIANCE", name: "Reliance Industries Limited", sector: "Energy" },
  { symbol: "TCS", name: "Tata Consultancy Services", sector: "Technology" },
  { symbol: "INFY", name: "Infosys Limited", sector: "Technology" },
  { symbol: "WIPRO", name: "Wipro Limited", sector: "Technology" },
  { symbol: "HCLTECH", name: "HCL Technologies Limited", sector: "Technology" },
  { symbol: "DRREDDY", name: "Dr. Reddy's Laboratories", sector: "Healthcare" },
  {
    symbol: "ABBOTINDIA",
    name: "ABBOTT INDIA LTD",
    sector: "Pharmaceuticals",
  },
  {
    symbol: "SUNPHARMA",
    name: "Sun Pharmaceutical Industries",
    sector: "Healthcare",
  },
  {
    symbol: "ASIANPAINT",
    name: "Asian Paints Limited",
    sector: "Consumer Goods",
  },
  {
    symbol: "MARUTI",
    name: "Maruti Suzuki India Limited",
    sector: "Automobile",
  },
  { symbol: "ULTRACEMCO", name: "UltraTech Cement Limited", sector: "Cement" },
];
