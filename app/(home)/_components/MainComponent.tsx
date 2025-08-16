'use client'
import Preloader from './_preloader/Preloader'
import { useEffect, useRef, useState } from 'react'
import HeroSection from './HeroSection'
import PostHero from './_posts/PostHero'
import AuthorSection from './_author/AuthorSection'
import gsap from 'gsap'


 import contentStyle from "./_style/content.module.css"
import Footer from './_footer/Footer'
import Navbar from '@/app/shared/Navbar'
import { BlogPostsResponse } from '../magazine/_schema/PaginatedArticles'

function MainComponent({articles}:{articles:BlogPostsResponse}) {
  const [loading, setLoading] = useState(true)
  const preloaderRef = useRef(null)
  const contentRef = useRef(null)

console.log("Articles: ",articles.content)


  

  // Animate preloader out after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      gsap.to(preloaderRef.current, {
        yPercent: 100,
        duration:1,
        ease:"power3.inOut",
        onComplete: () => {
          setLoading(false)
        },
      })
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  // Animate content with timeline (after it's in DOM)
  useEffect(() => {
    if (!loading && contentRef.current) {
      const tl = gsap.timeline({defaults:{duration:0.45,ease:'power2.out'}});

      tl.to(contentRef.current, {
        clipPath: 'polygon(100% 80%, 100% 100%, 0 100%, 0 60%)',
      })
      .to(contentRef.current, {
        clipPath: 'polygon(100% 40%, 100% 100%, 0 100%, 0 20%)',
      })
      .to(contentRef.current, {
        clipPath: 'polygon(100% 0%, 100% 100%, 0 100%, 0 0%)',
      });
    }
  }, [loading]);
  
  
  
  
  return (
    <main className="relative">
      {loading && <Preloader preloaderRef={preloaderRef} />}

      {!loading && (
        <div
          ref={contentRef}
          className={contentStyle.content}
        >
          <Navbar/>
          <HeroSection />
          <PostHero articles={articles.content} />
          <AuthorSection/>
          <Footer/>

        </div>
      )}
    </main>
  )
}

export default MainComponent
