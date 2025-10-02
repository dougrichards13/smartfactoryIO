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
    "Organization with average $250K Annual Innovation Budget", 
    "Enterprise or Upper Mid-Market Company",
    "Strategic AI or Digital Transformation Initiative",
    "Decision-Making Authority for Technology Investments",
    "Or, early stage funded startup needing rapid scale"
  ];

  // Only AI Assessment card - other contact methods are now integrated as quick actions
  const contactMethods = [
    {
      icon: Brain,
      title: "Strategic Assessment",
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
            LET'S TRANSFORM
            <span className="block text-gradient mt-2">YOUR BUSINESS TOGETHER</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto">
            Connect with our <span className="text-accent font-bold">Smart Suite™ experts</span> through our intelligent 
            qualification system or direct <span className="text-secondary font-bold">executive access</span> for enterprise transformation.
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

          {/* Right Column - AI Business Assessment */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4">
                {/* Visual above the AI assessment card */}
                <AIAdvisorVisual />

                <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                          <Brain className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">Strategic Assessment</h4>
                        <p className="text-sm text-white/80 mb-4">Advanced diagnostic that analyzes your organization's transformation readiness and provides a custom roadmap</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Button 
                            onClick={() => setAssessmentOpen(true)}
                            size="sm"
                            className="gradient-primary text-white"
                          >
                            Start Assessment
                          </Button>
                          {/* Quick actions inside the assessment card */}
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <a href="https://outlook.office365.com/owa/calendar/SmartFactoryBusinessReadinessAssessment@smartfactory.io/bookings/" target="_blank" rel="noopener noreferrer">
                              <Calendar className="w-4 h-4 mr-1" /> Calendar
                            </a>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <a href="tel:+18166867092">
                              <Phone className="w-4 h-4 mr-1" /> Hotline
                            </a>
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            asChild
                          >
                            <a href="mailto:contact@smartfactory.io">
                              <Mail className="w-4 h-4 mr-1" /> Email
                            </a>
                          </Button>
                        </div>
                        <p className="text-xs text-white/60">Secure • Private • Built by Smart Factory</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        </div>


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

