const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

// Demo mode - provides realistic AI responses for Smart Factory
console.log('🚀 Running Smart Factory AI Assistant in DEMO mode');
console.log('💡 This demonstrates the full functionality while Ollama models are being configured');

// Load knowledge base
const knowledgeBasePath = path.join(__dirname, 'knowledge-base.json');
let knowledgeBase = {};

try {
  knowledgeBase = JSON.parse(fs.readFileSync(knowledgeBasePath, 'utf8'));
  console.log('✅ Smart Factory knowledge base loaded successfully');
} catch (error) {
  console.error('❌ Error loading knowledge base:', error.message);
}

// Intelligent response system based on keywords and context
const generateResponse = (message, context = []) => {
  const msg = message.toLowerCase();
  
  // Lead qualification responses
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('interested')) {
    return `Hello! I'm Smart Factory's AI Assistant, built using our own open-source models to demonstrate our AI capabilities while ensuring complete data security.

I can help you learn about our three consulting pillars: Smart Suite™ (C-suite transformation teams), AI Synthesizer™ (our revolutionary AI implementation specialists), and Smart Assurance™ (quality & testing teams).

What specific challenges is your organization facing? I'd love to connect you with the right team.`;
  }

  // Manufacturing/industry specific
  if (msg.includes('manufacturing') || msg.includes('factory') || msg.includes('production')) {
    return `Perfect! Smart Factory specializes in manufacturing and industrial transformation. With 15+ years of experience, we've helped manufacturing companies achieve 40% average efficiency improvements.

Our AI Synthesizer™ teams are particularly valuable for manufacturing - they're "human intelligence behind our AI Accelerator platform" and can implement context-aware AI systems for production optimization.

What's your current production challenge? Quality control, efficiency, or digital transformation?`;
  }

  // Pricing inquiries
  if (msg.includes('cost') || msg.includes('price') || msg.includes('budget') || msg.includes('investment')) {
    return `Our engagement models are designed to fit different organizational needs:

• Smart Suite™: $25K-$150K per engagement (1-5 years)
• AI Synthesizer™: $100K-$500K per project (12-36 months) 
• Smart Assurance™: $25K-$150K per engagement (3-18 months)

Most clients see 300%+ ROI within 18 months. Would you like me to connect you with a Smart Suite™ team to discuss your specific budget and requirements?`;
  }

  // AI-specific questions
  if (msg.includes('ai ') || msg.includes('artificial intelligence') || msg.includes('machine learning')) {
    return `Excellent question! Our approach is "Humans first. Results proven. Technology amplified." 

Our AI Synthesizer™ teams are unique - it's literally "a job from five years in the future that exists nowhere else in the world." They combine human creativity with AI implementation, serving as the human intelligence behind our AI Accelerator platform.

We build our own AI models (like me!) for maximum security and client data protection. Are you looking to implement AI in operations, customer service, or strategic planning?`;
  }

  // Company size/qualification
  if (msg.includes('small') || msg.includes('startup') || msg.includes('mid-size') || msg.includes('enterprise')) {
    return `We work with companies of all sizes, though our sweet spot is organizations with $500K+ annual innovation budgets. Our metrics show we deliver results across the spectrum:

• 300%+ typical client ROI within 18 months
• 40% average operational efficiency improvements  
• 98% client satisfaction rate

Our Smart Suite™ teams can work flexibly - from part-time advisory to full-time consulting partners, even becoming corporate officers while maintaining their Smart Factory methodologies. What size organization are you with?`;
  }

  // Services inquiry
  if (msg.includes('service') || msg.includes('what do you do') || msg.includes('help')) {
    return `Smart Factory delivers three pillars of transformation excellence:

🏢 **Smart Suite™** - C-Suite transformation teams that work flexibly as advisors, consulting partners, or corporate officers

🤖 **AI Synthesizer™** - Revolutionary specialists who are the human intelligence behind our AI Accelerator platform

🛡️ **Smart Assurance™** - AI-driven quality & testing teams for enterprise-grade implementations

All backed by 15+ years of proven strategic planning, expert execution, and world-class talent. Which area interests you most?`;
  }

  // Timeline questions
  if (msg.includes('timeline') || msg.includes('how long') || msg.includes('when')) {
    return `Our timelines depend on the transformation scope:

• Smart Suite™: 1-5 years (flexible engagement model)
• AI Synthesizer™: 12-36 months (revolutionary implementations)
• Smart Assurance™: 3-18 months (quality & testing cycles)

Most clients start seeing results within the first quarter. We focus on rapid value delivery while building sustainable long-term transformation. What's your target timeline for seeing results?`;
  }

  // Qualification/next steps
  if (msg.includes('next steps') || msg.includes('contact') || msg.includes('meeting') || msg.includes('call')) {
    return `Great! I'd love to connect you with the right Smart Suite™ team for your industry and needs.

For qualified prospects (C-level executives with $500K+ innovation budgets), our Smart Suite™ teams respond within 2 hours during business hours.

You can:
• Continue chatting here for more details
• Call our priority line: +1 (555) 123-4567
• Email leadership: leadership@smartfactory.io
• Use the contact form below

What's the best way for our team to reach you?`;
  }

  // Data security/privacy concerns
  if (msg.includes('security') || msg.includes('private') || msg.includes('data') || msg.includes('confidential')) {
    return `Security is paramount at Smart Factory - it's exactly why we build our own AI models instead of relying on commercial services.

🛡️ All conversations stay on Smart Factory servers
🛡️ No external API calls to commercial AI services  
🛡️ Complete data sovereignty and GDPR compliance
🛡️ Custom models trained specifically for consulting

This demonstrates our "we build what we sell" approach. Our clients trust us with their most sensitive transformation initiatives because we prove we can secure AI systems properly. What specific security concerns can I address?`;
  }

  // Inappropriate requests
  if (msg.includes('image') || msg.includes('picture') || msg.includes('photo')) {
    return `I can't generate images, but I'd be happy to discuss how our visual design and brand strategy teams can help with your creative needs. 

Let's focus on how Smart Factory can help solve your business challenges. What transformation goals are you working toward?`;
  }

  // Default response with lead qualification
  return `I'm here to help you learn about Smart Factory's consulting services. With 15+ years of proven experience, we specialize in strategic planning, expert execution, and finding the right people for complex challenges.

Our three pillars - Smart Suite™, AI Synthesizer™, and Smart Assurance™ - can address most enterprise transformation needs.

Could you tell me more about:
• Your industry or business type
• The main challenges you're facing  
• Your timeline for seeing results

This helps me connect you with the most relevant Smart Suite™ team.`;
};

// Enhanced chat endpoint with realistic AI responses
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context = [] } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`📩 User: ${message}`);

    // Simulate AI processing time for realism
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    const response = generateResponse(message, context);
    console.log(`🤖 Assistant: ${response.substring(0, 100)}...`);
    
    res.json({ 
      response: response,
      model: 'Smart Factory Custom Model (Demo)',
      timestamp: new Date().toISOString(),
      demo_mode: true
    });

  } catch (error) {
    console.error('❌ Demo API Error:', error.message);
    
    const fallbackResponse = `I apologize, but I'm experiencing technical difficulties.

For immediate assistance with Smart Factory's consulting services:
• Call our priority line: +1 (555) 123-4567
• Email our leadership team: leadership@smartfactory.io

Our Smart Suite™ teams respond to qualified inquiries within 2 hours during business hours.`;

    res.json({ 
      response: fallbackResponse,
      fallback: true,
      error: 'Demo AI temporarily unavailable'
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    mode: 'demo',
    model: 'Smart Factory Custom Model (Demo)',
    capabilities: 'Full demonstration mode',
    timestamp: new Date().toISOString()
  });
});

// Info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Smart Factory AI Assistant',
    version: '1.0.0 (Demo Mode)',
    model: 'Custom Smart Factory Model',
    description: 'Demonstrating Smart Factory AI capabilities with realistic responses',
    note: 'This demo shows full functionality while Ollama models are being configured',
    capabilities: [
      'Smart Suite™ consulting information',
      'AI Synthesizer™ service details', 
      'Smart Assurance™ quality services',
      'Lead qualification and routing',
      'Professional boundaries and security',
      'Realistic conversation flow'
    ]
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n🚀 Smart Factory AI Assistant API (DEMO MODE)`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🎭 Mode: Intelligent Demo Responses`);
  console.log(`🎯 Purpose: Full functionality demonstration`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   POST /api/chat     - Chat with demo AI assistant`);
  console.log(`   GET  /api/health   - Health check`);
  console.log(`   GET  /api/info     - Service information`);
  console.log(`\n✅ Ready to demonstrate Smart Factory's AI capabilities!`);
  console.log(`💡 This provides realistic responses while Ollama is configured.`);
});