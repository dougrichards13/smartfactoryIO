# Smart Factory AI Assistant - Development Setup

## Phase 1: Basic Implementation (Ready to Start)

### 1. Install Ollama (Local AI Server)
```powershell
# Download and install Ollama from https://ollama.ai
# Then pull LLaMA 2 model
ollama pull llama2:7b

# Test installation
ollama run llama2:7b
```

### 2. Create API Backend
Create a simple Node.js/Express server to connect to Ollama:

```javascript
// ai-assistant/server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const OLLAMA_URL = 'http://localhost:11434';
const MODEL = 'llama2:7b';

// Load Smart Factory knowledge base
const knowledgeBase = require('./knowledge-base.json');

// Create system prompt with Smart Factory context
const createSystemPrompt = () => {
  return `You are Smart Factory's AI Assistant. You help potential clients learn about Smart Factory's consulting services.

COMPANY INFO:
- Smart Factory: Enterprise consulting company founded in 2010
- 15+ years of proven experience in strategic planning and execution
- Human-centered approach with AI tools
- Philosophy: "Humans first. Results proven. Technology amplified."

SERVICES:
1. Smart Suite™ ($25K-$150K/engagement, 1-5 years): C-Suite transformation teams
2. AI Synthesizer™ ($100K-$500K/project, 12-36 months): AI Accelerator implementation
3. Smart Assurance™ ($25K-$150K/engagement, 3-18 months): Quality & testing teams

METRICS:
- 300%+ typical client ROI within 18 months
- 40% average operational efficiency improvements
- 98% client satisfaction rate
- 15+ years of enterprise delivery

GUIDELINES:
- Focus on Smart Factory's human expertise and proven track record
- Position AI as a tool, not the headline
- Cannot generate images or pretend to be human
- Redirect inappropriate requests professionally
- Connect qualified leads to Smart Suite™ teams

Always be professional, helpful, and focused on Smart Factory's consulting capabilities.`;
};

app.post('/api/chat', async (req, res) => {
  try {
    const { message, context } = req.body;
    
    // Build conversation context
    let conversationContext = createSystemPrompt() + '\n\n';
    if (context && context.length > 0) {
      context.forEach(msg => {
        conversationContext += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
    }
    conversationContext += `User: ${message}\nAssistant:`;

    // Call Ollama API
    const response = await axios.post(`${OLLAMA_URL}/api/generate`, {
      model: MODEL,
      prompt: conversationContext,
      stream: false,
      options: {
        temperature: 0.7,
        top_k: 40,
        top_p: 0.9,
      }
    });

    const assistantResponse = response.data.response.trim();
    
    res.json({ response: assistantResponse });
  } catch (error) {
    console.error('Ollama API Error:', error);
    res.status(500).json({ 
      error: 'AI Assistant temporarily unavailable',
      fallback: true
    });
  }
});

app.listen(3001, () => {
  console.log('Smart Factory AI Assistant API running on port 3001');
});
```

### 3. Install Dependencies
```powershell
cd ai-assistant
npm init -y
npm install express cors axios
```

### 4. Integration with Existing Site
Update ContactSection to use the new SmartAssistant component:

```typescript
// In ContactSection.tsx, replace the existing chatbot functionality
import { SmartAssistant } from '../ai-assistant/SmartAssistant';

// Replace the existing chatbot logic with:
const [assistantOpen, setAssistantOpen] = useState(false);

// Replace the placeholder chatbot with:
<SmartAssistant 
  isOpen={assistantOpen} 
  onToggle={() => setAssistantOpen(!assistantOpen)}
  apiEndpoint="/api/chat"
/>
```

### 5. Testing Phase
1. Start Ollama: `ollama serve`
2. Start API server: `node ai-assistant/server.js`  
3. Start main site: `npm run dev`
4. Test AI assistant functionality

## Phase 2: Enhanced Features (Week 2)

### Knowledge Base Enhancement
- Add more detailed Smart Factory information
- Include client success stories (anonymized)
- Add FAQ responses
- Industry-specific information

### Improved Responses
- Add response templates for common inquiries
- Implement lead qualification logic
- Add conversation memory
- Better error handling and fallbacks

### Security & Privacy
- Add rate limiting
- Implement conversation logging (secure)
- Add data encryption
- GDPR compliance features

## Phase 3: Production Deployment (Week 3)

### Docker Containerization
```dockerfile
# Dockerfile for AI Assistant
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["node", "server.js"]
```

### Production Considerations
- Load balancing for multiple model instances
- Model quantization for better performance
- Monitoring and alerting
- Backup and recovery procedures
- SSL/TLS encryption
- Firewall and security configurations

## Benefits of This Approach

### Technical Benefits
✅ **Zero External Dependencies**: No OpenAI, Anthropic, or other commercial AI APIs
✅ **Complete Data Control**: All conversations stay on Smart Factory servers
✅ **Customizable**: Can fine-tune the model with Smart Factory-specific data
✅ **Cost Effective**: No per-token API costs, only hosting costs
✅ **Demonstrable Expertise**: Shows Smart Factory builds and deploys AI solutions

### Business Benefits
✅ **Credibility**: "We build our own AI" is powerful positioning
✅ **Security**: Complete data privacy for enterprise clients
✅ **Compliance**: Meets strict data sovereignty requirements
✅ **Lead Qualification**: Automated initial screening of prospects
✅ **24/7 Availability**: Always-on customer service

## Quick Start Commands
```powershell
# 1. Install Ollama
# Download from https://ollama.ai and install

# 2. Pull model
ollama pull llama2:7b

# 3. Start Ollama server
ollama serve

# 4. In new terminal, start API server
cd ai-assistant
node server.js

# 5. In new terminal, start main site
npm run dev

# 6. Test at http://localhost:5173 - click "Start Smart Conversation"
```