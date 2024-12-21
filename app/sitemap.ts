import { MetadataRoute } from "next";

// Function to get all blog posts
// Replace this with your actual method of fetching blog posts
async function getAllBlogPosts() {
  // This is a placeholder. Implement your own logic to fetch blog posts.
  return [
    { slug: "halal-stock-screening", lastModified: new Date() },
    { slug: "islamic-investing-guide", lastModified: new Date() },
    {
      slug: "is-eicher-motors-ltd-halal-and-shariah-compliant",
      lastModified: new Date(),
    },
    { slug: "best-sharia-compliant-stocks-in-india", lastModified: new Date() },
    // Add more blog posts as they are created
  ];
}

// Function to get stocks for sitemap
// Replace this with your actual method of fetching stocks
async function getStocksForSitemap(id: number) {
  // This is a placeholder. Implement your own logic to fetch stocks.
  const stocksPerPage = 100;
  const start = id * stocksPerPage;
  const stocks = Array.from({ length: stocksPerPage }, (_, i) => ({
    id: start + i + 1,
    updatedAt: new Date(),
  }));
  return stocks;
}

export async function generateSitemaps() {
  // Fetch the total number of stocks and calculate the number of sitemaps needed
  const totalStocks = 1000; // Replace with actual total number of stocks
  const stocksPerSitemap = 100;
  const sitemapCount = Math.ceil(totalStocks / stocksPerSitemap);
  return Array.from({ length: sitemapCount }, (_, i) => ({ id: i }));
}

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  if (id === undefined) {
    const blogPosts = await getAllBlogPosts();

    const blogs = blogPosts.map((post) => ({
      url: `https://sharia-stock-info.vercel.app/blog/${post.slug}`,
      lastModified: post.lastModified,
    }));

    return [
      {
        url: "https://sharia-stock-info.vercel.app",
        lastModified: new Date(),
        changeFrequency: "yearly",
        priority: 1,
      },
      {
        url: "https://sharia-stock-info.vercel.app/stocks",
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      },
      {
        url: "https://sharia-stock-info.vercel.app/blog",
        lastModified: new Date(),
        changeFrequency: "daily",
        priority: 0.8,
      },
      {
        url: "https://sharia-stock-info.vercel.app/about",
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
      },
      ...blogs,
    ];
  } else {
    // Fetch stocks for this specific sitemap
    const stocks = await getStocksForSitemap(id);

    return stocks.map((stock) => ({
      url: `https://sharia-stock-info.vercel.app/stocks/${stock.id}`,
      lastModified: stock.updatedAt,
    }));
  }
}
