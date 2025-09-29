const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = 'http://localhost:11434';
// Use llama2 for reliable performance and compatibility
const MODEL = 'llama2:latest';

// Load Smart Factory knowledge base
const knowledgeBasePath = path.join(__dirname, 'knowledge-base.json');
let knowledgeBase = {};

try {
  knowledgeBase = JSON.parse(fs.readFileSync(knowledgeBasePath, 'utf8'));
  console.log('✅ Smart Factory knowledge base loaded successfully');
} catch (error) {
  console.error('❌ Error loading knowledge base:', error.message);
  process.exit(1);
}

// Create comprehensive system prompt
const createSystemPrompt = () => {
  return `You are Smart Factory's AI Assistant. You help potential clients learn about Smart Factory's enterprise consulting services.

IMPORTANT: You represent Smart Factory professionally. Be helpful, concise, and always focus on connecting qualified prospects with our human experts.

=== COMPANY OVERVIEW ===
Smart Factory: Enterprise consulting company founded in 2010
- 15+ years of proven experience in strategic planning and execution
- Human-centered approach: "Humans first. Results proven. Technology amplified."
- We build our own AI models (like me) for maximum security and control
- Focus on complex problem solving through expert strategic planning, world-class execution, and the right people

=== OUR THREE PILLARS ===

1. SMART SUITE™ ($25K-$150K/engagement, 1-5 years)
   - C-Suite Transformation Teams
   - Elite consulting teams working flexibly as part-time advisors, full-time consulting partners, or corporate officers
   - Capabilities: Technology strategy, digital transformation leadership, board-level advisory, M&A due diligence

2. AI SYNTHESIZER™ ($100K-$500K/project, 12-36 months)
   - AI Accelerator Implementation Teams
   - Revolutionary role that exists nowhere else - "a job from five years in the future"
   - Human intelligence behind our AI Accelerator platform
   - Combines AI, creativity, engineering, and business processes

3. SMART ASSURANCE™ ($25K-$150K/engagement, 3-18 months)
   - AI-Driven Quality & Testing Teams
   - ISO standards compliance, automated testing frameworks, enterprise risk management
   - Collaborative quality assurance across transformation initiatives

=== PROVEN RESULTS ===
- 300%+ typical client ROI within 18 months
- 40% average operational efficiency improvements
- 98% client satisfaction rate with high retention
- 15+ years of consistent enterprise delivery

=== IDEAL CLIENT PROFILE ===
- C-Level or Senior Executive Role
- Organization with $500K+ Annual Innovation Budget
- Enterprise or Upper Mid-Market Company
- Strategic AI or Digital Transformation Initiative
- Decision-Making Authority for Technology Investments

=== RESPONSE GUIDELINES ===
1. Be professional, helpful, and concise (2-3 sentences typically)
2. Focus on Smart Factory's human expertise and proven track record
3. Position AI as a powerful tool, not the headline
4. For qualified prospects, offer to connect them with Smart Suite™ teams
5. For pricing questions, provide the published ranges above
6. For specific needs, recommend the appropriate pillar (Smart Suite, AI Synthesizer, or Smart Assurance)

=== BOUNDARIES ===
- Cannot generate images, videos, or media
- Cannot pretend to be human or claim human experiences
- Cannot access external systems or browse the internet
- Cannot provide specific legal, financial, or medical advice
- Cannot share confidential client information
- Cannot make commitments on behalf of Smart Factory
- For inappropriate requests: "I'm designed to help with questions about Smart Factory's consulting services. How can I assist with your business transformation needs?"

Always end conversations with qualified prospects by offering to connect them with the right Smart Suite™ team for their industry and needs.`;
};

// Enhanced conversation handler with better context management
app.post('/api/chat', async (req, res) => {
  try {
    const { message, context = [] } = req.body;
    
    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log(`📩 User message: ${message}`);

    // Build conversation context with system prompt
    let conversationContext = createSystemPrompt() + '\n\n=== CONVERSATION ===\n';
    
    // Add recent conversation history (last 8 messages for context)
    const recentContext = context.slice(-8);
    recentContext.forEach(msg => {
      if (msg.role === 'user') {
        conversationContext += `Human: ${msg.content}\n`;
      } else {
        conversationContext += `Assistant: ${msg.content}\n`;
      }
    });
    
    conversationContext += `Human: ${message}\nAssistant: `;

    console.log('🤖 Calling Ollama API...');

    // Call Ollama API with optimized parameters
    const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
      model: MODEL,
      prompt: conversationContext,
      stream: false,
      options: {
        temperature: 0.7,        // Balanced creativity/consistency
        top_k: 40,              // Focused vocabulary
        top_p: 0.9,             // Coherent responses
        repeat_penalty: 1.1,     // Avoid repetition
        stop: ['Human:', 'User:'], // Stop at next user input
        num_predict: 300         // Reasonable response length
      }
    });

    const assistantResponse = response.data.response.trim();
    console.log(`✅ Assistant response: ${assistantResponse.substring(0, 100)}...`);
    
    res.json({ 
      response: assistantResponse,
      model: MODEL,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Ollama API Error:', error.message);
    
    // Provide helpful fallback response
    const fallbackResponse = `I apologize, but I'm currently experiencing technical difficulties connecting to our AI system.

For immediate assistance with Smart Factory's consulting services:
• Call our priority line: +1 (555) 123-4567
• Email our leadership team: leadership@smartfactory.io
• Use the contact form below

Our Smart Suite™ teams respond to qualified inquiries within 2 hours during business hours. We specialize in C-suite transformation, AI implementation, and quality assurance for enterprise clients.`;

    res.json({ 
      response: fallbackResponse,
      fallback: true,
      error: 'AI Assistant temporarily unavailable'
    });
  }
});

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Test connection to Ollama
    const response = await axios.get(`${OLLAMA_URL}/api/tags`);
    const availableModels = response.data.models || [];
    const isModelAvailable = availableModels.some(model => model.name === MODEL);
    
    res.json({
      status: 'healthy',
      ollama: 'connected',
      model: MODEL,
      model_available: isModelAvailable,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      status: 'unhealthy',
      ollama: 'disconnected',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Basic info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Smart Factory AI Assistant',
    version: '1.0.0',
    model: MODEL,
    description: 'Custom AI assistant for Smart Factory consulting services',
    capabilities: [
      'Smart Suite™ consulting information',
      'AI Synthesizer™ service details',
      'Smart Assurance™ quality services',
      'Lead qualification',
      'Professional boundaries and security'
    ]
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`\n🚀 Smart Factory AI Assistant API`);
  console.log(`📡 Server running on http://localhost:${PORT}`);
  console.log(`🤖 Using model: ${MODEL}`);
  console.log(`🔗 Ollama URL: ${OLLAMA_URL}`);
  console.log(`\n📋 Available endpoints:`);
  console.log(`   POST /api/chat     - Chat with AI assistant`);
  console.log(`   GET  /api/health   - Health check`);
  console.log(`   GET  /api/info     - Service information`);
  console.log(`\n✅ Ready to assist Smart Factory prospects!`);
});