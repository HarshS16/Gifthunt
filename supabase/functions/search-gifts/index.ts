
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { searchParams } = await req.json();
    
    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Store the search in database
    const { data: searchData, error: searchError } = await supabase
      .from('gift_searches')
      .insert({
        user_id: searchParams.userId || null,
        occasion: searchParams.occasion,
        budget_min: searchParams.budget[0],
        budget_max: searchParams.budget[0],
        recipient_age: parseInt(searchParams.age) || null,
        recipient_gender: searchParams.gender,
        interests: searchParams.interests,
        relationship: searchParams.relationship,
        personality_type: searchParams.personalityType
      })
      .select()
      .single();

    if (searchError) {
      throw new Error(`Search storage failed: ${searchError.message}`);
    }

    // Generate AI-powered search query
    const searchQuery = generateSearchQuery(searchParams);
    
    // Mock web scraping results (in production, you'd implement actual scraping)
    const giftResults = await generateMockGiftResults(searchParams, searchQuery);
    
    // Store results in database with AI relevance scores
    const resultsToInsert = giftResults.map(gift => ({
      search_id: searchData.id,
      name: gift.name,
      description: gift.description,
      price: gift.price,
      image_url: gift.image_url,
      product_url: gift.product_url,
      store_name: gift.store_name,
      rating: gift.rating,
      tags: gift.tags,
      ai_relevance_score: gift.ai_relevance_score
    }));

    const { data: resultsData, error: resultsError } = await supabase
      .from('gift_results')
      .insert(resultsToInsert)
      .select();

    if (resultsError) {
      throw new Error(`Results storage failed: ${resultsError.message}`);
    }

    return new Response(JSON.stringify({
      searchId: searchData.id,
      results: resultsData
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in search-gifts function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function generateSearchQuery(params: any): string {
  const { occasion, interests, personalityType, relationship, gender, age, budget } = params;
  
  let query = `${occasion} gift`;
  
  if (interests && interests.length > 0) {
    query += ` for ${interests.slice(0, 2).join(' and ')} lover`;
  }
  
  if (personalityType) {
    query += ` ${personalityType} person`;
  }
  
  if (relationship) {
    query += ` for ${relationship}`;
  }
  
  if (gender && gender !== 'prefer-not-to-say') {
    query += ` ${gender}`;
  }
  
  if (age) {
    if (parseInt(age) < 18) query += ' teen';
    else if (parseInt(age) > 60) query += ' senior';
    else query += ' adult';
  }
  
  query += ` under $${budget[0]}`;
  
  return query;
}

async function generateMockGiftResults(params: any, searchQuery: string) {
  // This simulates AI-powered web scraping results
  // In production, you'd implement actual web scraping here
  
  const baseGifts = [
    {
      name: "Premium Wireless Headphones",
      description: "High-quality noise-canceling headphones perfect for music lovers",
      price: 129.99,
      image_url: "/placeholder.svg",
      product_url: "https://example.com/headphones",
      store_name: "TechStore",
      rating: 4.8,
      tags: ["electronics", "music", "premium"],
      ai_relevance_score: 0.95
    },
    {
      name: "Artisan Coffee Subscription",
      description: "Monthly delivery of premium coffee beans from around the world",
      price: 45.00,
      image_url: "/placeholder.svg",
      product_url: "https://example.com/coffee",
      store_name: "CoffeeWorld",
      rating: 4.9,
      tags: ["coffee", "subscription", "gourmet"],
      ai_relevance_score: 0.88
    },
    {
      name: "Smart Fitness Tracker",
      description: "Track workouts, heart rate, and sleep patterns with this sleek device",
      price: 89.99,
      image_url: "/placeholder.svg",
      product_url: "https://example.com/fitness",
      store_name: "FitTech",
      rating: 4.6,
      tags: ["fitness", "health", "smart"],
      ai_relevance_score: 0.82
    },
    {
      name: "Luxury Candle Set",
      description: "Hand-poured soy candles with essential oils for relaxation",
      price: 35.00,
      image_url: "/placeholder.svg",
      product_url: "https://example.com/candles",
      store_name: "HomeScents",
      rating: 4.7,
      tags: ["home", "relaxation", "luxury"],
      ai_relevance_score: 0.79
    },
    {
      name: "Leather Journal & Pen Set",
      description: "Handcrafted leather journal with premium fountain pen",
      price: 42.50,
      image_url: "/placeholder.svg",
      product_url: "https://example.com/journal",
      store_name: "Stationery Plus",
      rating: 4.5,
      tags: ["writing", "leather", "premium"],
      ai_relevance_score: 0.85
    },
    {
      name: "Gourmet Chocolate Box",
      description: "Assorted premium chocolates from award-winning chocolatiers",
      price: 28.99,
      image_url: "/placeholder.svg",
      product_url: "https://example.com/chocolate",
      store_name: "Sweet Treats",
      rating: 4.9,
      tags: ["chocolate", "gourmet", "sweet"],
      ai_relevance_score: 0.91
    }
  ];

  // Filter gifts based on budget
  const budgetFiltered = baseGifts.filter(gift => gift.price <= params.budget[0]);
  
  // Apply AI relevance scoring based on interests and personality
  const scoredGifts = budgetFiltered.map(gift => {
    let score = gift.ai_relevance_score;
    
    // Boost score if gift tags match user interests
    if (params.interests) {
      const matchingInterests = gift.tags.filter(tag => 
        params.interests.some((interest: string) => 
          interest.toLowerCase().includes(tag.toLowerCase()) || 
          tag.toLowerCase().includes(interest.toLowerCase())
        )
      );
      score += matchingInterests.length * 0.1;
    }
    
    // Adjust score based on personality type
    if (params.personalityType) {
      if (params.personalityType === 'Tech Enthusiast' && gift.tags.includes('electronics')) {
        score += 0.15;
      }
      if (params.personalityType === 'Luxury Lover' && gift.tags.includes('luxury')) {
        score += 0.15;
      }
      if (params.personalityType === 'Practical' && gift.tags.includes('useful')) {
        score += 0.15;
      }
    }
    
    return { ...gift, ai_relevance_score: Math.min(score, 1.0) };
  });
  
  // Sort by AI relevance score and return top results
  return scoredGifts
    .sort((a, b) => b.ai_relevance_score - a.ai_relevance_score)
    .slice(0, 6);
}
