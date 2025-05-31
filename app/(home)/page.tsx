import PostHero from "./_components/_posts/PostHero";
import HeroSection from "./_components/HeroSection";
import AuthorSection from "./_components/_author/AuthorSection";
import { verifySession } from "@/dal";

export default async function Home() {
  const session = await verifySession()
  if (!session) return null
  return (
    <main>
      <HeroSection />
      <PostHero/>
      <AuthorSection/>
    </main>
  );
}
