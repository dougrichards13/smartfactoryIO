import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function HeroSection() {
  const trustIndicators = [
    "$5B+ Project Impact",
    "13+ Years Enterprise Focus",
    "C-Level Expertise"
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative bg-primary text-primary-foreground pt-20 pb-16 lg:pt-24 lg:pb-20 overflow-hidden">
      {/* Aggressive Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary-dark"></div>
      <div className="absolute top-1/4 right-1/6 w-80 h-80 bg-secondary/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/6 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Content - 7 columns */}
          <motion.div 
            className="lg:col-span-7 space-y-6 lg:space-y-8"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Badge className="px-4 py-2 bg-secondary/20 border-secondary text-secondary-foreground backdrop-blur-sm">
                SMART FACTORY • SINCE 2011
              </Badge>
            </motion.div>

            {/* Headlines */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className="text-white leading-tight">
                TRANSFORMING HUMAN POTENTIAL INTO
                <span className="block text-gradient-simple">BUSINESS REALITY</span>
              </h1>
              <h2 className="text-xl lg:text-2xl text-secondary font-bold leading-tight">
                VISIONARY CONSULTING FOR VISIONARY LEADERS
              </h2>
              <p className="text-lg text-white/80 leading-relaxed max-w-2xl font-medium">
                Partner with the premier AI consulting firm that transforms enterprise potential 
                into measurable business outcomes. Trusted by C-suite executives for strategic 
                technology leadership and transformational AI implementation.
              </p>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap gap-4 lg:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm lg:text-base text-white/90">
                  <CheckCircle className="h-4 w-4 lg:h-5 lg:w-5 text-secondary flex-shrink-0" />
                  <span className="font-semibold">{indicator}</span>
                </div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 lg:gap-4 pt-2"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="gradient-secondary text-secondary-foreground px-6 py-3 lg:px-8 lg:py-4 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 group border-2 border-secondary hover-lift"
              >
                TALK TO A SMART ARCHITECT™
                <ArrowRight className="ml-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-6 py-3 lg:px-8 lg:py-4 border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group hover-lift"
              >
                <Play className="mr-2 h-4 w-4 lg:h-5 lg:w-5 group-hover:scale-110 transition-transform" />
                VIEW OUR IMPACT
              </Button>
            </motion.div>

            {/* Enterprise Focus Note */}
            <motion.p 
              className="text-sm lg:text-base text-white/70 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <strong className="text-accent">ENTERPRISE FOCUS:</strong> Serving organizations with $500K+ innovation budgets since 2011
            </motion.p>
          </motion.div>

          {/* Visual - 5 columns */}
          <motion.div 
            className="lg:col-span-5 relative mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative bg-gradient-to-br from-white/10 to-secondary/10 rounded-lg p-6 lg:p-8 backdrop-blur-sm border border-white/20 hover-lift glow-secondary">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg bg-gradient-to-br from-secondary/20 to-accent/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&crop=center"
                  alt="AI Technology and Data Visualization"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
                
                {/* Floating Metrics */}
                <motion.div 
                  className="absolute top-3 right-3 lg:top-4 lg:right-4 bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg p-2.5 lg:p-3 shadow-aggressive border border-secondary/20"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="text-xs lg:text-sm font-bold text-primary uppercase tracking-wider">PROJECT IMPACT</div>
                  <div className="text-lg lg:text-2xl font-black text-secondary">$5B+</div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-3 left-3 lg:bottom-4 lg:left-4 bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg p-2.5 lg:p-3 shadow-aggressive border border-accent/20"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                >
                  <div className="text-xs lg:text-sm font-bold text-primary uppercase tracking-wider">YEARS OF EXCELLENCE</div>
                  <div className="text-lg lg:text-2xl font-black text-accent">13+</div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}