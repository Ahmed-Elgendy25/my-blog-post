"use client";
import HeroSection from "./HeroSection";
import PostHero from "./_posts/PostHero";
import AuthorSection from "./_author/AuthorSection";
import contentStyle from "./_style/content.module.css";
import Footer from "./_footer/Footer";
import Navbar from "@/app/shared/Navbar";
import { BlogPostsResponse } from "../magazine/_schema/PaginatedArticles";

function MainComponent({ articles }: { articles: BlogPostsResponse }) {
  return (
    <main className="relative">
      <div className={contentStyle.content}>
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
