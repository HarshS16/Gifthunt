
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
    
    // Generate Indian market gift results
    const giftResults = await generateIndianGiftResults(searchParams, searchQuery);
    
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
  
  let query = `${occasion} gift India`;
  
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
  
  query += ` under ₹${budget[0]}`;
  
  return query;
}

async function generateIndianGiftResults(params: any, searchQuery: string) {
  // This generates Indian market-focused gift results with INR pricing
  // In production, you'd implement actual web scraping for Indian e-commerce sites
  
  const baseGifts = [
    {
      name: "Premium Wireless Bluetooth Headphones",
      description: "High-quality noise-canceling headphones perfect for music lovers",
      price: 2999,
      image_url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      product_url: "https://www.amazon.in/headphones",
      store_name: "Amazon India",
      rating: 4.8,
      tags: ["electronics", "music", "premium"],
      ai_relevance_score: 0.95
    },
    {
      name: "Artisan Masala Chai Gift Set",
      description: "Premium tea collection with traditional Indian spices and brewing accessories",
      price: 899,
      image_url: "https://images.unsplash.com/photo-1594631661960-69a5789ce67b?w=400&h=400&fit=crop",
      product_url: "https://www.teabox.com/gift-sets",
      store_name: "Teabox",
      rating: 4.9,
      tags: ["tea", "traditional", "gourmet"],
      ai_relevance_score: 0.88
    },
    {
      name: "Smart Fitness Band with Heart Rate Monitor",
      description: "Track workouts, heart rate, and sleep patterns with this advanced fitness tracker",
      price: 1999,
      image_url: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      product_url: "https://www.flipkart.com/fitness-tracker",
      store_name: "Flipkart",
      rating: 4.6,
      tags: ["fitness", "health", "smart"],
      ai_relevance_score: 0.82
    },
    {
      name: "Handcrafted Aromatherapy Candle Set",
      description: "Hand-poured soy candles with essential oils for relaxation and meditation",
      price: 749,
      image_url: "https://images.unsplash.com/photo-1602874801006-36d71b7cbb73?w=400&h=400&fit=crop",
      product_url: "https://www.nykaa.com/candles",
      store_name: "Nykaa",
      rating: 4.7,
      tags: ["home", "relaxation", "aromatherapy"],
      ai_relevance_score: 0.79
    },
    {
      name: "Leather-bound Journal with Fountain Pen",
      description: "Handcrafted leather journal with premium fountain pen for writers",
      price: 1299,
      image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
      product_url: "https://www.amazon.in/leather-journal",
      store_name: "Amazon India",
      rating: 4.5,
      tags: ["writing", "leather", "premium"],
      ai_relevance_score: 0.85
    },
    {
      name: "Artisan Dark Chocolate Gift Box",
      description: "Assorted premium chocolates from award-winning Indian chocolatiers",
      price: 649,
      image_url: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop",
      product_url: "https://www.fabelle.in/gift-boxes",
      store_name: "Fabelle",
      rating: 4.9,
      tags: ["chocolate", "gourmet", "sweet"],
      ai_relevance_score: 0.91
    },
    {
      name: "Traditional Pashmina Shawl",
      description: "Authentic Kashmir Pashmina shawl with intricate embroidery work",
      price: 3499,
      image_url: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      product_url: "https://www.kashmirica.com/pashmina",
      store_name: "Kashmirica",
      rating: 4.8,
      tags: ["fashion", "traditional", "luxury"],
      ai_relevance_score: 0.87
    },
    {
      name: "Yoga Meditation Starter Kit",
      description: "Complete yoga set with mat, blocks, strap and meditation cushion",
      price: 1899,
      image_url: "https://images.unsplash.com/photo-1588286840104-8957b019727f?w=400&h=400&fit=crop",
      product_url: "https://www.decathlon.in/yoga-kit",
      store_name: "Decathlon",
      rating: 4.6,
      tags: ["fitness", "yoga", "wellness"],
      ai_relevance_score: 0.83
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
    
    // Add cultural relevance for Indian occasions
    if (params.occasion === 'Diwali' && gift.tags.includes('traditional')) {
      score += 0.2;
    }
    if (params.occasion === 'Holi' && gift.tags.includes('colorful')) {
      score += 0.2;
    }
    
    return { ...gift, ai_relevance_score: Math.min(score, 1.0) };
  });
  
  // Sort by AI relevance score and return top results
  return scoredGifts
    .sort((a, b) => b.ai_relevance_score - a.ai_relevance_score)
    .slice(0, 6);
}
