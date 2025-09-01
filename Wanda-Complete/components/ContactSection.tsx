import { MessageCircle, Calendar, Phone, Mail, CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { useState } from 'react';

export function ContactSection() {
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const qualificationCriteria = [
    "C-Level or Senior Executive Role",
    "Organization with $500K+ Annual Innovation Budget", 
    "Enterprise or Upper Mid-Market Company",
    "Strategic AI or Digital Transformation Initiative",
    "Decision-Making Authority for Technology Investments"
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "AI-Powered Qualification",
      description: "Chat with our Smart Assistant to qualify your needs and schedule a consultation",
      action: "Start Conversation",
      primary: true
    },
    {
      icon: Calendar,
      title: "Direct Scheduling",
      description: "Book a strategic consultation directly with a Smart Architect™",
      action: "View Calendar",
      primary: false
    },
    {
      icon: Phone,
      title: "Priority Hotline",
      description: "For urgent C-suite inquiries requiring immediate attention",
      action: "Call Now: +1 (555) 123-4567",
      primary: false
    },
    {
      icon: Mail,
      title: "Executive Contact",
      description: "Direct email access to our leadership team for strategic partnerships",
      action: "leadership@smartfactory.io",
      primary: false
    }
  ];

  const openChatbot = () => {
    setChatbotOpen(true);
    // In a real implementation, this would initialize the chatbot
    console.log("Opening Smart Factory AI Chatbot...");
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
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
            Let's Talk
          </Badge>
          <h2 className="mb-6">
            Talk to a Smart Architect™
            <span className="text-gradient block">Strategic Consultation Awaits</span>
          </h2>
          <p className="lead text-muted-foreground">
            Ready to transform your enterprise with AI? Our Smart Assistant will qualify your needs 
            and connect you with the right Smart Architect™ for a strategic consultation tailored 
            to your organization's goals and budget.
          </p>
        </motion.div>

        {/* Main Contact Grid */}
        <div className="grid xl:grid-cols-2 gap-16 items-start mb-20">
          {/* Left Column - Chatbot & Primary CTA */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Primary Chatbot CTA */}
            <Card className="border-2 border-primary/20 bg-primary/5">
              <CardContent className="p-8 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Smart Factory AI Assistant</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Our AI-powered assistant will qualify your needs, understand your organization's 
                  requirements, and connect you with the perfect Smart Architect™ for your transformation journey.
                </p>
                <Button 
                  size="lg" 
                  onClick={openChatbot}
                  className="w-full gradient-primary text-white hover:shadow-xl transition-all duration-300 group mb-4"
                >
                  Start Smart Conversation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs text-muted-foreground">
                  Available 24/7 • Instant qualification • Direct scheduling
                </p>
              </CardContent>
            </Card>

            {/* Qualification Criteria */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <h4 className="text-lg font-semibold mb-4">Ideal Client Profile</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Smart Factory works exclusively with qualified enterprise prospects who meet these criteria:
              </p>
              <div className="space-y-3">
                {qualificationCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Alternative Contact Methods */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-6">Alternative Contact Methods</h3>
            {contactMethods.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 ${method.primary ? 'border-primary/20 bg-primary/5' : 'hover:border-primary/20'}`}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-accent" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{method.title}</h4>
                          <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                          <Button 
                            variant={method.primary ? "default" : "outline"} 
                            size="sm"
                            className={method.primary ? "gradient-primary text-white" : ""}
                          >
                            {method.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Chatbot Features */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-12">Smart Assistant Capabilities</h3>
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                title: "Lead Qualification",
                description: "Intelligent questioning to assess fit and budget"
              },
              {
                title: "Needs Assessment", 
                description: "Understand your specific AI and transformation goals"
              },
              {
                title: "Team Matching",
                description: "Connect with the right Smart Architect™ for your industry"
              },
              {
                title: "Calendar Integration",
                description: "Schedule consultations directly through the chat interface"
              }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-card border border-border rounded-xl">
                <div className="w-12 h-12 mx-auto mb-4 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Response Time Guarantee */}
        <motion.div
          className="text-center bg-gradient-to-br from-accent/5 to-primary/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">Enterprise-Grade Responsiveness</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            We understand that C-level time is valuable. Our commitment to qualified prospects includes 
            guaranteed response times and priority access to our leadership team.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-accent mb-1">&lt; 2 Hours</div>
              <div className="text-sm text-muted-foreground">Qualified Lead Response</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">AI Assistant Availability</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-secondary mb-1">Same Day</div>
              <div className="text-sm text-muted-foreground">C-Suite Emergency Line</div>
            </div>
          </div>
        </motion.div>

        {/* Chatbot Placeholder */}
        {chatbotOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed bottom-6 right-6 w-96 h-96 bg-card border-2 border-primary/20 rounded-xl shadow-2xl z-50"
          >
            <div className="p-4 border-b border-border bg-primary/5 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-semibold">Smart Factory Assistant</span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setChatbotOpen(false)}
                  className="h-6 w-6 p-0"
                >
                  ×
                </Button>
              </div>
            </div>
            <div className="p-4 h-full flex items-center justify-center text-center">
              <div>
                <p className="text-muted-foreground mb-4">
                  Smart Factory AI Assistant would be integrated here using a chatbot service like Elfsight or similar.
                </p>
                <p className="text-sm text-muted-foreground">
                  The chatbot would qualify leads, collect contact info, and schedule consultations.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}