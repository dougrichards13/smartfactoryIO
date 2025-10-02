import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onOmnisToggle?: () => void;
}

export function Header({ onOmnisToggle }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);

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

  const openOmnis = () => {
    if (onOmnisToggle) {
      onOmnisToggle();
    } else {
      // Fallback to contact section if no handler provided
      scrollToContact();
    }
  };

  const handleNavClick = (item: any) => {
    if (item.isExternal) {
      window.open(item.url, '_blank', 'noopener,noreferrer');
    } else {
      scrollToSection(item.id);
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { 
      label: 'OVERVIEW',
      id: 'about',
      hasDropdown: true,
      submenu: [
        { label: 'About Smart Factory', id: 'about-company', description: 'Our company overview' },
        { label: 'Three Pillars', id: 'services', description: 'Smart Suite™ consulting teams' },
        { label: 'Leadership Team', id: 'team', description: 'Meet our experts' }
      ]
    },
    { label: 'AI ACCELERATOR', id: 'ai-accelerator' },
    { label: 'INSIGHTS', id: 'insights', isExternal: true, url: 'https://www.linkedin.com/company/smartfactoryio' },
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
                  { text: 'group-hover:text-primary', bg: 'from-primary/10 to-primary/20', underline: 'from-primary to-primary-light' }, // Overview - Electric Blue
                  { text: 'group-hover:text-accent', bg: 'from-accent/10 to-accent/20', underline: 'from-accent to-accent-light' }, // AI Accelerator - Accent
                  { text: 'group-hover:text-accent', bg: 'from-accent/10 to-accent/20', underline: 'from-accent to-accent-light' }, // Insights - Accent
                  { text: 'group-hover:text-primary', bg: 'from-primary/10 to-primary/20', underline: 'from-primary to-primary-light' }, // Team - Electric Blue
                ];
                return colors[itemIndex % colors.length];
              };
              
              const hoverColors = getHoverColors(index);
              
              if (item.hasDropdown) {
                return (
                  <div 
                    key={item.id}
                    className="relative group"
                    onMouseEnter={() => setAboutDropdownOpen(true)}
                    onMouseLeave={() => setAboutDropdownOpen(false)}
                  >
                    <motion.button
                      onClick={() => scrollToSection(item.id)}
                      className={`relative text-sm font-bold text-white/90 hover:text-white ${hoverColors.text} transition-all duration-300 uppercase tracking-[0.1em] py-2 px-3 group flex items-center space-x-1`}
                      whileHover={{ y: -2 }}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${aboutDropdownOpen ? 'rotate-180' : ''}`} />
                      <div className={`absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r ${hoverColors.underline} transition-all duration-500 group-hover:w-full rounded-full`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${hoverColors.bg} rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10`}></div>
                      <div className={`absolute inset-0 bg-gradient-to-r ${hoverColors.bg} rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10 blur-sm`}></div>
                    </motion.button>
                    
                    {/* Dropdown Menu */}
                    <AnimatePresence>
                      {aboutDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 w-80 mt-2 bg-background border-2 border-primary/30 rounded-xl shadow-2xl overflow-hidden"
                          style={{
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
                          }}
                        >
                          {item.submenu?.map((subItem, subIndex) => (
                            <motion.button
                              key={subItem.id}
                              onClick={() => scrollToSection(subItem.id)}
                              className="block w-full text-left px-6 py-4 text-white hover:text-white hover:bg-slate-800/90 transition-all duration-200 border-b border-border last:border-b-0"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: subIndex * 0.05 }}
                              whileHover={{ x: 4 }}
                            >
                              <div className="font-semibold text-sm uppercase tracking-wide">{subItem.label}</div>
                              <div className="text-xs text-white/70 mt-1">{subItem.description}</div>
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }
              
              return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item)}
                    className={`relative text-sm font-bold text-white/90 hover:text-white ${hoverColors.text} transition-all duration-300 uppercase tracking-[0.1em] py-2 px-3 group flex items-center space-x-1`}
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <span>{item.label}</span>
                    {item.isExternal && <ExternalLink className="h-3 w-3" />}
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
                onClick={openOmnis}
                className="relative bg-gradient-to-r from-secondary to-accent text-black font-bold px-8 py-3 rounded-xl uppercase tracking-[0.1em] text-sm shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/10"
                style={{
                  boxShadow: '0 4px 20px rgba(217, 128, 140, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                }}
              >
                OMNIS
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
                      { text: 'hover:text-primary', bg: 'hover:bg-primary/10' }, // Overview - Electric Blue
                      { text: 'hover:text-accent', bg: 'hover:bg-accent/10' }, // AI Accelerator - Accent
                      { text: 'hover:text-secondary', bg: 'hover:bg-secondary/10' }, // Method - Neon Green
                      { text: 'hover:text-accent', bg: 'hover:bg-accent/10' }, // Insights - Accent
                      { text: 'hover:text-primary', bg: 'hover:bg-primary/10' }, // Team - Electric Blue
                    ];
                    return colors[itemIndex % colors.length];
                  };
                  
                  const mobileHoverColors = getMobileHoverColors(index);
                  
                  if (item.hasDropdown) {
                    return (
                      <div key={item.id} className="space-y-2">
                        <motion.button
                          onClick={() => scrollToSection(item.id)}
                          className={`flex w-full items-center justify-between text-white/80 ${mobileHoverColors.text} ${mobileHoverColors.bg} transition-all duration-300 font-bold uppercase tracking-wider px-4 py-2 rounded-lg border border-transparent hover:border-white/10`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ x: 10 }}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className="h-4 w-4" />
                        </motion.button>
                        
                        {/* Mobile Submenu */}
                        <div className="ml-4 space-y-1">
                          {item.submenu?.map((subItem, subIndex) => (
                            <motion.button
                              key={subItem.id}
                              onClick={() => scrollToSection(subItem.id)}
                              className="block w-full text-left text-white/80 hover:text-white/95 hover:bg-slate-800/50 transition-all duration-200 font-medium text-sm px-3 py-2 rounded-md border border-transparent hover:border-slate-600/30"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: (index * 0.1) + (subIndex * 0.05) }}
                              whileHover={{ x: 6 }}
                            >
                              <div>{subItem.label}</div>
                              <div className="text-xs text-white/40 mt-0.5">{subItem.description}</div>
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <motion.button
                      key={item.id}
                      onClick={() => handleNavClick(item)}
                      className={`flex w-full items-center justify-between text-white/80 ${mobileHoverColors.text} ${mobileHoverColors.bg} transition-all duration-300 font-bold uppercase tracking-wider px-4 py-2 rounded-lg border border-transparent hover:border-white/10`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ x: 10 }}
                    >
                      <span>{item.label}</span>
                      {item.isExternal && <ExternalLink className="h-4 w-4" />}
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
                    onClick={openOmnis}
                    className="w-full gradient-accent text-accent-foreground font-bold py-3 hover:shadow-xl transition-all duration-300 border-2 border-accent/20 uppercase tracking-wider"
                  >
                    OMNIS
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
