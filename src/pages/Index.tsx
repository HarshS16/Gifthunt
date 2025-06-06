
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GiftFinder } from '@/components/GiftFinder';
import { GiftResults } from '@/components/GiftResults';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Sparkles, Heart, Star } from 'lucide-react';

const Index = () => {
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchParams: any) => {
    setIsSearching(true);
    
    // Simulate AI processing and web scraping
    setTimeout(() => {
      const mockResults = {
        occasion: searchParams.occasion,
        budget: searchParams.budget,
        gifts: [
          {
            id: 1,
            name: "Premium Wireless Headphones",
            price: 129.99,
            image: "/placeholder.svg",
            description: "High-quality noise-canceling headphones perfect for music lovers",
            rating: 4.8,
            store: "TechStore",
            url: "#",
            tags: ["electronics", "music", "premium"]
          },
          {
            id: 2,
            name: "Artisan Coffee Subscription",
            price: 45.00,
            image: "/placeholder.svg",
            description: "Monthly delivery of premium coffee beans from around the world",
            rating: 4.9,
            store: "CoffeeWorld",
            url: "#",
            tags: ["coffee", "subscription", "gourmet"]
          },
          {
            id: 3,
            name: "Smart Fitness Tracker",
            price: 89.99,
            image: "/placeholder.svg",
            description: "Track workouts, heart rate, and sleep patterns with this sleek device",
            rating: 4.6,
            store: "FitTech",
            url: "#",
            tags: ["fitness", "health", "smart"]
          },
          {
            id: 4,
            name: "Luxury Candle Set",
            price: 35.00,
            image: "/placeholder.svg",
            description: "Hand-poured soy candles with essential oils for relaxation",
            rating: 4.7,
            store: "HomeScents",
            url: "#",
            tags: ["home", "relaxation", "luxury"]
          },
          {
            id: 5,
            name: "Leather Journal & Pen Set",
            price: 42.50,
            image: "/placeholder.svg",
            description: "Handcrafted leather journal with premium fountain pen",
            rating: 4.5,
            store: "Stationery Plus",
            url: "#",
            tags: ["writing", "leather", "premium"]
          },
          {
            id: 6,
            name: "Gourmet Chocolate Box",
            price: 28.99,
            image: "/placeholder.svg",
            description: "Assorted premium chocolates from award-winning chocolatiers",
            rating: 4.9,
            store: "Sweet Treats",
            url: "#",
            tags: ["chocolate", "gourmet", "sweet"]
          }
        ]
      };
      
      setSearchResults(mockResults);
      setIsSearching(false);
    }, 2000);
  };

  const resetSearch = () => {
    setSearchResults(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative z-10">
          <Header />
          
          {!searchResults ? (
            <>
              <Hero />
              <div className="container mx-auto px-4 py-8">
                <GiftFinder onSearch={handleSearch} isSearching={isSearching} />
              </div>
            </>
          ) : (
            <div className="container mx-auto px-4 py-8">
              <GiftResults results={searchResults} onReset={resetSearch} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
