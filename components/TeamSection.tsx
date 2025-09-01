import { Linkedin, Mail, Award, Building2, Users, Target } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
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
    <section id="team" className="section-padding relative overflow-hidden">
      {/* Enhanced background with geometric patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-accent/5"></div>
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center max-w-5xl mx-auto mb-24"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div 
            className="inline-flex items-center px-6 py-3 mb-8 bg-gradient-to-r from-accent/20 to-primary/20 border border-accent/30 rounded-full backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-accent rounded-full mr-3 animate-pulse"></div>
            <span className="text-sm font-bold uppercase tracking-[0.2em] text-white">Leadership Team</span>
          </motion.div>
          
          <h2 className="mb-8 text-4xl lg:text-6xl font-black leading-tight">
            C-LEVEL EXPERTISE
            <span className="block text-gradient mt-2">ENTERPRISE LEADERSHIP EXPERIENCE</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed font-medium max-w-4xl mx-auto">
            Our leadership team consists of <span className="text-accent font-bold">former C-suite executives</span> with proven track records 
            of driving transformation at <span className="text-secondary font-bold">Fortune 500 companies</span>. We understand enterprise challenges 
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
                <Card className="relative text-center group overflow-hidden bg-gradient-to-br from-accent/5 to-primary/5 border border-white/10 hover:border-accent/30 backdrop-blur-sm transition-all duration-500 hover:scale-105">
                  <CardContent className="p-8 relative z-10">
                    <div className="relative mx-auto mb-6">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-accent to-accent-light rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 to-accent-light/40 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                    <div className="text-sm text-white/80 font-semibold uppercase tracking-wider">{stat.label}</div>
                  </CardContent>
                  
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/10 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                  
                  {/* Geometric accent */}
                  <div className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-300"></div>
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
              <Card className="relative h-full group overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5 border border-white/10 hover:border-primary/30 backdrop-blur-sm transition-all duration-500 hover:scale-105">
                <CardContent className="p-8 relative z-10">
                  {/* Enhanced Profile Image */}
                  <div className="text-center mb-8">
                    <div className="relative mx-auto mb-6">
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary to-secondary p-1 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <div className="w-full h-full rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/40 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white uppercase tracking-wider">{leader.name}</h3>
                    <p className="text-lg font-semibold text-primary mb-2">{leader.title}</p>
                    <p className="text-sm text-white/80 font-medium">{leader.background}</p>
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
                  <p className="text-sm text-white/80 mb-6 leading-relaxed">
                    {leader.bio}
                  </p>

                  {/* Key Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3 text-foreground">Key Achievements:</h4>
                    <div className="space-y-2">
                      {leader.achievements.map((achievement, achIndex) => (
                        <div key={achIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"></div>
                          <span className="text-xs text-white/80">{achievement}</span>
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
          <p className="text-white/80 mb-8 max-w-3xl mx-auto">
            Our team combines the strategic insight and operational experience of Fortune 500 executives 
            with the innovation and agility of a technology startup. We understand both the challenges 
            and opportunities of enterprise transformation because we've successfully navigated them before.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-lg font-bold text-primary mb-1">Fortune 500</div>
              <div className="text-sm text-white/80">Executive Experience</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-lg font-bold text-secondary mb-1">Startup</div>
              <div className="text-sm text-white/80">Innovation Mindset</div>
            </div>
            <div className="p-4 bg-white/60 dark:bg-card/60 backdrop-blur-sm rounded-lg border border-border/30">
              <div className="text-lg font-bold text-accent mb-1">AI-First</div>
              <div className="text-sm text-white/80">Technology Approach</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

