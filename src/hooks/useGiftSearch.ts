
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface GiftSearchParams {
  occasion: string;
  budget: number[];
  recipient: string;
  age: string;
  gender: string;
  interests: string[];
  relationship: string;
  personalityType: string;
}

interface GiftResult {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  product_url: string;
  store_name: string;
  rating: number;
  tags: string[];
  ai_relevance_score: number;
}

export const useGiftSearch = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const { toast } = useToast();

  const searchGifts = async (params: GiftSearchParams) => {
    setIsSearching(true);
    
    try {
      // Get current user (optional for now)
      const { data: { user } } = await supabase.auth.getUser();
      
      // Call the edge function
      const { data, error } = await supabase.functions.invoke('search-gifts', {
        body: {
          searchParams: {
            ...params,
            userId: user?.id || null
          }
        }
      });

      if (error) {
        throw error;
      }

      // Transform results to match the existing interface
      const transformedResults = {
        occasion: params.occasion,
        budget: params.budget,
        gifts: data.results.map((result: any) => ({
          id: result.id,
          name: result.name,
          price: result.price,
          image: result.image_url,
          description: result.description,
          rating: result.rating,
          store: result.store_name,
          url: result.product_url,
          tags: result.tags
        }))
      };

      setSearchResults(transformedResults);
      
      toast({
        title: "Search Complete!",
        description: `Found ${data.results.length} personalized gift recommendations.`,
      });

    } catch (error: any) {
      console.error('Gift search error:', error);
      toast({
        title: "Search Failed",
        description: error.message || "An error occurred while searching for gifts.",
        variant: "destructive",
      });
    } finally {
      setIsSearching(false);
    }
  };

  const resetSearch = () => {
    setSearchResults(null);
  };

  return {
    searchGifts,
    resetSearch,
    isSearching,
    searchResults
  };
};
