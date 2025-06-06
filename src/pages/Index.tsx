
import { GiftFinder } from '@/components/GiftFinder';
import { GiftResults } from '@/components/GiftResults';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { useGiftSearch } from '@/hooks/useGiftSearch';

const Index = () => {
  const { searchGifts, resetSearch, isSearching, searchResults } = useGiftSearch();

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
                <GiftFinder onSearch={searchGifts} isSearching={isSearching} />
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
