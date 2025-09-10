import { motion } from 'framer-motion';
import { MetricsDashboard } from './MetricsDashboard';
import { InteractiveResultsChart } from './InteractiveResultsChart';

// Import about content (fallback)
import aboutContent from '../content/about.json';
import { useContent } from '../src/contexts/ContentContext';

export function AboutSection() {
  // Use shared content for live updates
  const { content } = useContent();
  const { header, clientPortfolioHeader, portfolioSummary, portfolioFooter } = content.about;
  
  // Helper function to replace placeholders in text
  const replacePlaceholders = (text: string, variables: Record<string, string>) => {
    return Object.entries(variables).reduce((acc, [key, value]) => {
      return acc.replace(new RegExp(`{${key}}`, 'g'), value);
    }, text);
  };

  const clientPortfolio = [
    {
      category: "Agriculture & Cooperative Finance",
      description: "Agricultural lending transformation and cooperative growth",
      publicClients: ["Cooperative Finance Association"],
      privateClients: ["Agricultural cooperatives", "Rural financial institutions", "Farm credit systems"],
      impact: "847% portfolio growth achievement",
      engagement: "COO/CTO leadership - transformational growth"
    },
    {
      category: "Federal Banking Systems", 
      description: "Central banking technology and regulatory transformation",
      publicClients: ["Federal Reserve System"],
      privateClients: ["Regional banking institutions", "Credit unions"],
      impact: "Critical infrastructure modernization",
      engagement: "Government contract excellence"
    },
    {
      category: "Global Healthcare & Life Sciences",
      description: "Pharmaceutical innovation and biotechnology advancement",
      publicClients: ["Johnson & Johnson", "Bayer AG"],
      privateClients: ["Biotech startups", "Medical device manufacturers"],
      impact: "$1.8B+ R&D optimization",
      engagement: "Enterprise-scale digital transformation"
    },
    {
      category: "Professional Sports & Entertainment",
      description: "Fan engagement technology and operational excellence",
      publicClients: ["NBA (National Basketball Association)", "MLB (Major League Baseball)"],
      privateClients: ["Professional franchises", "Sports technology companies"],
      impact: "Fan experience revolution",
      engagement: "League-wide technology initiatives"
    },
    {
      category: "International Airlines & Transportation",
      description: "Aviation technology and passenger experience optimization",
      publicClients: ["Etihad Airways", "Sprint Corporation"],
      privateClients: ["Regional carriers", "Transportation logistics"],
      impact: "Operational efficiency breakthroughs",
      engagement: "Global fleet management systems"
    },
    {
      category: "Higher Education & Research",
      description: "Academic digital transformation and research innovation",
      publicClients: ["University of Central Missouri", "University of Kansas Health System"],
      privateClients: ["Private universities", "Research institutions"],
      impact: "Educational technology advancement",
      engagement: "Campus-wide digital initiatives"
    },
    {
      category: "Financial Services & Insurance",
      description: "Banking innovation and insurance technology",
      publicClients: ["Armed Forces Insurance", "Bank of Oklahoma"],
      privateClients: ["Regional banks", "Insurance providers"],
      impact: "$900M+ platform modernization",
      engagement: "Regulatory compliance excellence"
    },
    {
      category: "Technology & Innovation",
      description: "Enterprise software development and platform scaling",
      publicClients: ["Altare (Public Markets)", "Evergy Inc."],
      privateClients: ["SaaS platforms", "Enterprise software companies"],
      impact: "$200M+ valuation growth",
      engagement: "IPO preparation and scaling"
    }
  ];

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Enhanced background with geometric patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          
          <h2 className="mb-8 text-4xl lg:text-6xl font-black leading-tight">
            {header.title.line1}
            <span className="block text-gradient mt-2">{header.title.line2}</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto">
            {replacePlaceholders(header.description, {
              foundingYear: header.foundingYear,
              expertiseTypes: header.expertiseTypes, 
              keyOutcome: header.keyOutcome
            }).split(header.foundingYear).map((part, index) => 
              index === 0 ? (
                part
              ) : (
                <>
                  <span className="text-secondary font-bold">{header.foundingYear}</span>
                  {part.split(header.expertiseTypes).map((subPart, subIndex) => 
                    subIndex === 0 ? (
                      subPart
                    ) : (
                      <>
                        <span className="text-accent font-bold">{header.expertiseTypes}</span>
                        {subPart.split(header.keyOutcome).map((finalPart, finalIndex) => 
                          finalIndex === 0 ? (
                            finalPart
                          ) : (
                            <>
                              <span className="text-secondary font-bold">{header.keyOutcome}</span>
                              {finalPart}
                            </>
                          )
                        )}
                      </>
                    )
                  )}
                </>
              )
            )}
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
            <MetricsDashboard />
          </motion.div>

          {/* Right Column - Visual */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-secondary/10 to-primary/10 rounded-2xl p-8 backdrop-blur-sm border border-border/50 h-full">
              <InteractiveResultsChart />
            </div>
          </motion.div>
        </div>

        {/* Elite Client Portfolio Showcase */}
        <motion.div
          className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-6">{clientPortfolioHeader.title}</h3>
            <p className="text-white/90 max-w-3xl mx-auto leading-relaxed text-lg">
              <span className="text-secondary font-bold">{clientPortfolioHeader.yearsExperience} years</span> of delivering transformational results for the world's most demanding organizations. 
              From <span className="text-accent font-bold">{clientPortfolioHeader.clientType1}</span> to <span className="text-primary font-bold">{clientPortfolioHeader.clientType2}</span>, 
              our track record speaks for itself.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {clientPortfolio.map((portfolio, index) => (
              <motion.div 
                key={index}
                className="group cursor-pointer p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-accent/40 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/20 relative h-[280px] hover:h-[380px] overflow-hidden hover:overflow-visible hover:z-30"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                {/* Default Content */}
                <div className="group-hover:opacity-0 transition-opacity duration-300 space-y-4">
                  <div className="text-sm font-black text-primary uppercase tracking-wider">
                    {portfolio.category}
                  </div>
                  <div className="text-sm text-white/90 leading-relaxed font-medium">
                    {portfolio.description}
                  </div>
                  
                  {/* Public Clients - Always Visible */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-secondary uppercase tracking-wide">Notable Clients:</div>
                    <div className="flex flex-wrap gap-1">
                      {portfolio.publicClients.map((client, clientIndex) => (
                        <div key={clientIndex} className="text-xs font-bold text-white bg-secondary/20 px-2 py-1 rounded-full">
                          {client}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-xs text-white/60 text-center pt-2">
                    Hover for full portfolio
                  </div>
                </div>

                {/* Hover Expanded Content */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-br from-primary/95 to-secondary/95 backdrop-blur-xl rounded-2xl p-6 z-10">
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="text-sm font-black text-white uppercase tracking-wider border-b border-accent/30 pb-2">
                      {portfolio.category}
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-xs font-bold text-accent uppercase tracking-wide mb-2">✓ Public Clients:</div>
                        <div className="space-y-1">
                          {portfolio.publicClients.map((client, clientIndex) => (
                            <div key={clientIndex} className="text-sm text-white font-bold bg-accent/30 px-3 py-1 rounded">
                              {client}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs font-bold text-white/90 uppercase tracking-wide mb-2">Additional Portfolio:</div>
                        <div className="space-y-1">
                          {portfolio.privateClients.map((client, clientIndex) => (
                            <div key={clientIndex} className="text-xs text-white/80">
                              • {client}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="border-t border-white/30 pt-3 space-y-1">
                      <div className="text-sm font-bold text-accent">{portfolio.impact}</div>
                      <div className="text-xs text-white/90">{portfolio.engagement}</div>
                    </div>
                  </div>
                </div>
                
                {/* Interactive indicator */}
                <div className="absolute top-4 right-4 w-3 h-3 bg-accent rounded-full opacity-60 group-hover:opacity-100 group-hover:shadow-lg group-hover:shadow-accent/50 transition-all duration-300 z-20"></div>
              </motion.div>
            ))}
          </div>
          
          {/* Confident Portfolio Summary */}
          <div className="text-center space-y-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl border border-secondary/30">
                <div className="text-3xl font-black text-secondary mb-2">{portfolioSummary.totalImpact.value}</div>
                <div className="text-sm font-semibold text-white">{portfolioSummary.totalImpact.title}</div>
                <div className="text-xs text-white/70 mt-1">{portfolioSummary.totalImpact.subtitle}</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-primary/30">
                <div className="text-3xl font-black text-primary mb-2">{portfolioSummary.majorEnterprises.value}</div>
                <div className="text-sm font-semibold text-white">{portfolioSummary.majorEnterprises.title}</div>
                <div className="text-xs text-white/70 mt-1">{portfolioSummary.majorEnterprises.subtitle}</div>
              </div>
              <div className="p-6 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-2xl border border-accent/30">
                <div className="text-3xl font-black text-accent mb-2">{portfolioSummary.clientRetention.value}</div>
                <div className="text-sm font-semibold text-white">{portfolioSummary.clientRetention.title}</div>
                <div className="text-xs text-white/70 mt-1">{portfolioSummary.clientRetention.subtitle}</div>
              </div>
            </div>
            
            <p className="text-sm text-white/70 max-w-2xl mx-auto leading-relaxed">
              <span className="text-accent font-semibold">Public company engagements</span> showcase our proven ability to deliver under the highest scrutiny.<br/>
              <span className="text-primary font-semibold">Private client success</span> demonstrates our versatility across all enterprise scales.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
