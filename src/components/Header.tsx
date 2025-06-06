
import { useState, useEffect } from 'react';
import { Sparkles, Gift, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial user
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "Come back soon!",
      });
    }
  };

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
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  className="text-white hover:text-purple-300 hover:bg-white/10"
                >
                  <User className="h-4 w-4 mr-2" />
                  {user.email}
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="text-white hover:text-red-300 hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {}}
      />
    </header>
  );
};
