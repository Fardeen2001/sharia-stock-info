import { MetadataRoute } from "next";
import { NextResponse } from "next/server";

async function getAllBlogPosts() {
  // Implement your logic to fetch blog posts
  return [
    { slug: "halal-stock-screening", lastModified: new Date() },
    { slug: "islamic-investing-guide", lastModified: new Date() },
    {
      slug: "is-eicher-motors-ltd-halal-and-shariah-compliant",
      lastModified: new Date(),
    },
    { slug: "best-sharia-compliant-stocks-in-india", lastModified: new Date() },
    {
      slug: "exploring-shariah-compliance-of-tata-motors-for-ethical-investing-in-india",
      lastModified: new Date(),
    },
    {
      slug: "is-zomato-stock-halal-zomato-halal-investment-guide-india",
      lastModified: new Date(),
    },
    {
      slug: "is-nippon-india-etf-shariah-bees-halal-or-haram",
      lastModified: new Date(),
    },
    {
      slug: "is-ultratech-cement-stock-halal-or-haram",
      lastModified: new Date(),
    },
  ];
}

function formatDate(date: string | Date): string {
  if (typeof date === "string") {
    return date;
  }
  return date.toISOString();
}

export async function GET() {
  const blogPosts = await getAllBlogPosts();

  const blogs = blogPosts.map((post) => ({
    url: `https://sharia-stock-info.vercel.app/blog/${post.slug}`,
    lastModified: post.lastModified,
  }));

  const sitemap: MetadataRoute.Sitemap = [
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

  // Convert the sitemap object to XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${sitemap
        .map(
          (item) => `
        <url>
          <loc>${item.url}</loc>
          <lastmod>${formatDate(item?.lastModified || "")}</lastmod>
          ${
            item.changeFrequency
              ? `<changefreq>${item.changeFrequency}</changefreq>`
              : ""
          }
          ${item.priority ? `<priority>${item.priority}</priority>` : ""}
        </url>
      `
        )
        .join("")}
    </urlset>`;

  // Return the XML with the correct content type
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
