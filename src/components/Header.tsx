
import { Sparkles, Gift } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const Header = () => {
  return (
    <header className="border-b border-white/10 backdrop-blur-sm bg-black/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Gift className="h-8 w-8 text-purple-400" />
              <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">GiftGenius</h1>
              <p className="text-xs text-purple-300">AI-Powered Gift Discovery</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-purple-300 hover:bg-white/10">
              How it Works
            </Button>
            <Button variant="ghost" className="text-white hover:text-purple-300 hover:bg-white/10">
              About
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
