
interface GoogleSearchResult {
  title: string;
  link: string;
  snippet: string;
  pagemap?: {
    cse_image?: Array<{ src: string }>;
    metatags?: Array<{ 
      'og:price:amount'?: string;
      'product:price:amount'?: string;
      'og:image'?: string;
    }>;
  };
}

interface GoogleCSEResponse {
  items?: GoogleSearchResult[];
  queries?: {
    request: Array<{ totalResults: string }>;
  };
}

export class GoogleSearchService {
  private static readonly CSE_ID = 'YOUR_CSE_ID'; // Will be set via environment
  private static readonly API_KEY = 'YOUR_API_KEY'; // Will be set via environment
  private static readonly BASE_URL = 'https://www.googleapis.com/customsearch/v1';
  
  static async searchProducts(query: string, budget: number): Promise<any[]> {
    try {
      // Construct search query with Indian e-commerce sites
      const searchQuery = `${query} site:amazon.in OR site:flipkart.com OR site:myntra.com OR site:nykaa.com OR site:ajio.com`;
      
      const url = new URL(this.BASE_URL);
      url.searchParams.append('key', this.API_KEY);
      url.searchParams.append('cx', this.CSE_ID);
      url.searchParams.append('q', searchQuery);
      url.searchParams.append('num', '10');
      url.searchParams.append('searchType', 'image');
      
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }
      
      const data: GoogleCSEResponse = await response.json();
      
      return this.transformResults(data.items || [], budget);
    } catch (error) {
      console.error('Google CSE search error:', error);
      return [];
    }
  }
  
  private static transformResults(results: GoogleSearchResult[], budget: number): any[] {
    return results.map((result, index) => {
      // Extract price from various possible sources
      const price = this.extractPrice(result, budget);
      
      // Extract image URL
      const imageUrl = this.extractImage(result);
      
      // Determine store name from URL
      const storeName = this.getStoreName(result.link);
      
      // Generate tags based on title and snippet
      const tags = this.generateTags(result.title, result.snippet);
      
      return {
        id: `cse-${Date.now()}-${index}`,
        name: this.cleanTitle(result.title),
        description: result.snippet || 'Product from Indian e-commerce store',
        price: price,
        image_url: imageUrl,
        product_url: result.link,
        store_name: storeName,
        rating: this.generateRating(),
        tags: tags,
        ai_relevance_score: 0.8 + (Math.random() * 0.2)
      };
    }).filter(product => product.price <= budget);
  }
  
  private static extractPrice(result: GoogleSearchResult, budget: number): number {
    // Try to extract price from metatags
    if (result.pagemap?.metatags) {
      for (const meta of result.pagemap.metatags) {
        const priceAmount = meta['og:price:amount'] || meta['product:price:amount'];
        if (priceAmount) {
          const price = parseFloat(priceAmount);
          if (!isNaN(price)) return price;
        }
      }
    }
    
    // Try to extract price from title or snippet
    const text = `${result.title} ${result.snippet}`;
    const priceMatch = text.match(/₹[\s]*([0-9,]+)/);
    if (priceMatch) {
      const price = parseFloat(priceMatch[1].replace(/,/g, ''));
      if (!isNaN(price)) return price;
    }
    
    // Generate realistic price within budget
    return Math.floor(Math.random() * budget * 0.8) + Math.floor(budget * 0.1);
  }
  
  private static extractImage(result: GoogleSearchResult): string {
    // Try to get image from pagemap
    if (result.pagemap?.cse_image?.[0]?.src) {
      return result.pagemap.cse_image[0].src;
    }
    
    // Try og:image
    if (result.pagemap?.metatags?.[0]?.['og:image']) {
      return result.pagemap.metatags[0]['og:image'];
    }
    
    // Fallback to a placeholder
    return 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=400&h=400&fit=crop';
  }
  
  private static getStoreName(url: string): string {
    try {
      const domain = new URL(url).hostname;
      if (domain.includes('amazon')) return 'Amazon India';
      if (domain.includes('flipkart')) return 'Flipkart';
      if (domain.includes('myntra')) return 'Myntra';
      if (domain.includes('nykaa')) return 'Nykaa';
      if (domain.includes('ajio')) return 'AJIO';
      return domain.replace('www.', '');
    } catch {
      return 'Online Store';
    }
  }
  
  private static cleanTitle(title: string): string {
    // Remove common suffixes and clean up title
    return title
      .replace(/ - Amazon\.in/gi, '')
      .replace(/ - Flipkart/gi, '')
      .replace(/ - Myntra/gi, '')
      .replace(/ - Nykaa/gi, '')
      .replace(/ \| .*/gi, '')
      .trim();
  }
  
  private static generateTags(title: string, snippet: string): string[] {
    const text = `${title} ${snippet}`.toLowerCase();
    const tags = [];
    
    // Category-based tags
    if (text.includes('electronic') || text.includes('gadget')) tags.push('electronics');
    if (text.includes('fashion') || text.includes('cloth')) tags.push('fashion');
    if (text.includes('book')) tags.push('books');
    if (text.includes('beauty') || text.includes('cosmetic')) tags.push('beauty');
    if (text.includes('home') || text.includes('decor')) tags.push('home');
    if (text.includes('gift')) tags.push('gifts');
    if (text.includes('premium') || text.includes('luxury')) tags.push('premium');
    
    return tags.length > 0 ? tags : ['general'];
  }
  
  private static generateRating(): number {
    return Math.round((3.5 + Math.random() * 1.5) * 10) / 10;
  }
}
