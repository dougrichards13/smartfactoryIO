import { Linkedin, Twitter, Youtube, Globe, Heart, Users, Calendar, Zap, Building } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export function SocialSection() {
  const socialChannels = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      handle: "@SmartFactoryAI",
      description: "Enterprise AI insights and thought leadership",
      followers: "25K+ followers",
      url: "https://linkedin.com/company/smartfactory",
      color: "text-[#0077B5]"
    },
    {
      icon: Twitter,
      name: "X (Twitter)",
      handle: "@SmartFactoryIO",
      description: "Real-time AI innovation and industry news",
      followers: "18K+ followers", 
      url: "https://twitter.com/smartfactoryio",
      color: "text-[#1DA1F2]"
    },
    {
      icon: Youtube,
      name: "YouTube",
      handle: "Smart Factory Channel",
      description: "C-suite AI education and case studies",
      followers: "12K+ subscribers",
      url: "https://youtube.com/@smartfactory",
      color: "text-[#FF0000]"
    },
    {
      icon: Globe,
      name: "Smart Factory Blog",
      handle: "insights.smartfactory.io",
      description: "Deep-dive articles on enterprise AI transformation",
      followers: "50K+ monthly readers",
      url: "https://insights.smartfactory.io",
      color: "text-primary"
    }
  ];

  const communityInitiatives = [
    {
      icon: Users,
      title: "Diversity & Inclusion",
      description: "Building diverse teams that reflect the communities we serve"
    },
    {
      icon: Heart,
      title: "Social Impact",
      description: "Leveraging AI for positive social and environmental change"
    },
    {
      icon: Globe,
      title: "Global Accessibility",
      description: "Making AI transformation accessible to organizations worldwide"
    }
  ];

  return (
    <section id="social" className="section-padding">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-secondary/10 border-secondary/20 text-secondary">
            Community & Social Impact
          </Badge>
          <h2 className="mb-6">
            Join Our Global Community
            <span className="text-gradient block">Connect, Learn, Transform</span>
          </h2>
          <p className="lead text-white/80">
            Follow Smart Factory across social channels for the latest insights in enterprise AI, 
            digital transformation strategies, and exclusive content for C-level executives driving innovation.
          </p>
        </motion.div>

        {/* Social Channels */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {socialChannels.map((channel, index) => {
            const IconComponent = channel.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 group">
                  <CardContent className="p-6 text-center">
                    {/* Icon */}
                    <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-xl flex items-center justify-center group-hover:bg-muted/80 transition-colors">
                      <IconComponent className={`w-8 h-8 ${channel.color}`} />
                    </div>
                    
                    {/* Channel Info */}
                    <h3 className="text-lg font-semibold mb-1">{channel.name}</h3>
                    <p className="text-sm text-white/80 font-medium mb-2">{channel.handle}</p>
                    <p className="text-xs text-white/80 mb-4 leading-relaxed">{channel.description}</p>
                    
                    {/* Followers */}
                    <Badge variant="outline" className="mb-4 bg-primary/10 border-primary/20 text-primary">
                      {channel.followers}
                    </Badge>
                    
                    {/* Follow Button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full hover:bg-primary/10 border-primary/20"
                      asChild
                    >
                      <a href={channel.url} target="_blank" rel="noopener noreferrer">
                        Follow
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Community Values */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold text-center mb-12">Our Commitment to Community</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {communityInitiatives.map((initiative, index) => {
              const IconComponent = initiative.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-secondary/20">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 mx-auto mb-6 bg-secondary/10 rounded-xl flex items-center justify-center">
                        <IconComponent className="w-8 h-8 text-secondary" />
                      </div>
                      <h4 className="text-xl font-semibold mb-4">{initiative.title}</h4>
                      <p className="text-white/80 leading-relaxed">{initiative.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* About Smart Factory Statement */}
        <motion.div
          id="about-company"
          className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold mb-6">We Transform Enterprises, Not Just Technology</h3>
          <p className="text-white/90 mb-6 max-w-4xl mx-auto leading-relaxed text-lg font-medium">
            <span className="text-primary font-bold">Smart Factory doesn't just implement solutions—we architect transformation.</span> 
            Since 2010, we've partnered with C-suite leaders to deliver measurable business outcomes that 
            directly impact your bottom line, market position, and competitive advantage.
          </p>
          <p className="text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
            Our systematic approach combines <span className="text-secondary font-semibold">proven methodologies</span> 
            with <span className="text-accent font-semibold">cutting-edge technology</span> (including AI) to create 
            sustainable competitive advantages. We don't just change your technology—we transform your entire 
            operational paradigm. When we leave, your company is smarter through our framework: 
            <span className="text-primary font-bold">Clarity, Communication, Control</span>.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="p-6 bg-background/80 backdrop-blur-sm rounded-lg border-2 border-primary/30 hover:border-primary/50 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary mb-2">2010</div>
              <div className="text-sm text-white/90 font-semibold">Founded</div>
              <div className="text-xs text-white/70 mt-1">Disrupting traditional consulting since day one</div>
            </div>
            <div className="p-6 bg-background/80 backdrop-blur-sm rounded-lg border-2 border-secondary/30 hover:border-secondary/50 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary mb-2">Smart</div>
              <div className="text-sm text-white/90 font-semibold">We Work Smart</div>
              <div className="text-xs text-white/70 mt-1">Modern solutions, not playbooks</div>
            </div>
            <div className="p-6 bg-background/80 backdrop-blur-sm rounded-lg border-2 border-accent/30 hover:border-accent/50 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-accent" />
              </div>
              <div className="text-2xl font-bold text-accent mb-2">All Sizes</div>
              <div className="text-sm text-white/90 font-semibold">Every Company</div>
              <div className="text-xs text-white/70 mt-1">From startups to enterprise</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

