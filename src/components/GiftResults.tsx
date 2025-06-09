import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, ExternalLink, Heart, ArrowLeft, Filter, SortAsc, AlertCircle } from 'lucide-react';
import { GoogleCSESetup } from './GoogleCSESetup';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface Gift {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
  store: string;
  url: string;
  tags: string[];
}

interface GiftResultsProps {
  results: {
    occasion: string;
    budget: number[];
    gifts: Gift[];
  };
  onReset: () => void;
}

export const GiftResults = ({ results, onReset }: GiftResultsProps) => {
  const [sortBy, setSortBy] = useState('relevance');
  const [filterBy, setFilterBy] = useState('all');
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (giftId: number) => {
    setFavorites(prev => 
      prev.includes(giftId) 
        ? prev.filter(id => id !== giftId)
        : [...prev, giftId]
    );
  };

  const sortedGifts = [...results.gifts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const filteredGifts = sortedGifts.filter(gift => {
    if (filterBy === 'all') return true;
    return gift.tags.includes(filterBy);
  });

  const allTags = [...new Set(results.gifts.flatMap(gift => gift.tags))];

  // Check if we have real search results or fallback data
  const hasRealResults = results.gifts.some(gift => 
    gift.url.includes('amazon.in') || 
    gift.url.includes('flipkart.com') || 
    gift.url.includes('myntra.com') ||
    gift.url.includes('nykaa.com')
  );

  return (
    <div className="space-y-6">
      {/* Show setup guide if using fallback data */}
      {!hasRealResults && (
        <GoogleCSESetup />
      )}
      
      {/* Search Results Info */}
      {!hasRealResults && (
        <Alert className="bg-amber-50 border-amber-200">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Currently showing sample products. Set up Google CSE to get real product listings from Indian e-commerce sites.
          </AlertDescription>
        </Alert>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <Button
            onClick={onReset}
            variant="ghost"
            className="text-white hover:text-purple-300 hover:bg-white/10 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Search
          </Button>
          <h2 className="text-3xl font-bold text-white">
            Perfect Gifts for {results.occasion}
          </h2>
          <p className="text-gray-300 mt-1">
            Found {results.gifts.length} amazing gifts within your budget of ₹{results.budget[0].toLocaleString('en-IN')}
            {hasRealResults && ' from top Indian e-commerce sites'}
          </p>
        </div>
        
        <div className="flex gap-3">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-40 bg-black/50 border-white/30 text-white">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {allTags.map(tag => (
                <SelectItem key={tag} value={tag} className="capitalize">
                  {tag}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-40 bg-black/50 border-white/30 text-white">
              <SortAsc className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Most Relevant</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGifts.map(gift => (
          <Card key={gift.id} className="group bg-black/40 backdrop-blur-md border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105 overflow-hidden">
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                <img 
                  src={gift.image} 
                  alt={gift.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                onClick={() => toggleFavorite(gift.id)}
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2"
              >
                <Heart 
                  className={`h-4 w-4 ${favorites.includes(gift.id) ? 'fill-red-500 text-red-500' : ''}`} 
                />
              </Button>
              <div className="absolute bottom-2 left-2">
                <Badge className="bg-green-600 text-white">
                  ₹{gift.price.toLocaleString('en-IN')}
                </Badge>
              </div>
            </div>
            
            <div className="p-4 space-y-3">
              <div>
                <h3 className="font-semibold text-white text-lg group-hover:text-purple-300 transition-colors line-clamp-2">
                  {gift.name}
                </h3>
                <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                  {gift.description}
                </p>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-white font-medium">{gift.rating}</span>
                </div>
                <span className="text-gray-400">{gift.store}</span>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {gift.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-purple-500/20 text-purple-300">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300"
                onClick={() => window.open(gift.url, '_blank')}
              >
                View Gift
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredGifts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No gifts found matching your filters.</p>
          <Button
            onClick={() => setFilterBy('all')}
            variant="ghost"
            className="text-purple-400 hover:text-purple-300 mt-2"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  );
};
