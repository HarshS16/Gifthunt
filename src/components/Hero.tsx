
import { Sparkles, Brain, Search, Heart } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="text-center py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="relative inline-block">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 relative">
              {" "}Perfect Gift
              <Sparkles className="absolute -top-2 -right-8 h-8 w-8 text-yellow-400 animate-pulse" />
            </span>
          </h1>
        </div>
        
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          Our AI-powered platform scans the web to find personalized gift recommendations 
          based on occasion, budget, and recipient preferences. Discover unique gifts from across the internet.
        </p>
        
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          <div className="flex items-center space-x-3 text-gray-300">
            <div className="p-2 bg-purple-500/20 rounded-full">
              <Brain className="h-6 w-6 text-purple-400" />
            </div>
            <span>AI-Powered Matching</span>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-300">
            <div className="p-2 bg-blue-500/20 rounded-full">
              <Search className="h-6 w-6 text-blue-400" />
            </div>
            <span>Web-Wide Search</span>
          </div>
          
          <div className="flex items-center space-x-3 text-gray-300">
            <div className="p-2 bg-pink-500/20 rounded-full">
              <Heart className="h-6 w-6 text-pink-400" />
            </div>
            <span>Personalized Results</span>
          </div>
        </div>
      </div>
    </div>
  );
};
