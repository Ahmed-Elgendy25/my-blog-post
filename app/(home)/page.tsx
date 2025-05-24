import PostHero from "./_components/_posts/PostHero";
import HeroSection from "./_components/HeroSection";
import AuthorSection from "./_components/_author/AuthorSection";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PostHero/>
      <AuthorSection/>
    </main>
  );
}
