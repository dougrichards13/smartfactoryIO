import { Linkedin, Youtube, Calendar, Zap, Building } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'framer-motion';

export function SocialSection() {
  const socialChannels = [
    {
      icon: Linkedin,
      name: "LinkedIn",
      handle: "Smart Factory",
      description: "Enterprise transformation insights and thought leadership for C-level executives",
      followers: "Growing professional network",
      url: "https://www.linkedin.com/company/smartfactoryIO",
      color: "text-[#0077B5]"
    },
    {
      icon: Youtube,
      name: "YouTube",
      handle: "@SmartFactoryIO",
      description: "Executive education, case studies, and transformation insights",
      followers: "C-suite focused content",
      url: "https://www.youtube.com/@SmartFactoryIO",
      color: "text-[#FF0000]"
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
        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-20">
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
                <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20 group bg-gradient-to-br from-white/5 to-white/10">
                  <CardContent className="p-8 text-center">
                    {/* Icon */}
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
                      <IconComponent className={`w-10 h-10 ${channel.color}`} />
                    </div>
                    
                    {/* Channel Info */}
                    <h3 className="text-xl font-bold mb-2 text-white">{channel.name}</h3>
                    <p className="text-sm text-primary font-semibold mb-3">{channel.handle}</p>
                    <p className="text-sm text-white/80 mb-6 leading-relaxed">{channel.description}</p>
                    
                    {/* Followers */}
                    <Badge variant="outline" className="mb-6 bg-accent/10 border-accent/20 text-accent px-3 py-1">
                      {channel.followers}
                    </Badge>
                    
                    {/* Follow Button */}
                    <Button 
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-semibold py-2" 
                      asChild
                    >
                      <a href={channel.url} target="_blank" rel="noopener noreferrer">
                        Connect & Follow
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

