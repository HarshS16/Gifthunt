
import { motion } from 'framer-motion';
import { Gift, Sparkles, Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Footer = () => {
  const footerVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const linkVariants = {
    hover: { 
      scale: 1.05,
      color: "#a855f7",
      transition: { duration: 0.2 }
    }
  };

  const socialVariants = {
    hover: { 
      scale: 1.2,
      rotate: 5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.footer 
      className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 border-t border-white/10"
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div 
            className="space-y-4"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Gift className="h-8 w-8 text-purple-400" />
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-yellow-400 absolute -top-1 -right-1" />
                </motion.div>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Gifthunt</h3>
                <p className="text-xs text-purple-300">AI-Powered Gift Discovery</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Discover the perfect gift with our AI-powered platform. We scan the web to find personalized recommendations based on your recipient's interests and your budget.
            </p>
            <div className="flex items-center space-x-2 text-purple-300">
              <Heart className="h-4 w-4" />
              <span className="text-sm">Made with love for gift givers</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="space-y-4"
            initial={{ x: -25, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['How it Works', 'About Us', 'Gift Categories', 'Popular Gifts', 'Blog', 'FAQ'].map((link, index) => (
                <motion.li key={link} variants={linkVariants} whileHover="hover">
                  <a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div 
            className="space-y-4"
            initial={{ x: 25, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2">
              {['Contact Us', 'Help Center', 'Privacy Policy', 'Terms of Service', 'Refund Policy', 'Partnerships'].map((link, index) => (
                <motion.li key={link} variants={linkVariants} whileHover="hover">
                  <a href="#" className="text-gray-300 hover:text-purple-400 text-sm transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter & Contact */}
          <motion.div 
            className="space-y-4"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold text-white">Stay Updated</h4>
            <p className="text-gray-300 text-sm">Get the latest gift ideas and exclusive deals.</p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-black/50 border-white/30 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Subscribe
              </Button>
            </div>
            
            <div className="space-y-2 pt-4">
              <h5 className="text-white font-medium">Contact Info</h5>
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Mail className="h-4 w-4" />
                  <span>hello@gifthunt.com</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-300 text-sm">
                  <MapPin className="h-4 w-4" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Social Media & Copyright */}
        <motion.div 
          className="border-t border-white/10 mt-12 pt-8"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" },
                { icon: Linkedin, href: "#" }
              ].map(({ icon: Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  variants={socialVariants}
                  whileHover="hover"
                  className="p-2 bg-white/10 rounded-full text-gray-300 hover:text-white hover:bg-purple-600 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-gray-400 text-sm text-center md:text-right">
              © 2024 Gifthunt. All rights reserved. | Powered by AI, driven by love.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
};
