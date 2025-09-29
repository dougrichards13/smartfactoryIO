import { Rocket, Shield, Zap, Database, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AIAcceleratorSection() {
  const keyFeatures = [
    {
      icon: Shield,
      title: "Fortress-Like Data Security",
      description: "Proprietary isolation technology creates a sovereign environment protecting your IP while enabling powerful AI capabilities"
    },
    {
      icon: Zap,
      title: "No Training Required",
      description: "Battle-tested frameworks enable rapid AI implementation and scaling without training your sensitive data"
    },
    {
      icon: Database,
      title: "Seamless Integration", 
      description: "Transform legacy systems into modern powerhouses with plug-and-play innovation that works with existing architecture"
    },
    {
      icon: Lock,
      title: "Quality Assurance by Design",
      description: "ISO standards and AI-enhanced testing methodologies ensure enterprise-grade reliability and compliance"
    }
  ];

  const acceleratorComponents = [
    "Affordable Advanced Computing Architecture",
    "Process Optimization On-Demand",
    "Strategic Technology Integration", 
    "Expandable Infrastructure Design",
    "Regulatory Framework Compliance",
    "Physical & Digital Security Safeguards"
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="ai-accelerator" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Hero Quote - Executive Focus */}
          <div className="max-w-5xl mx-auto mb-12">
            <motion.div 
              className="relative bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 rounded-3xl p-12 border-2 border-primary/20 backdrop-blur-sm"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              {/* Decorative quote marks */}
              <div className="absolute top-6 left-6 text-6xl text-primary/30 font-serif leading-none">"</div>
              <div className="absolute bottom-6 right-6 text-6xl text-primary/30 font-serif leading-none transform rotate-180">"</div>
              
              <blockquote className="text-center relative z-10">
                <p className="text-2xl lg:text-4xl xl:text-5xl text-white font-bold leading-tight mb-8">
                  AI is like a <span className="text-gradient">faster you</span>, not a <span className="text-gradient">smarter you</span>. 
                  If you can't do something yourself, you won't know if AI is doing it right.
                </p>
                <footer className="text-xl lg:text-2xl text-white/90 font-semibold">
                  <span className="block mb-2">— Doug Richards</span>
                  <span className="text-lg text-accent font-medium">Smart Factory Founder</span>
                </footer>
              </blockquote>
            </motion.div>
          </div>

          <h2 className="mb-6 text-3xl lg:text-5xl font-black leading-tight">
            Smart&nbsp;Factory&nbsp;AI&nbsp;Accelerator™
            <span className="block text-gradient text-2xl lg:text-3xl mt-2 font-semibold">Making AI Safe for Any Size Business</span>
          </h2>
          
          <p className="text-lg lg:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            Transform your business potential into measurable reality with our revolutionary AI transformation ecosystem, 
            built on this foundational principle of human-guided intelligence.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid xl:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Column - Platform Description & Features */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Platform Overview */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold">Purpose-Built Intelligence That Works</h3>
              <p className="text-white/80 leading-relaxed">
                Your employees are already using AI—unmanaged AI creates data loss and IP exposure risks. 
                Our proprietary ecosystem creates a sovereign environment combining expert consultants, proven methodologies, 
                and secure technology controlled by your authorized users, enabling you to have conversations with your data safely.
              </p>
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <p className="text-sm text-accent font-semibold mb-2">⚡ Limited Availability</p>
                <p className="text-sm text-white/90">
                  The AI Accelerator™ initiative is limited to just 6 clients in 2025. Currently 4 spots remain.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Core Ecosystem Components</h4>
              {keyFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex space-x-4 p-4 rounded-xl bg-card border border-border hover:shadow-md transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-1">{feature.title}</h5>
                      <p className="text-sm text-white/80">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Platform Components */}
            <div className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border border-border/50">
              <h4 className="text-lg font-semibold mb-4">Accelerator Ecosystem Components</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {acceleratorComponents.map((component, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-white/80">{component}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Visual & Demo CTA */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Platform Visualization */}
            <div className="relative">
              <div className="aspect-[4/3] relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&h=600&fit=crop&crop=center"
                  alt="AI Accelerator Platform Dashboard"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-accent/20"></div>
                
                {/* Floating Platform Features */}
                <motion.div 
                  className="absolute top-4 left-4 bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="text-xs font-semibold text-primary">Data Sovereignty</div>
                  <div className="text-lg font-bold text-accent">100%</div>
                </motion.div>
                
                <motion.div 
                  className="absolute top-4 right-4 bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                >
                  <div className="text-xs font-semibold text-primary">Ecosystem Deployment</div>
                  <div className="text-lg font-bold text-accent">90 Days</div>
                </motion.div>
                
                <motion.div 
                  className="absolute bottom-4 left-4 bg-white/95 dark:bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 2 }}
                >
                  <div className="text-xs font-semibold text-primary">Security</div>
                  <div className="text-lg font-bold text-accent">Bank-Grade</div>
                </motion.div>
              </div>
            </div>

            {/* Demo Request Card */}
            <Card className="border-2 border-accent/20 bg-accent/5">
              <CardContent className="p-8 text-center">
                <Rocket className="w-12 h-12 text-accent mx-auto mb-4" />
                <h4 className="text-xl font-semibold mb-3">Experience the AI Accelerator™ Ecosystem</h4>
                <p className="text-white/80 mb-6">
                  See how our AI transformation ecosystem can transform your enterprise 
                  with expert consultation and personalized solutions tailored to your industry and use cases.
                </p>
                <div className="space-y-4">
                  <Button 
                    size="lg" 
                    onClick={scrollToContact}
                    className="w-full gradient-accent text-accent-foreground hover:shadow-xl transition-all duration-300 group"
                  >
                    Request a Demo
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <p className="text-xs text-white/80">
                    Custom demo environments available for qualified enterprise prospects
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card border border-border rounded-xl">
                  <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                  <div className="text-xs text-white/80">Ecosystem Availability</div>
              </div>
              <div className="text-center p-4 bg-card border border-border rounded-xl">
                <div className="text-2xl font-bold text-secondary mb-1">SOC2</div>
                <div className="text-xs text-white/80">Compliance Ready</div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

