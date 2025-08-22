'use client';
import HeroSection from './HeroSection';
import PostHero from './_posts/PostHero';
import AuthorSection from './_author/AuthorSection';
import contentStyle from "./_style/content.module.css";
import Footer from './_footer/Footer';
import Navbar from '@/app/shared/Navbar';
import { BlogPostsResponse } from '../magazine/_schema/PaginatedArticles';
import { usePageTransition } from '@/hooks/usePageTransition';
import Preloader from '@/app/shared/_preloader/Preloader';

function MainComponent({ articles }: { articles: BlogPostsResponse }) {
  const { isLoading, preloaderRef, contentRef } = usePageTransition({
    preloaderDuration: 3000,
    onPreloaderComplete: () => {
      console.log('Preloader animation complete');
    },
    onContentReveal: () => {
      console.log('Content reveal animation complete');
    },
  });

  return (
    <main className="relative">
      {isLoading && <Preloader   preloaderRef={preloaderRef} />}

      <div
        ref={contentRef}
        className={`${contentStyle.content} ${isLoading ? 'opacity-0' : ''}`}
      >
        <Navbar />
        <HeroSection />
        <PostHero articles={articles.content} />
        <AuthorSection />
        <Footer />
      </div>
    </main>
  );
}

export default MainComponent;
