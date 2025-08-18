import { Linkedin, Mail, Award, Building2, Users, Target } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TeamSection() {
  const leadership = [
    {
      name: "Dr. Marcus Thompson",
      title: "Chief Executive Officer & Founder",
      background: "Former CTO at Fortune 100 Technology Company",
      expertise: ["AI Strategy", "Digital Transformation", "Enterprise Architecture"],
      bio: "15+ years of C-suite experience leading digital transformation initiatives for Fortune 500 companies. PhD in Computer Science from MIT, former CTO at major technology corporation with $50B+ revenue.",
      achievements: ["Led $2B+ digital transformation", "40+ patents in AI/ML", "Built teams of 500+ engineers"],
      linkedin: "#",
      email: "marcus@smartfactory.io",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "Sarah Mitchell",
      title: "Chief Strategy Officer",
      background: "Former CEO of Mid-Market Manufacturing Company",
      expertise: ["Strategic Planning", "Operations Excellence", "M&A Strategy"],
      bio: "20+ years of executive leadership including 8 years as CEO of a $500M manufacturing company. Expert in operational transformation and strategic growth initiatives.",
      achievements: ["Grew company 300% in 5 years", "Led 12 successful acquisitions", "Transformed manufacturing operations"],
      linkedin: "#",
      email: "sarah@smartfactory.io", 
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=400&h=400&fit=crop&crop=face"
    },
    {
      name: "James Chen",
      title: "Chief Technology Officer",
      background: "Former CIO at Global Financial Services Firm",
      expertise: ["AI Implementation", "Cloud Architecture", "Cybersecurity"],
      bio: "18+ years of technology leadership including 6 years as CIO at a top-10 global bank. Specialist in enterprise AI implementation and large-scale technology transformation.",
      achievements: ["Led $1B+ cloud migration", "Implemented AI at global scale", "Managed 2000+ person IT organization"],
      linkedin: "#",
      email: "james@smartfactory.io",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face"
    }
  ];

  const teamStats = [
    {
      icon: Award,
      value: "50+",
      label: "Years Combined C-Suite Experience"
    },
    {
      icon: Building2,
      value: "Fortune 500",
      label: "Previous Leadership Roles"
    },
    {
      icon: Users,
      value: "100+",
      label: "Expert Consultants Worldwide"
    },
    {
      icon: Target,
      value: "$10B+",
      label: "Managed Revenue Experience"
    }
  ];

  return (
    <section id="team" className="section-padding bg-muted/30">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="outline" className="mb-4 px-4 py-2 bg-accent/10 border-accent/20 text-accent-foreground">
            Leadership Team
          </Badge>
          <h2 className="mb-6">
            C-Level Expertise
            <span className="text-gradient block">Enterprise Leadership Experience</span>
          </h2>
          <p className="lead text-muted-foreground">
            Our leadership team consists of former C-suite executives with proven track records 
            of driving transformation at Fortune 500 companies. We understand enterprise challenges 
            because we've lived them.
          </p>
        </motion.div>

        {/* Team Stats */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-20">
          {teamStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-accent" />
                    </div>
                    <div className="text-2xl font-bold text-accent mb-1">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Leadership Profiles */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {leadership.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 hover:border-primary/20">
                <CardContent className="p-8">
                  {/* Profile Image */}
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
                      <ImageWithFallback
                        src={leader.image}
                        alt={leader.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{leader.name}</h3>
                    <p className="text-sm font-medium text-primary mb-2">{leader.title}</p>
                    <p className="text-xs text-muted-foreground">{leader.background}</p>
                  </div>

                  {/* Expertise */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-foreground">Core Expertise:</h4>
                    <div className="flex flex-wrap gap-2">
                      {leader.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="outline" className="text-xs bg-primary/10 border-primary/20 text-primary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    {leader.bio}
                  </p>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-foreground">Key Achievements:</h4>
                    <div className="space-y-2">
                      {leader.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></div>
                          <span className="text-xs text-muted-foreground">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Contact Links */}
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-primary/10 border-primary/20"
                      asChild
                    >
                      <a href={leader.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="w-4 h-4 mr-1" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 hover:bg-secondary/10 border-secondary/20"
                      asChild
                    >
                      <a href={`mailto:${leader.email}`}>
                        <Mail className="w-4 h-4 mr-1" />
                        Contact
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Team Culture */}
        <motion.div
          className="text-center bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-12 border border-border/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-semibold mb-4">Enterprise Leadership. Startup Agility.</h3>
          <p className="text-muted-foreground mb-8 max-w-3xl mx-auto">
            Our team combines the strategic insight and operational experience of Fortune 500 executives 
            with the innovation and agility of a technology startup. We understand both the challenges 
            and opportunities of enterprise transformation because we've successfully navigated them before.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-lg font-bold text-primary mb-1">Fortune 500</div>
              <div className="text-sm text-muted-foreground">Executive Experience</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-lg font-bold text-secondary mb-1">Startup</div>
              <div className="text-sm text-muted-foreground">Innovation Mindset</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-lg font-bold text-accent mb-1">AI-First</div>
              <div className="text-sm text-muted-foreground">Technology Approach</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}