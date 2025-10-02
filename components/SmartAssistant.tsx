import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, User, Bot, AlertCircle, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface SmartAssistantProps {
  isOpen: boolean;
  onToggle: () => void;
  apiEndpoint?: string; // Will connect to local Ollama API
}

export function SmartAssistant({ isOpen, onToggle, apiEndpoint = '/api/chat' }: SmartAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm Omnis, Smart Factory's AI assistant. With 15+ years of transformation experience and $6.3B+ in documented value growth across 62 enterprise clients, I can help you understand how Smart Factory consistently delivers results.

I know everything about our Smart Suite™ consulting teams, AI Synthesizer™ platform, and proven methodologies. I can also help qualify your transformation needs and connect you with our experts. What questions do you have about transforming your business?`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Smart Factory Knowledge Base for Conversion-Focused Responses
  const smartFactoryKnowledge = {
    methodology: {
      "act as if": `Our "Act as If" methodology sets us apart from traditional consultants. We don't just deliver reports—we become part of your team. We have titles, integrate into your org structure, and present ourselves internally and externally as stewards of your company's goals and strategies. This approach has delivered 300%+ ROI for our clients over 15+ years.`,
      success: `Smart Factory's success comes from our unique approach: we 'Act as If' we are employees of your company. Unlike other consultants who deliver recommendations and leave, we integrate as team members with titles and responsibilities. This systematic, assembly-line approach to consulting delivers predictable outcomes at enterprise scale.`,
      differentiation: `What makes us different? Three things: 1) Our former Fortune 500 executives understand your challenges because they've lived them. 2) Our 'Act as If' principle means we work as your colleagues, not outside vendors. 3) Our systematic processes deliver predictable results - we've revolutionized consulting the same way Henry Ford revolutionized manufacturing.`
    },
    services: {
      "smart suite": `Our Smart Suite™ offers three specialized consulting teams: Smart Suite™ Core (strategic leadership - part-time, full-time, or officer-level), AI Synthesizer™ (revolutionary teams combining human intelligence with AI Accelerator implementation), and Smart Assurance™ (AI-driven quality and testing with ISO standards). Each team works flexibly based on your needs.`,
      "ai accelerator": `Our AI Accelerator™ platform creates a sovereign environment for your data - no IP exposure risks. With proprietary isolation technology, you get powerful AI capabilities while maintaining complete data sovereignty. Typical deployment delivers measurable results through our proven methodologies.`,
      flexibility: `We offer unmatched flexibility: part-time strategic guidance, full-time team integration, or officer-level leadership. From AI Synthesizer™ innovation to Smart Assurance™ quality - we deliver exactly what you need, when you need it, at the scale that makes sense for your business.`
    },
    clients: {
      "healthcare": `Smart Factory has deep healthcare experience with clients including major health systems, children's hospitals, and healthcare networks. We specialize in regulatory compliance (HIPAA, PHI), digital transformation, and mission-critical system implementations that can't afford downtime.`,
      "financial services": `Our financial services portfolio includes major banks, credit unions, insurance companies, and cooperative finance organizations. We excel at risk management, SOC 2 compliance, and process excellence that meets strict regulatory requirements.`,
      "fintech": `We help FinTech companies scale rapidly while maintaining compliance and security. Our experience spans payment processing, digital banking platforms, and financial technology implementations requiring both innovation speed and regulatory adherence.`,
      "government": `Smart Factory has worked with government entities at federal, state, and international levels including federal reserve systems and foreign governments. We understand bureaucracy reform challenges and deliver efficiency gains within complex regulatory environments.`,
      "technology": `Our technology sector experience includes major telecommunications companies, software platforms, and digital transformation initiatives. We help tech companies maintain innovation speed while building enterprise-grade operational excellence.`,
      "agriculture": `In agriculture, we've helped implement supply chain optimization, operational excellence, and technology integration that modernizes traditional farming and agricultural business operations while respecting industry-specific requirements.`,
      "education": `Our education clients include major universities, community colleges, and specialized training institutions. We focus on digital learning transformation, operational efficiency, and student experience enhancement while working within academic institutional frameworks.`,
      "international": `Smart Factory has global reach with experience across multiple continents including work with international airlines, foreign governments, and multinational corporations. We understand cultural integration challenges and implement global standards across diverse business environments.`,
      "sports entertainment": `We've worked with major professional sports leagues and entertainment organizations, understanding the unique challenges of high-profile, performance-driven industries with complex stakeholder relationships and public visibility requirements.`
    },
    results: {
      roi: `Our clients typically see 300%+ ROI within 18 months. With an average project investment of $250K, we deliver measurable results that directly impact your bottom line. 98% client satisfaction rate and 15+ years of consistent delivery across industries.`,
      leadership: `Our leadership team brings $10B+ in managed revenue experience and 50+ years of combined C-suite expertise. Former Fortune 500 executives who speak CEO language because they've been CEOs. We understand your challenges because we've lived them.`,
      scale: `We work with companies of all sizes - from funded startups needing rapid scale to enterprise organizations. Our average project budget of $250K makes transformation accessible while our C-level expertise ensures enterprise-grade results.`,
      culture: `Our team combines Enterprise Leadership with Startup Agility. We bring the strategic insight and operational experience of Fortune 500 executives with the innovation and agility of a technology startup. This unique combination means we understand both enterprise challenges and startup speed - we've successfully navigated transformation from both perspectives.`,
      philosophy: `We Transform Enterprises, Not Just Technology. Smart Factory doesn't just implement solutions—we architect transformation. Since 2010, we've partnered with C-suite leaders to deliver measurable business outcomes that directly impact your bottom line, market position, and competitive advantage.`,
      framework: `Our systematic approach combines proven methodologies with cutting-edge technology (including AI) to create sustainable competitive advantages. We don't just change your technology—we transform your entire operational paradigm. When we leave, your company is smarter through our framework: Clarity, Communication, Control.`,
      foundation: `Founded in 2010, we've been disrupting traditional consulting since day one. We Work Smart with modern solutions, not outdated playbooks. We serve companies of All Sizes - from funded startups to Fortune 500 enterprises, delivering transformation that fits your scale and ambition.`
    },
    nextSteps: {
      assessment: `Start with our free Strategic Assessment - it takes 10 minutes and provides a personalized roadmap for your transformation. You'll get actionable recommendations and can schedule a strategic consultation directly from your results.`,
      contact: `Ready to transform your business? Three ways to connect: 1) Take our Strategic Assessment (10 minutes), 2) Schedule directly at our calendar link, or 3) Call 816-686-7092. Our team responds within 2 hours for qualified prospects.`,
      calendar: `Schedule your strategic consultation directly through our calendar system. We'll assess your readiness, understand your goals, and create a customized approach that delivers measurable ROI. Book now - transformation starts with a conversation.`
    }
  };

  // Intelligent Response Generator
  const generateSmartResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    // Success/Why questions
    if (input.includes('success') || input.includes('why') || input.includes('different') || input.includes('better')) {
      return `${smartFactoryKnowledge.results.philosophy}\n\n${smartFactoryKnowledge.methodology.success}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
    }
    
    // Philosophy/Transformation questions
    if (input.includes('philosophy') || input.includes('transform') || input.includes('architect') || input.includes('paradigm')) {
      return `${smartFactoryKnowledge.results.philosophy}\n\n${smartFactoryKnowledge.results.framework}\n\n${smartFactoryKnowledge.nextSteps.contact}`;
    }
    
    // Framework/Process questions
    if (input.includes('framework') || input.includes('clarity') || input.includes('communication') || input.includes('control') || input.includes('process')) {
      return `${smartFactoryKnowledge.results.framework}\n\n${smartFactoryKnowledge.results.foundation}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
    }
    
    // Methodology questions
    if (input.includes('method') || input.includes('approach') || input.includes('act as if') || input.includes('how do you work')) {
      return `${smartFactoryKnowledge.methodology["act as if"]}\n\n${smartFactoryKnowledge.methodology.differentiation}\n\n${smartFactoryKnowledge.nextSteps.contact}`;
    }
    
    // Services questions
    if (input.includes('service') || input.includes('smart suite') || input.includes('what do you do') || input.includes('offering')) {
      return `${smartFactoryKnowledge.services["smart suite"]}\n\n${smartFactoryKnowledge.services.flexibility}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
    }
    
    // AI Accelerator questions
    if (input.includes('ai accelerator') || input.includes('platform') || input.includes('technology') || input.includes('ai')) {
      return `${smartFactoryKnowledge.services["ai accelerator"]}\n\n${smartFactoryKnowledge.results.leadership}\n\n${smartFactoryKnowledge.nextSteps.calendar}`;
    }
    
    // ROI/Results questions
    if (input.includes('roi') || input.includes('results') || input.includes('return') || input.includes('value') || input.includes('cost')) {
      return `${smartFactoryKnowledge.results.roi}\n\n${smartFactoryKnowledge.results.scale}\n\nReady to see what Smart Factory can deliver for your business? ${smartFactoryKnowledge.nextSteps.assessment}`;
    }
    
    // Team/Leadership questions
    if (input.includes('team') || input.includes('leadership') || input.includes('experience') || input.includes('who')) {
      return `${smartFactoryKnowledge.results.culture}\n\n${smartFactoryKnowledge.results.leadership}\n\n${smartFactoryKnowledge.nextSteps.contact}`;
    }
    
    // Culture/Approach questions
    if (input.includes('culture') || input.includes('startup') || input.includes('agility') || input.includes('enterprise') || input.includes('combination')) {
      return `${smartFactoryKnowledge.results.culture}\n\n${smartFactoryKnowledge.methodology.differentiation}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
    }
    
    // Client/Industry experience questions
    if (input.includes('client') || input.includes('customer') || input.includes('industry') || input.includes('sector') || input.includes('experience')) {
      // Check for specific industries
      if (input.includes('healthcare') || input.includes('hospital') || input.includes('medical')) {
        return `${smartFactoryKnowledge.clients.healthcare}\n\n${smartFactoryKnowledge.results.leadership}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
      }
      if (input.includes('bank') || input.includes('financial') || input.includes('finance') || input.includes('insurance')) {
        return `${smartFactoryKnowledge.clients["financial services"]}\n\n${smartFactoryKnowledge.results.scale}\n\n${smartFactoryKnowledge.nextSteps.contact}`;
      }
      if (input.includes('fintech') || input.includes('payment') || input.includes('digital banking')) {
        return `${smartFactoryKnowledge.clients.fintech}\n\n${smartFactoryKnowledge.services.flexibility}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
      }
      if (input.includes('government') || input.includes('federal') || input.includes('public sector')) {
        return `${smartFactoryKnowledge.clients.government}\n\n${smartFactoryKnowledge.methodology.differentiation}\n\n${smartFactoryKnowledge.nextSteps.calendar}`;
      }
      if (input.includes('tech') || input.includes('software') || input.includes('telecom')) {
        return `${smartFactoryKnowledge.clients.technology}\n\n${smartFactoryKnowledge.services["ai accelerator"]}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
      }
      if (input.includes('agriculture') || input.includes('farming') || input.includes('supply chain')) {
        return `${smartFactoryKnowledge.clients.agriculture}\n\n${smartFactoryKnowledge.results.framework}\n\n${smartFactoryKnowledge.nextSteps.contact}`;
      }
      if (input.includes('education') || input.includes('university') || input.includes('college') || input.includes('school')) {
        return `${smartFactoryKnowledge.clients.education}\n\n${smartFactoryKnowledge.results.culture}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
      }
      if (input.includes('international') || input.includes('global') || input.includes('overseas')) {
        return `${smartFactoryKnowledge.clients.international}\n\n${smartFactoryKnowledge.results.leadership}\n\n${smartFactoryKnowledge.nextSteps.calendar}`;
      }
      if (input.includes('sports') || input.includes('entertainment') || input.includes('league')) {
        return `${smartFactoryKnowledge.clients["sports entertainment"]}\n\n${smartFactoryKnowledge.methodology.success}\n\n${smartFactoryKnowledge.nextSteps.contact}`;
      }
      // General client question
      return `Smart Factory has worked across 8+ major industry clusters including Healthcare, Financial Services, FinTech, Government, Technology, Agriculture, Education, International, and Sports & Entertainment.\n\n${smartFactoryKnowledge.results.culture}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
    }
    
    // Contact/Next steps questions
    if (input.includes('contact') || input.includes('start') || input.includes('begin') || input.includes('next') || input.includes('schedule')) {
      return `${smartFactoryKnowledge.nextSteps.contact}\n\nOur Strategic Assessment is the perfect starting point - it analyzes your organization's transformation readiness and provides a custom roadmap in just 10 minutes.`;
    }
    
    // Default comprehensive response
    return `${smartFactoryKnowledge.results.philosophy}\n\n${smartFactoryKnowledge.methodology["act as if"]}\n\n${smartFactoryKnowledge.nextSteps.assessment}`;
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Simulate processing time for realistic experience
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      // Generate intelligent Smart Factory response
      const responseContent = generateSmartResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (err) {
      console.error('AI Assistant Error:', err);
      setError('Sorry, I\'m having trouble responding right now. Please try again or contact us directly.');
      
      // Fallback response with updated contact info
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `I apologize for the technical difficulty. Let me connect you directly with our team:\n\n• Take our Strategic Assessment (10 minutes)\n• Call our direct line: 816-686-7092\n• Email: contact@smartfactory.io\n• Schedule directly through our calendar system\n\nOur Smart Suite™ team responds within 2 hours for qualified prospects.`,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="fixed bottom-6 right-6 w-96 h-[600px] bg-[#232632] border-2 border-primary/20 rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden"
        style={{
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 10px 20px rgba(62, 183, 255, 0.1)'
        }}
      >
        {/* Header */}
        <div className="p-6 border-b border-white/10 bg-gradient-to-r from-primary/10 to-secondary/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-2xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-white">Omnis</h3>
                <p className="text-xs text-white/70">Smart Factory AI Assistant</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onToggle}
              className="h-8 w-8 p-0 hover:bg-white/10"
            >
              <X className="w-4 h-4 text-white/80" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start space-x-2 max-w-[85%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-secondary/20' 
                    : 'bg-primary/20'
                }`}>
                  {message.role === 'user' ? (
                    <User className="w-4 h-4 text-secondary" />
                  ) : (
                    <Bot className="w-4 h-4 text-primary" />
                  )}
                </div>
                <div className={`p-3 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-secondary/10 text-white border border-secondary/20'
                    : 'bg-white/5 text-white/90 border border-white/10'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs text-white/50 mt-2">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 bg-primary/20 rounded-xl flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {error && (
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <AlertCircle className="w-4 h-4 text-red-400" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex space-x-2">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask Omnis about Smart Factory's transformation approach..."
              className="flex-1 p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50"
              rows={2}
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className="p-3 bg-gradient-to-r from-primary to-primary-light hover:shadow-lg transition-all duration-300 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Security Notice */}
          <div className="flex items-center justify-center space-x-2 mt-3 text-xs text-white/50">
            <Shield className="w-3 h-3" />
            <span>Secure • Private • Built by Smart Factory</span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}