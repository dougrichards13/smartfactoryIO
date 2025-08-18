import { TrendingUp, DollarSign, Globe, Calendar, Quote, Star } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function ResultsSection() {
  const impactMetrics = [
    {
      icon: DollarSign,
      value: "$5B+",
      label: "Project Impact",
      description: "Total value delivered across all client engagements"
    },
    {
      icon: TrendingUp,
      value: "$2B+",
      label: "M&A Value",
      description: "Merger & acquisition value facilitated through our strategic guidance"
    },
    {
      icon: Calendar,
      value: "13+",
      label: "Years Excellence",
      description: "Continuous innovation and client success since 2011"
    },
    {
      icon: Globe,
      value: "Global",
      label: "Reach",
      description: "Serving enterprise clients across North America, Europe, and Asia-Pacific"
    }
  ];

  const testimonials = [
    {
      quote: "Smart Factory's AI Accelerator transformed our entire operations in just 90 days. The ROI exceeded our most optimistic projections, and their team became true strategic partners.",
      author: "Sarah Chen",
      title: "Chief Technology Officer",
      company: "Fortune 500 Manufacturing",
      rating: 5,
      impact: "$50M cost savings in first year"
    },
    {
      quote: "The Smart Architects didn't just consult - they embedded with our leadership team and drove transformation from within. Their 'Act as If' principle is the real differentiator.",
      author: "Michael Rodriguez",
      title: "Chief Executive Officer", 
      company: "Mid-Market Technology",
      rating: 5,
      impact: "40% faster time-to-market"
    },
    {
      quote: "Working with Smart Factory's Engineers was like adding a world-class internal team overnight. Their AI-driven approach accelerated our digital transformation by years.",
      author: "Dr. Amanda Foster",
      title: "Chief Innovation Officer",
      company: "Healthcare Enterprise",
      rating: 5,
      impact: "300% improvement in patient outcomes"
    }
  ];

  return (
    <section id="results" className="section-padding">
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
            Proven Results & Impact
          </Badge>
          <h2 className="mb-6">
            Measurable Transformation
            <span className="text-gradient block">Real Results, Real Impact</span>
          </h2>
          <p className="lead text-muted-foreground">
            Since 2011, Smart Factory has delivered transformational results for enterprise clients worldwide. 
            Our data-driven approach ensures every engagement produces measurable business outcomes and sustained competitive advantage.
          </p>
        </motion.div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 mb-20">
          {impactMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 group">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-8 h-8 text-primary" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{metric.value}</div>
                    <div className="font-semibold text-foreground mb-2">{metric.label}</div>
                    <p className="text-sm text-muted-foreground">{metric.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Data Visualization Placeholder */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-border/50">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Impact Across Industries</h3>
                <p className="text-muted-foreground mb-6">
                  Our transformational impact spans across multiple industries, with consistently 
                  high ROI and client satisfaction rates that demonstrate the effectiveness of 
                  the Smart Factory Method™.
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Manufacturing & Industrial</span>
                    <span className="text-sm text-accent font-semibold">$2.1B impact</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Healthcare & Life Sciences</span>
                    <span className="text-sm text-accent font-semibold">$1.8B impact</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Financial Services</span>
                    <span className="text-sm text-accent font-semibold">$900M impact</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Technology & Software</span>
                    <span className="text-sm text-accent font-semibold">$200M impact</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/3] relative overflow-hidden rounded-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=450&fit=crop&crop=center"
                    alt="Business Impact Data Visualization"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Client Testimonials */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-12">What Enterprise Leaders Say</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-2 hover:border-accent/20">
                  <CardContent className="p-8">
                    {/* Rating */}
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    
                    {/* Quote */}
                    <Quote className="w-8 h-8 text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-6 leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                    
                    {/* Impact */}
                    <div className="bg-accent/10 rounded-lg p-3 mb-6">
                      <div className="text-sm font-semibold text-accent">Key Impact:</div>
                      <div className="text-sm text-accent-foreground">{testimonial.impact}</div>
                    </div>
                    
                    {/* Author */}
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Success Story Highlight */}
        <motion.div
          className="text-center bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">Ready to Join Our Success Stories?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Every enterprise transformation begins with a conversation. Discover how Smart Factory 
            can deliver measurable results for your organization with our proven methodology and 
            world-class expertise.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-primary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Client Satisfaction</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-secondary mb-1">340%</div>
              <div className="text-sm text-muted-foreground">Average ROI</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-accent mb-1">90 Days</div>
              <div className="text-sm text-muted-foreground">Avg. Implementation</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}