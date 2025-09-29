import { MessageCircle, Calendar, Phone, Mail, CheckCircle, ArrowRight, Brain } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SmartAssistant } from './SmartAssistant';
import { BusinessReadinessAssessment } from './BusinessReadinessAssessment';
import { AIAdvisorVisual } from './AIAdvisorVisual';

export function ContactSection() {
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [assessmentOpen, setAssessmentOpen] = useState(false);

  const qualificationCriteria = [
    "C-Level or Senior Executive Role",
    "Organization with $500K+ Annual Innovation Budget", 
    "Enterprise or Upper Mid-Market Company",
    "Strategic AI or Digital Transformation Initiative",
    "Decision-Making Authority for Technology Investments"
  ];

  // Order adjusted so AI Assessment appears where Executive Contact used to be (last in the list)
  const contactMethods = [
    {
      icon: Calendar,
      title: "Direct Scheduling",
      description: "Book a strategic consultation directly with Smart Suite™ teams",
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
    },
    {
      icon: Brain,
      title: "AI Business Readiness Assessment",
      description: "Advanced diagnostic that analyzes your organization's transformation readiness and provides a custom roadmap",
      action: "Start Assessment",
      primary: true,
      onClick: () => setAssessmentOpen(true)
    }
  ];

  const openAssistant = () => {
    setAssistantOpen(true);
    console.log("Opening Smart Factory AI Assistant...");
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="mb-8 text-4xl lg:text-6xl font-black leading-tight">
            Ready to Start?
          </h2>
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
                <p className="text-white/80 mb-6 leading-relaxed">
                  Our Smart Assistant helps match you with the right consulting experts. We'll understand your business challenges, 
                  assess your needs, and connect you with the Smart Suite™ team that has the proven track record to deliver results in your industry.
                </p>
                <Button 
                  size="lg" 
                  onClick={openAssistant}
                  className="w-full gradient-primary text-white hover:shadow-xl transition-all duration-300 group mb-4"
                >
                  Start Smart Conversation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <p className="text-xs text-white/80">
                  Available 24/7 • Instant qualification • Direct scheduling
                </p>
              </CardContent>
            </Card>

            {/* Qualification Criteria */}
            <div className="p-6 bg-card border border-border rounded-xl">
              <h4 className="text-lg font-semibold mb-4">Ideal Client Profile</h4>
              <p className="text-sm text-white/80 mb-4">
                Smart Factory works exclusively with qualified enterprise prospects who meet these criteria:
              </p>
              <div className="space-y-3">
                {qualificationCriteria.map((criteria, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-white/80">{criteria}</span>
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
                  {method.title === 'AI Business Readiness Assessment' ? (
                    <div className="space-y-4">
                      {/* Visual above the AI assessment card */}
                      <AIAdvisorVisual />

                      <Card className={`hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 ${method.primary ? 'border-primary/20 bg-primary/5' : 'hover:border-primary/20'} ${method.onClick ? 'cursor-pointer' : ''}`}>
                        <CardContent className="p-6">
                          <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                                <IconComponent className="w-6 h-6 text-accent" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-2">{method.title}</h4>
                              <p className="text-sm text-white/80 mb-4">{method.description}</p>
                              <div className="flex flex-wrap gap-2 mb-4">
                                <Button 
                                  onClick={method.onClick}
                                  size="sm"
                                  className="gradient-primary text-white"
                                >
                                  {method.action}
                                </Button>
                                {/* Quick actions inside the assessment card */}
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => window.open('#schedule', '_self')}
                                >
                                  <Calendar className="w-4 h-4 mr-1" /> Calendar
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  asChild
                                >
                                  <a href="tel:+15551234567">
                                    <Phone className="w-4 h-4 mr-1" /> Hotline
                                  </a>
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  asChild
                                >
                                  <a href="mailto:leadership@smartfactory.io">
                                    <Mail className="w-4 h-4 mr-1" /> Email
                                  </a>
                                </Button>
                              </div>
                              <p className="text-xs text-white/60">Instant assessment • Personalized roadmap • Enterprise-grade</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <Card className={`hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 ${method.primary ? 'border-primary/20 bg-primary/5' : 'hover:border-primary/20'} ${method.onClick ? 'cursor-pointer' : ''}`}>
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                              <IconComponent className="w-6 h-6 text-accent" />
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">{method.title}</h4>
                            <p className="text-sm text-white/80 mb-4">{method.description}</p>
                            <Button 
                              variant={method.primary ? "default" : "outline"} 
                              size="sm"
                              className={method.primary ? "gradient-primary text-white" : ""}
                              onClick={method.onClick || (() => {})}
                            >
                              {method.action}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}
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
                description: "Connect with the right Smart Suite™ team for your industry"
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
                <p className="text-sm text-white/80">{feature.description}</p>
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
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            We understand that C-level time is valuable. Our commitment to qualified prospects includes 
            guaranteed response times and priority access to our leadership team.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-accent mb-1">&lt; 2 Hours</div>
              <div className="text-sm text-white/80">Qualified Lead Response</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-white/80">AI Assistant Availability</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-2xl font-bold text-secondary mb-1">Same Day</div>
              <div className="text-sm text-white/80">C-Suite Emergency Line</div>
            </div>
          </div>
        </motion.div>

        {/* Smart Factory AI Assistant */}
        <SmartAssistant 
          isOpen={assistantOpen} 
          onToggle={() => setAssistantOpen(!assistantOpen)}
          apiEndpoint="http://localhost:3001/api/chat"
        />

        {/* Business Readiness Assessment */}
        <BusinessReadinessAssessment 
          isOpen={assessmentOpen}
          onClose={() => setAssessmentOpen(false)}
        />
      </div>
    </section>
  );
}

