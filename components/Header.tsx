import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { DarkModeToggle } from './DarkModeToggle';
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
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary via-accent to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary font-black text-xl">SF</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-accent/40 rounded-xl blur-lg -z-10"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-xl text-white uppercase tracking-[0.2em] leading-none drop-shadow-lg">SMART FACTORY</span>
              <span className="text-sm text-secondary font-bold uppercase tracking-[0.15em] leading-none mt-0.5">AI CONSULTING</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative text-sm font-bold text-white/90 hover:text-white transition-all duration-300 uppercase tracking-[0.1em] py-2 px-1 group"
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                {item.label}
                <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-secondary to-accent transition-all duration-500 group-hover:w-full"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10"></div>
              </motion.button>
            ))}
          </nav>

          {/* Desktop CTA & Dark Mode */}
          <div className="hidden lg:flex items-center space-x-4">
            <DarkModeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={scrollToContact}
                className="relative bg-gradient-to-r from-secondary to-accent text-primary font-bold px-8 py-3 rounded-xl uppercase tracking-[0.1em] text-sm shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20"
                style={{
                  boxShadow: '0 4px 20px rgba(217, 128, 140, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)'
                }}
              >
                GET STARTED
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </motion.div>
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
