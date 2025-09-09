import { ArrowRight, Play, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export function HeroSection() {
  const trustIndicators = [
    "$5B+ Project Impact",
    "15+ Years Enterprise Focus",
    "C-Level Expertise"
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToResults = () => {
    // Try to scroll to results section first, fallback to team if results doesn't exist
    const resultsSection = document.getElementById('results') || document.getElementById('team');
    resultsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/videos/hero-video.mov" type="video/mp4" />
        </video>
        {/* Video Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Floating Content Card */}
      <div className="container-custom relative z-10">
        <motion.div 
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Floating Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 lg:p-12 border border-white/20 shadow-2xl">
            {/* Main Headline */}
            <motion.h1 
              className="text-3xl lg:text-5xl font-bold text-white text-center mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              VISIONARY CONSULTING FOR
              <span className="block text-gradient-simple">VISIONARY LEADERS</span>
            </motion.h1>

            {/* Body Text */}
            <motion.p 
              className="text-lg lg:text-xl text-white/90 text-center leading-relaxed mb-8 font-medium"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Smart Factory delivers visionary consulting for those who shape industries. 
              Proven across sectors, our experts unlock millions to billions in growth through 
              precision strategy, scalable solutions, and transformational leadership.
              <br /><br />
              <span className="text-primary font-bold">Technology is our language; transformation is our product.</span>
            </motion.p>

            {/* Trust Indicators */}
            <motion.div 
              className="flex flex-wrap justify-center gap-6 lg:gap-8 mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2 text-white/95">
                  <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0" />
                  <span className="font-semibold text-sm lg:text-base">{indicator}</span>
                </div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div 
              className="flex justify-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="gradient-secondary text-secondary-foreground px-10 py-4 text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 group border-2 border-secondary/50"
              >
                GET YOUR STRATEGIC ASSESSMENT
                <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
