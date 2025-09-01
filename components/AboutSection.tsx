import { Building2, TrendingUp, Award, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AboutSection() {
  const credentials = [
    {
      icon: Building2,
      title: "Founded 2011",
      description: "Over a decade of enterprise consulting excellence"
    },
    {
      icon: TrendingUp,
      title: "$5B+ Project Impact",
      description: "Measurable business transformation across industries"
    },
    {
      icon: Award,
      title: "Enterprise Focus",
      description: "Dedicated to Fortune 500 and emerging enterprise leaders"
    },
    {
      icon: Users,
      title: "C-Level Expertise", 
      description: "Team of former executives and technology leaders"
    }
  ];

  const clientLogos = [
    "Fortune 500 Companies",
    "Global Technology Leaders", 
    "Enterprise Innovators",
    "Industry Disruptors"
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Enhanced background with geometric patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-secondary/20 to-accent/20 border border-secondary/30 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-secondary rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">About Smart Factory</span>
          </motion.div>
          
          <h2 className="mb-8 text-4xl lg:text-6xl font-black leading-tight">
            THE FACTORY APPROACH TO
            <span className="block text-gradient mt-2">ENTERPRISE TRANSFORMATION</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto">
            Since <span className="text-secondary font-bold">2010</span>, Smart Factory has pioneered a unique approach to enterprise consulting, 
            combining <span className="text-accent font-bold">C-level strategic expertise</span> with AI-driven implementation methodologies. 
            Our factory approach delivers <span className="text-secondary font-bold">predictable, scalable results</span> for visionary leaders.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid xl:grid-cols-2 gap-16 items-center mb-20">
          {/* Left Column - Vision & Differentiation */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Our Vision & Differentiation</h3>
              <div className="space-y-4">
                <motion.div 
                  className="relative p-6 bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/30 rounded-2xl backdrop-blur-sm group hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{
                    boxShadow: '0 8px 32px rgba(17, 100, 102, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="absolute top-4 right-4 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-primary" />
                  </div>
                  <h4 className="font-bold mb-3 text-lg text-white uppercase tracking-wider">
                    The Factory Approach
                  </h4>
                  <p className="text-white/85 leading-relaxed">
                    Like a modern manufacturing facility, we apply systematic, repeatable processes 
                    to transform human potential into business reality with precision and scale.
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </motion.div>
                
                <motion.div 
                  className="relative p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border border-secondary/30 rounded-2xl backdrop-blur-sm group hover:border-secondary/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{
                    boxShadow: '0 8px 32px rgba(217, 128, 140, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="absolute top-4 right-4 w-8 h-8 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-secondary" />
                  </div>
                  <h4 className="font-bold mb-3 text-lg text-white uppercase tracking-wider">
                    C-Level Expertise
                  </h4>
                  <p className="text-white/85 leading-relaxed">
                    Our team consists of former C-suite executives who understand the strategic 
                    challenges and opportunities facing enterprise leaders today.
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </motion.div>
                
                <motion.div 
                  className="relative p-6 bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/30 rounded-2xl backdrop-blur-sm group hover:border-accent/50 transition-all duration-300"
                  whileHover={{ scale: 1.02, y: -5 }}
                  style={{
                    boxShadow: '0 8px 32px rgba(255, 203, 154, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div className="absolute top-4 right-4 w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                  <h4 className="font-bold mb-3 text-lg text-white uppercase tracking-wider">
                    AI Leadership
                  </h4>
                  <p className="text-white/85 leading-relaxed">
                    We don't just implement AI - we lead the industry in AI-driven consulting 
                    methodologies that accelerate transformation and guarantee results.
                  </p>
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8 backdrop-blur-sm border border-border/50">
              <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&crop=center"
                  alt="Modern Business Architecture"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-secondary/20"></div>
                
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="text-sm font-semibold text-primary mb-1">Enterprise Excellence</div>
                    <div className="text-xs text-white/70">
                      Trusted by industry leaders worldwide for strategic transformation initiatives
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Credentials Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {credentials.map((credential, index) => {
            const IconComponent = credential.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="relative h-full text-center group overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/10 hover:border-secondary/30 backdrop-blur-sm transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8 relative z-10">
                    <div className="relative mx-auto mb-6">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                        <IconComponent className="w-10 h-10 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h4 className="font-bold mb-3 text-lg text-white uppercase tracking-wider">{credential.title}</h4>
                    <p className="text-white/80 leading-relaxed">{credential.description}</p>
                  </CardContent>
                  
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Geometric accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-secondary rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Client Trust Section */}
        <motion.div
          className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-6">Trusted by Industry Leaders</h3>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our clients represent the most innovative and forward-thinking organizations across industries, 
            all committed to transforming their businesses through strategic AI implementation.
          </p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {clientLogos.map((client, index) => (
              <div 
                key={index}
                className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30"
              >
                <div className="text-sm font-medium text-white/70">{client}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/60 mt-6">
            Client names and specific case studies available under NDA upon qualification.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
