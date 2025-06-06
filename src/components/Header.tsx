
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Gift, User, LogOut, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AuthModal } from '@/components/AuthModal';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const headerVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const logoVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  const navItemVariants = {
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    }
  };

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 backdrop-blur-sm bg-black/20"
        variants={headerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              className="flex items-center space-x-2 cursor-pointer"
              variants={logoVariants}
              whileHover="hover"
            >
              <div className="relative">
                <Gift className="h-8 w-8 text-purple-400" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
                </motion.div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Gifthunt</h1>
                <p className="text-xs text-purple-300">AI-Powered Gift Discovery</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.div variants={navItemVariants} whileHover="hover">
                <Button variant="ghost" className="text-white hover:text-purple-300 hover:bg-white/10">
                  How it Works
                </Button>
              </motion.div>
              <motion.div variants={navItemVariants} whileHover="hover">
                <Button variant="ghost" className="text-white hover:text-purple-300 hover:bg-white/10">
                  About
                </Button>
              </motion.div>
              
              {user ? (
                <div className="flex items-center space-x-2">
                  <motion.div variants={navItemVariants} whileHover="hover">
                    <Button
                      variant="ghost"
                      className="text-white hover:text-purple-300 hover:bg-white/10"
                    >
                      <User className="h-4 w-4 mr-2" />
                      {user.email}
                    </Button>
                  </motion.div>
                  <motion.div variants={navItemVariants} whileHover="hover">
                    <Button
                      onClick={handleSignOut}
                      variant="ghost"
                      className="text-white hover:text-red-300 hover:bg-white/10"
                    >
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              ) : (
                <motion.div variants={navItemVariants} whileHover="hover">
                  <Button
                    onClick={() => setShowAuthModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                  >
                    Sign In
                  </Button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white hover:bg-white/10"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ 
            height: isMobileMenuOpen ? 'auto' : 0, 
            opacity: isMobileMenuOpen ? 1 : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-4 py-4 space-y-2 bg-black/30 backdrop-blur-sm">
            <Button variant="ghost" className="w-full text-left text-white hover:text-purple-300 hover:bg-white/10">
              How it Works
            </Button>
            <Button variant="ghost" className="w-full text-left text-white hover:text-purple-300 hover:bg-white/10">
              About
            </Button>
            {user ? (
              <>
                <Button variant="ghost" className="w-full text-left text-white hover:text-purple-300 hover:bg-white/10">
                  <User className="h-4 w-4 mr-2" />
                  {user.email}
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full text-left text-white hover:text-red-300 hover:bg-white/10"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setShowAuthModal(true)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              >
                Sign In
              </Button>
            )}
          </div>
        </motion.div>
      </motion.header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => setShowAuthModal(false)}
      />
    </>
  );
};
