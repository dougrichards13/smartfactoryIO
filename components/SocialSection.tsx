import { Linkedin, Twitter, Youtube, Globe, Calendar, Zap, Building } from 'lucide-react';
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

  /*
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
  */

  return (
    <section id="social" className="section-padding">
      <div className="container-custom">

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


      </div>
    </section>
  );
}

