
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Sparkles, Brain, Search, Heart, Gift } from 'lucide-react';

export const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    // Title animation
    if (titleRef.current) {
      tl.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 100,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out"
        }
      );
    }

    // Subtitle animation
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out"
        },
        "-=0.5"
      );
    }

    // Features animation
    if (featuresRef.current) {
      tl.fromTo(featuresRef.current.children,
        {
          opacity: 0,
          y: 30,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.2,
          ease: "back.out(1.7)"
        },
        "-=0.3"
      );
    }
  }, []);

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const featureVariants = {
    hover: { 
      scale: 1.05,
      y: -5,
      transition: { duration: 0.3 }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="text-center py-20 px-4 relative overflow-hidden">
      {/* Floating background elements */}
      <motion.div 
        className="absolute top-20 left-1/4 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
      />
      <motion.div 
        className="absolute bottom-20 right-1/4 w-16 h-16 bg-pink-500/20 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 2 }}
      />
      <motion.div 
        className="absolute top-1/2 left-10 w-12 h-12 bg-blue-500/20 rounded-full blur-xl"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 4 }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="relative inline-block mb-8">
          <motion.h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            variants={titleVariants}
            initial="hidden"
            animate="visible"
          >
            Find the
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 relative">
              {" "}Perfect Gift
              <motion.div
                className="absolute -top-2 -right-8"
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Sparkles className="h-8 w-8 text-yellow-400" />
              </motion.div>
            </span>
            <br />
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              with Gifthunt
            </motion.span>
          </motion.h1>
        </div>
        
        <motion.p 
          ref={subtitleRef}
          className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Our AI-powered platform scans the web to find personalized gift recommendations 
          based on occasion, budget, and recipient preferences. Discover unique gifts from across the internet.
        </motion.p>
        
        <motion.div 
          ref={featuresRef}
          className="flex flex-wrap justify-center gap-8 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.div 
            className="flex items-center space-x-3 text-gray-300 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            variants={featureVariants}
            whileHover="hover"
          >
            <div className="p-3 bg-purple-500/20 rounded-full relative">
              <Brain className="h-6 w-6 text-purple-400" />
              <motion.div
                className="absolute inset-0 bg-purple-500/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="font-medium">AI-Powered Matching</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-3 text-gray-300 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            variants={featureVariants}
            whileHover="hover"
          >
            <div className="p-3 bg-blue-500/20 rounded-full relative">
              <Search className="h-6 w-6 text-blue-400" />
              <motion.div
                className="absolute inset-0 bg-blue-500/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.7 }}
              />
            </div>
            <span className="font-medium">Web-Wide Search</span>
          </motion.div>
          
          <motion.div 
            className="flex items-center space-x-3 text-gray-300 p-4 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
            variants={featureVariants}
            whileHover="hover"
          >
            <div className="p-3 bg-pink-500/20 rounded-full relative">
              <Heart className="h-6 w-6 text-pink-400" />
              <motion.div
                className="absolute inset-0 bg-pink-500/20 rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.4 }}
              />
            </div>
            <span className="font-medium">Personalized Results</span>
          </motion.div>
        </motion.div>

        {/* Call to action with floating gift icons */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <motion.div
            className="absolute -left-10 top-0"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <Gift className="h-8 w-8 text-purple-400/50" />
          </motion.div>
          <motion.div
            className="absolute -right-10 top-0"
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, -10, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          >
            <Gift className="h-8 w-8 text-pink-400/50" />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
