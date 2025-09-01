import { Building2, TrendingUp, Award, Users } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
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
    <section id="about" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-primary/10 border-primary/20 text-primary">
            About Smart Factory
          </Badge>
          <h2 className="mb-6">
            The Factory Approach to
            <span className="text-gradient block">Enterprise Transformation</span>
          </h2>
          <p className="lead text-muted-foreground">
            Since 2011, Smart Factory has pioneered a unique approach to enterprise consulting, 
            combining C-level strategic expertise with AI-driven implementation methodologies. 
            Our factory approach delivers predictable, scalable results for visionary leaders.
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
                <div className="p-4 bg-card border border-border rounded-xl">
                  <h4 className="font-semibold mb-2 text-primary flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    The Factory Approach
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Like a modern manufacturing facility, we apply systematic, repeatable processes 
                    to transform human potential into business reality with precision and scale.
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-xl">
                  <h4 className="font-semibold mb-2 text-secondary flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    C-Level Expertise
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our team consists of former C-suite executives who understand the strategic 
                    challenges and opportunities facing enterprise leaders today.
                  </p>
                </div>
                <div className="p-4 bg-card border border-border rounded-xl">
                  <h4 className="font-semibold mb-2 text-accent flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    AI Leadership
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We don't just implement AI - we lead the industry in AI-driven consulting 
                    methodologies that accelerate transformation and guarantee results.
                  </p>
                </div>
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
                    <div className="text-xs text-muted-foreground">
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
                <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">{credential.title}</h4>
                    <p className="text-sm text-muted-foreground">{credential.description}</p>
                  </CardContent>
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
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our clients represent the most innovative and forward-thinking organizations across industries, 
            all committed to transforming their businesses through strategic AI implementation.
          </p>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
            {clientLogos.map((client, index) => (
              <div 
                key={index}
                className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30"
              >
                <div className="text-sm font-medium text-muted-foreground">{client}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-6">
            Client names and specific case studies available under NDA upon qualification.
          </p>
        </motion.div>
      </div>
    </section>
  );
}