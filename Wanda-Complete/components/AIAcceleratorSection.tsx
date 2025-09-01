import { Rocket, Shield, Zap, Database, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function AIAcceleratorSection() {
  const keyFeatures = [
    {
      icon: Shield,
      title: "Data Sovereignty",
      description: "Complete control over your data with on-premise or private cloud deployment options"
    },
    {
      icon: Zap,
      title: "Agentic AI",
      description: "Advanced AI agents that learn, adapt, and execute complex business processes autonomously"
    },
    {
      icon: Database,
      title: "Seamless Integration", 
      description: "Plug-and-play architecture that integrates with existing enterprise systems"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "Bank-grade security with compliance for SOC2, HIPAA, and international standards"
    }
  ];

  const acceleratorComponents = [
    "AI Strategy Assessment Engine",
    "Pre-Built Industry AI Models",
    "Enterprise Integration Framework", 
    "Compliance & Governance Dashboard",
    "Real-Time Performance Analytics",
    "24/7 AI Operations Center"
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
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-accent/10 border-accent/20 text-accent-foreground">
            Flagship AI Platform
          </Badge>
          <h2 className="mb-6">
            Smart Factory AI Accelerator™
            <span className="text-gradient block">Secure, Private, Enterprise-Grade</span>
          </h2>
          <p className="lead text-muted-foreground">
            The industry's most comprehensive AI platform designed for rapid, risk-managed AI implementation 
            with complete data sovereignty and seamless enterprise integration.
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
              <h3 className="text-2xl font-semibold">Enterprise AI Without Compromise</h3>
              <p className="text-muted-foreground leading-relaxed">
                The Smart Factory AI Accelerator™ is a secure, private, enterprise-grade AI platform 
                that enables rapid AI implementation while maintaining complete control over your data, 
                ensuring compliance, and delivering measurable business outcomes.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold">Core Platform Features</h4>
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
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
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
                    <span className="text-sm text-muted-foreground">{component}</span>
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
                  <div className="text-xs font-semibold text-primary">Implementation</div>
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
                <h4 className="text-xl font-semibold mb-3">Experience the AI Accelerator™</h4>
                <p className="text-muted-foreground mb-6">
                  See how the Smart Factory AI Accelerator™ can transform your enterprise 
                  with a personalized demo tailored to your industry and use cases.
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
                  <p className="text-xs text-muted-foreground">
                    Custom demo environments available for qualified enterprise prospects
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card border border-border rounded-xl">
                <div className="text-2xl font-bold text-primary mb-1">99.9%</div>
                <div className="text-xs text-muted-foreground">Platform Uptime</div>
              </div>
              <div className="text-center p-4 bg-card border border-border rounded-xl">
                <div className="text-2xl font-bold text-secondary mb-1">SOC2</div>
                <div className="text-xs text-muted-foreground">Compliance Ready</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">Ready to Accelerate Your AI Journey?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join leading enterprises who have transformed their operations with the Smart Factory AI Accelerator™. 
            Schedule a personalized demonstration and strategy session.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToContact}
              className="gradient-primary text-white px-8 py-4 hover:shadow-xl transition-all duration-300"
            >
              Schedule AI Accelerator Demo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="px-8 py-4 border-2"
            >
              Download Platform Overview
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}