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
                <Card className="relative text-center group overflow-hidden bg-gradient-to-br from-primary/85 to-primary-dark/90 border border-primary/25 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:scale-105">
                  <CardContent className="p-10 relative z-10">
                    {/* Premium glass reflection */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent rounded-3xl opacity-60"></div>
                    
                    <div className="relative mx-auto mb-8">
                      <div className="w-20 h-20 mx-auto bg-gradient-to-br from-accent via-accent-light to-accent rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-500"
                           style={{
                             boxShadow: '0 20px 40px rgba(255, 203, 154, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                           }}>
                        <IconComponent className="w-10 h-10 text-white drop-shadow-lg" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/60 to-accent-light/60 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <div className="text-4xl font-black text-white mb-3 drop-shadow-lg">{stat.value}</div>
                    <div className="text-base text-white/90 font-bold uppercase tracking-[0.1em]">{stat.label}</div>
                  </CardContent>
                  
                  {/* Premium hover effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-accent/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl"></div>
                  
                  {/* Enhanced border glow */}
                  <div className="absolute -inset-[1px] bg-gradient-to-br from-accent/30 to-accent/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-sm"></div>
                  
                  {/* Premium geometric accent */}
                  <div className="absolute top-6 right-6 w-3 h-3 bg-accent rounded-full opacity-40 group-hover:opacity-100 transition-all duration-300"
                       style={{
                         boxShadow: '0 4px 12px rgba(255, 203, 154, 0.6)'
                       }}></div>
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
              <Card className="relative h-full group overflow-hidden bg-gradient-to-br from-primary/85 to-primary-dark/90 border border-primary/25 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:scale-105">
                <CardContent className="p-10 relative z-10">
                  {/* Premium glass layers */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent rounded-3xl opacity-60"></div>
                  
                  {/* Enhanced Profile Image */}
                  <div className="text-center mb-10">
                    <div className="relative mx-auto mb-8">
                      <div className="w-36 h-36 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent p-2 shadow-2xl group-hover:scale-110 transition-all duration-500"
                           style={{
                             boxShadow: '0 25px 50px rgba(0, 0, 0, 0.4), 0 10px 20px rgba(217, 128, 140, 0.3), inset 0 2px 0 rgba(255, 255, 255, 0.3)'
                           }}>
                        <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20">
                          <ImageWithFallback
                            src={leader.image}
                            alt={leader.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-secondary/50 to-accent/50 rounded-full blur-2xl opacity-40 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    
                    <h3 className="text-2xl font-black mb-3 text-white uppercase tracking-[0.1em] leading-tight">{leader.name}</h3>
                    <p className="text-xl font-bold text-primary mb-3">{leader.title}</p>
                    <p className="text-base text-white/85 font-semibold">{leader.background}</p>
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

