import { HeroSection } from "@/components/home/hero-section";
import { FeatureSection } from "@/components/home/feature-section";
import { LatestPosts } from "@/components/home/latest-posts";
import { prisma } from "@/lib/db";

async function getLatestPosts() {
  return await prisma.post.findMany({
    take: 3,
    orderBy: {
      createdAt: 'desc'
    },
    select: {
      title: true,
      slug: true,
      description: true,
      image: true,
      createdAt: true
    }
  });
}

export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <FeatureSection />
      <LatestPosts posts={latestPosts} />
    </div>
  );
}