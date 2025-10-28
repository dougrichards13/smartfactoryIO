import { Linkedin, Mail, Award, Building2, Users, Target } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function TeamSection() {
  const leadership = [
    {
      name: "Doug Richards",
      title: "Executive Director & Founder",
      background: "Multi-Patented Technologist & Company Scaling Expert",
      expertise: ["Company Scaling", "AI Transformation", "Strategic Technology Integration", "Equity-Risk Partnerships"],
      bio: "Recognized innovator and proven company scaling expert with extraordinary track record of transformational growth. Founded Smart Factory in 2010, specializing in exponential business acceleration through strategic technology integration and equity-risk partnerships. Multi-patented technologist whose creative background spans from touring musician with legendary acts to pioneering early internet standards and AI-driven business transformation.",
      achievements: ["Scaled CFA by 847% in five years", "Led 11.2x exit of global patient billing company", "Transformed insurance company via AI to $32M exit (3.6M baseline)"],
      linkedin: "https://linkedin.com/in/dougrichardsKC",
      email: "doug@smartfactory.io",
      image: "/doug-richards-headshot.png"
    },
    {
      name: "Heather Richards",
      title: "Managing Partner",
      background: "Multi-Industry Digital Transformation & Customer Success Executive",
      expertise: ["Digital Transformation", "Customer Success", "Strategic Planning", "Global Operations"],
      bio: "Accomplished executive with extensive cross-industry experience spanning Technology (AWS, Github, Microsoft, Adobe), Healthcare (Hospice Credentialing, American Board of Nursing), Government (Jackson County, MO), Education (Park University, Johns Hopkins), and Sports organizations. Expert in merging data-driven insights with transparent communication to drive measurable organizational transformation and stakeholder alignment.",
      achievements: ["Created $20M annual AWS certification program", "Keynote Speaker & Nationally Published", "Recovered $2M+ in unidentified revenue through financial audits"],
      linkedin: "https://www.linkedin.com/in/heatherdavisrichards/",
      email: "heather@smartfactory.io", 
      image: "/heather-richards-headshot.jpg"
    },
    {
      name: "Jeffrey Kupper",
      title: "Managing Director",
      background: "Global Operations & Strategic Growth Executive",
      expertise: ["Company Scaling", "International Expansion", "Operational Excellence", "Exit Strategy"],
      bio: "Seasoned executive with a proven track record of driving exponential growth and successful exits across multiple industries. Specializes in scaling operations, international market expansion, and orchestrating complex turnarounds. With experience spanning petrochemical, insurance, and industrial manufacturing sectors, Jeffrey brings strategic insight and operational expertise to companies seeking transformational growth and exit readiness.",
      achievements: ["Scaled a petrochemical company 450% over 3 years leading to a 10.1x exit", "Built US operations of a global insurance marketplace with 3 funding rounds", "Turned around a US industrial manufacturer via 1200% growth through global expansion"],
      linkedin: "https://linkedin.com/in/jeffreykupper",
      email: "jeffrey.kupper@smartfactory.io",
      image: "/JK Headshot2.JPG"
    },
  ];

  const teamStats = [
    {
      icon: Users,
      value: "100+",
      label: "Expert Consultants Worldwide"
    },
    {
      icon: Building2,
      value: "<20",
      label: "Selective Client Partnerships"
    },
    {
      icon: Target,
      value: "Points & %",
      label: "Performance-Based Compensation"
    },
    {
      icon: Award,
      value: "Multi-Million",
      label: "Client Value Creation"
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
                <Card className="relative text-center group overflow-hidden bg-[#232632] border border-primary/25 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:scale-105">
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
        <div className="grid lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {leadership.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="relative h-full group overflow-hidden bg-[#232632] border border-primary/25 rounded-3xl backdrop-blur-xl transition-all duration-500 hover:scale-105">
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
                  <div className="flex gap-2 relative z-20">
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

        {/* Elite Partnership Model */}
        <motion.div 
          className="relative mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-[#232632] via-[#1e2129] to-[#181c25] border-2 border-gradient-to-r from-accent via-secondary to-primary rounded-3xl backdrop-blur-xl"
               style={{
                 backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(54, 249, 151, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(217, 128, 140, 0.1) 0%, transparent 50%)'
               }}>
            <div className="p-12 lg:p-20 relative z-10">
              {/* Aggressive geometric accents */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-accent/20 to-transparent rounded-br-3xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-secondary/20 to-transparent rounded-tl-3xl"></div>
              
              <div className="text-center max-w-5xl mx-auto">
                <motion.div 
                  className="inline-flex items-center px-8 py-4 mb-12 bg-gradient-to-r from-accent/30 via-secondary/30 to-primary/30 border-2 border-accent/50 rounded-full backdrop-blur-sm shadow-2xl"
                  whileHover={{ scale: 1.05, boxShadow: "0 25px 50px rgba(54, 249, 151, 0.3)" }}
                  style={{
                    boxShadow: '0 20px 40px rgba(54, 249, 151, 0.2), inset 0 2px 0 rgba(255, 255, 255, 0.2)'
                  }}
                >
                  <div className="w-3 h-3 bg-accent rounded-full mr-4 animate-pulse shadow-lg"></div>
                  <span className="text-base font-black uppercase tracking-[0.3em] text-white drop-shadow-lg">ELITE PARTNERSHIP MODEL</span>
                </motion.div>
                
                <h3 className="mb-8 text-4xl lg:text-6xl font-black leading-tight text-white drop-shadow-2xl">
                  WE DON'T JUST CONSULT
                  <span className="block text-gradient mt-3 text-5xl lg:text-7xl">WE CO-INVEST IN YOUR SUCCESS</span>
                </h3>
                
                <p className="text-2xl lg:text-3xl text-white font-bold leading-relaxed mb-12 max-w-4xl mx-auto drop-shadow-xl">
                  We maintain <span className="text-accent font-black">fewer than 20 active partnerships</span> globally because our{' '}
                  <span className="text-secondary font-black">compensation is tied to your exponential growth</span>. 
                  This isn't consulting—this is <span className="text-gradient font-black">co-investment in your future</span>.
                </p>
                
                <div className="grid md:grid-cols-2 gap-12 mt-16">
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-[#2a2e3a] to-[#1e222d] p-8 rounded-2xl border border-accent/30 backdrop-blur-sm">
                      <div className="flex items-center mb-6">
                        <div className="w-4 h-4 bg-accent rounded-full mr-6 flex-shrink-0 shadow-lg animate-pulse"></div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-wide">PREMIUM + PERFORMANCE</h4>
                      </div>
                      <p className="text-white/90 leading-relaxed text-lg font-semibold">
                        You invest in <span className="text-accent font-black">proven expertise that scales companies from millions to billions in top-line revenue</span>. 
                        Our performance bonuses are earned alongside <span className="text-secondary font-black">the exponential growth our clients achieve</span>—{' '}
                        <span className="text-accent font-black">because we've done this before, repeatedly</span>.
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="relative group"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 via-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    <div className="relative bg-gradient-to-br from-[#2a2e3a] to-[#1e222d] p-8 rounded-2xl border border-secondary/30 backdrop-blur-sm">
                      <div className="flex items-center mb-6">
                        <div className="w-4 h-4 bg-secondary rounded-full mr-6 flex-shrink-0 shadow-lg animate-pulse"></div>
                        <h4 className="text-2xl font-black text-white uppercase tracking-wide">PROVEN METHODOLOGY</h4>
                      </div>
                      <p className="text-white/90 leading-relaxed text-lg font-semibold">
                        <span className="text-secondary font-black">100+ world-class consultants</span> deploying proprietary Smart Factory software and{' '}
                        <span className="text-accent font-black">trademarked scaling methodologies</span> that every billion-dollar client success story has used.{' '}
                        <span className="text-secondary font-black">This isn't theory—it's a proven, repeatable system</span>.
                      </p>
                    </div>
                  </motion.div>
                </div>
                
                <div className="mt-16 pt-10 border-t border-white/10">
                  <p className="text-lg text-white/80 italic max-w-3xl mx-auto leading-relaxed">
                    "We don't bet on projects—we bet on founders. If you're ready to compound value, we'll stand beside you,{' '}
                    put real skin in the game, and engineer outcomes that reward everyone involved."
                  </p>
                  <p className="text-sm text-accent font-semibold mt-4">— Doug Richards, Executive Director & Founder</p>
                </div>
              </div>
            </div>
            
            {/* Epic border effects */}
            <div className="absolute -inset-[2px] bg-gradient-to-r from-accent via-secondary to-primary rounded-3xl opacity-50 -z-10"></div>
            <div className="absolute -inset-[4px] bg-gradient-to-r from-accent/30 via-secondary/30 to-primary/30 rounded-3xl opacity-30 -z-20 blur-sm"></div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

