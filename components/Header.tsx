import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToContact = () => {
    scrollToSection('contact');
  };

  const navItems = [
    { label: 'ABOUT', id: 'about' },
    { label: 'SERVICES', id: 'services' },
    { label: 'AI ACCELERATOR', id: 'ai-accelerator' },
    { label: 'METHOD', id: 'method' },
    { label: 'RESULTS', id: 'results' },
    { label: 'TEAM', id: 'team' }
  ];

  return (
    <motion.header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-primary/80 backdrop-blur-xl border-b border-secondary/30' 
          : 'bg-gradient-to-b from-black/20 to-transparent'
      } shadow-2xl`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      style={{
        boxShadow: isScrolled 
          ? '0 8px 32px rgba(217, 128, 140, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
          : 'none'
      }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span className="font-black text-2xl text-white uppercase tracking-[0.2em] leading-none drop-shadow-lg">SMART FACTORY</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => {
              // Define unique hover colors for each nav item
              const getHoverColors = (itemIndex: number) => {
                const colors = [
                  { text: 'group-hover:text-primary', bg: 'from-primary/10 to-primary/20', underline: 'from-primary to-primary-light' }, // About - Electric Blue
                  { text: 'group-hover:text-secondary', bg: 'from-secondary/10 to-secondary/20', underline: 'from-secondary to-secondary-light' }, // Services - Neon Green
                  { text: 'group-hover:text-tertiary', bg: 'from-tertiary/10 to-tertiary/20', underline: 'from-tertiary to-tertiary-light' }, // AI Accelerator - Pale Sky
                  { text: 'group-hover:text-primary', bg: 'from-primary/10 to-primary/20', underline: 'from-primary to-primary-light' }, // Method - Electric Blue
                  { text: 'group-hover:text-secondary', bg: 'from-secondary/10 to-secondary/20', underline: 'from-secondary to-secondary-light' }, // Results - Neon Green
                  { text: 'group-hover:text-tertiary', bg: 'from-tertiary/10 to-tertiary/20', underline: 'from-tertiary to-tertiary-light' }, // Team - Pale Sky
                ];
                return colors[itemIndex % colors.length];
              };
              
              const hoverColors = getHoverColors(index);
              
              return (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative text-sm font-bold text-white/90 hover:text-white ${hoverColors.text} transition-all duration-300 uppercase tracking-[0.1em] py-2 px-3 group`}
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  {item.label}
                  <div className={`absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r ${hoverColors.underline} transition-all duration-500 group-hover:w-full rounded-full`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${hoverColors.bg} rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10`}></div>
                  <div className={`absolute inset-0 bg-gradient-to-r ${hoverColors.bg} rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 blur-sm`}></div>
                </motion.button>
              );
            })}
          </nav>

          {/* Desktop CTA & Dark Mode */}
          <div className="hidden lg:flex items-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={scrollToContact}
                className="relative bg-gradient-to-r from-secondary to-accent text-black font-bold px-8 py-3 rounded-xl uppercase tracking-[0.1em] text-sm shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10"
                style={{
                  boxShadow: '0 4px 20px rgba(217, 128, 140, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                GET STARTED
                <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10 border border-white/20"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-white/20 bg-primary/95 backdrop-blur-md"
            >
              <nav className="py-6 space-y-4">
                {navItems.map((item, index) => {
                  // Define unique hover colors for mobile menu
                  const getMobileHoverColors = (itemIndex: number) => {
                    const colors = [
                      { text: 'hover:text-primary', bg: 'hover:bg-primary/10' }, // About - Electric Blue
                      { text: 'hover:text-secondary', bg: 'hover:bg-secondary/10' }, // Services - Neon Green
                      { text: 'hover:text-tertiary', bg: 'hover:bg-tertiary/10' }, // AI Accelerator - Pale Sky
                      { text: 'hover:text-primary', bg: 'hover:bg-primary/10' }, // Method - Electric Blue
                      { text: 'hover:text-secondary', bg: 'hover:bg-secondary/10' }, // Results - Neon Green
                      { text: 'hover:text-tertiary', bg: 'hover:bg-tertiary/10' }, // Team - Pale Sky
                    ];
                    return colors[itemIndex % colors.length];
                  };
                  
                  const mobileHoverColors = getMobileHoverColors(index);
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`block w-full text-left text-white/80 ${mobileHoverColors.text} ${mobileHoverColors.bg} transition-all duration-300 font-bold uppercase tracking-wider px-4 py-2 rounded-lg border border-transparent hover:border-white/10`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      {item.label}
                    </motion.button>
                  );
                })}
                <motion.div 
                  className="px-4 pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Button 
                    onClick={scrollToContact}
                    className="w-full gradient-accent text-accent-foreground font-bold py-3 hover:shadow-xl transition-all duration-300 border-2 border-accent/20 uppercase tracking-wider"
                  >
                    GET STARTED
                  </Button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
