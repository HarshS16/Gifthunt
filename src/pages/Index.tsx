
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GiftFinder } from '@/components/GiftFinder';
import { GiftResults } from '@/components/GiftResults';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Footer } from '@/components/Footer';
import { useGiftSearch } from '@/hooks/useGiftSearch';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const { searchGifts, resetSearch, isSearching, searchResults } = useGiftSearch();

  useEffect(() => {
    // GSAP scroll animations
    gsap.fromTo(".gift-finder", 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1,
        scrollTrigger: {
          trigger: ".gift-finder",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative">
        {/* Background decoration with enhanced animations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10">
          <Header />
          
          {/* Add padding top to account for fixed header */}
          <div className="pt-20">
            {!searchResults ? (
              <>
                <Hero />
                <div className="container mx-auto px-4 py-8 gift-finder">
                  <GiftFinder onSearch={searchGifts} isSearching={isSearching} />
                </div>
              </>
            ) : (
              <div className="container mx-auto px-4 py-8">
                <GiftResults results={searchResults} onReset={resetSearch} />
              </div>
            )}
          </div>
          
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
