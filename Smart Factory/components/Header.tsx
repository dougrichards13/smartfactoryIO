import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkModeToggle';
import { motion, AnimatePresence } from 'motion/react';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-primary/95 backdrop-blur-md shadow-aggressive border-b border-secondary/20' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="w-10 h-10 gradient-secondary rounded-lg flex items-center justify-center glow-secondary">
              <span className="text-secondary-foreground font-black text-lg">SF</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg text-white uppercase tracking-wider leading-none">SMART FACTORY</span>
              <span className="text-xs text-secondary font-bold uppercase tracking-wider leading-none">AI CONSULTING</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-bold text-white/80 hover:text-secondary transition-colors uppercase tracking-wider relative group"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {item.label}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></div>
              </motion.button>
            ))}
          </nav>

          {/* Desktop CTA & Dark Mode */}
          <div className="hidden lg:flex items-center space-x-4">
            <DarkModeToggle />
            <Button 
              onClick={scrollToContact}
              className="gradient-accent text-accent-foreground font-bold px-6 py-2 hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-accent/20 uppercase tracking-wider"
            >
              GET STARTED
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <DarkModeToggle />
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
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-white/80 hover:text-secondary transition-colors font-bold uppercase tracking-wider px-4 py-2 hover:bg-white/5 rounded"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.label}
                  </motion.button>
                ))}
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