import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { AIAcceleratorSection } from './components/AIAcceleratorSection';
import { TeamSection } from './components/TeamSection';
import { SocialSection } from './components/SocialSection';
import { ContactSection } from './components/ContactSection';
import { PortfolioSection } from './components/PortfolioSection';
import { SmartAssistant } from './components/SmartAssistant';
import { ContentProvider } from './src/contexts/ContentContext';
import { useEffect, useState } from 'react';

export default function App() {
  const [omnisOpen, setOmnisOpen] = useState(false);
  
  const toggleOmnis = () => {
    setOmnisOpen(prev => !prev);
  };
  useEffect(() => {
    // Set SEO metadata
    document.title = "Smart Factory - AI Consulting for Visionary Leaders | Enterprise AI Transformation";
    
    // Meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Smart Factory transforms human potential into business reality through AI-driven consulting. Trusted by C-suite executives for strategic AI implementation and digital transformation since 2011.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Smart Factory transforms human potential into business reality through AI-driven consulting. Trusted by C-suite executives for strategic AI implementation and digital transformation since 2011.';
      document.head.appendChild(meta);
    }

    // Keywords meta tag
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', 'AI consulting, enterprise AI implementation, fractional technology leadership, AI Accelerator, C-level digital transformation, AI for enterprise, Smart Factory');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'keywords';
      meta.content = 'AI consulting, enterprise AI implementation, fractional technology leadership, AI Accelerator, C-level digital transformation, AI for enterprise, Smart Factory';
      document.head.appendChild(meta);
    }

    // Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: 'Smart Factory - AI Consulting for Visionary Leaders' },
      { property: 'og:description', content: 'Transform your enterprise with strategic AI implementation. $5B+ project impact, 13+ years of C-level expertise.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://smartfactory.io' },
      { property: 'og:image', content: 'https://smartfactory.io/og-image.jpg' },
      { property: 'og:site_name', content: 'Smart Factory' }
    ];

    ogTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.setAttribute('property', tag.property);
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Twitter Card meta tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@SmartFactoryIO' },
      { name: 'twitter:title', content: 'Smart Factory - AI Consulting for Visionary Leaders' },
      { name: 'twitter:description', content: 'Transform your enterprise with strategic AI implementation. $5B+ project impact, 13+ years of C-level expertise.' },
      { name: 'twitter:image', content: 'https://smartfactory.io/twitter-card.jpg' }
    ];

    twitterTags.forEach(tag => {
      let existingTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', tag.content);
      } else {
        const meta = document.createElement('meta');
        meta.name = tag.name;
        meta.content = tag.content;
        document.head.appendChild(meta);
      }
    });

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute('href', 'https://smartfactory.io');
    } else {
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = 'https://smartfactory.io';
      document.head.appendChild(link);
    }

    // Schema.org structured data for Organization
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Smart Factory",
      "description": "AI-driven consulting for visionary leaders. Enterprise AI implementation and digital transformation since 2011.",
      "url": "https://smartfactory.io",
      "logo": "https://smartfactory.io/logo.png",
      "foundingDate": "2011",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "Sales",
        "availableLanguage": "English"
      },
      "sameAs": [
        "https://linkedin.com/company/smartfactory",
        "https://twitter.com/smartfactoryio",
        "https://youtube.com/@smartfactory"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "US"
      },
      "services": [
        {
          "@type": "Service",
          "name": "Smart Factory AI Accelerator",
          "description": "Enterprise-grade AI platform for rapid, risk-managed AI implementation"
        },
        {
          "@type": "Service", 
          "name": "Smart Architects",
          "description": "C-suite fractional leaders for technology and digital transformation"
        },
        {
          "@type": "Service",
          "name": "Smart Engineers", 
          "description": "AI-empowered technology experts for integration and implementation"
        },
        {
          "@type": "Service",
          "name": "Smart Assurance",
          "description": "Quality and testing professionals with AI-driven methodologies"
        }
      ]
    });
    document.head.appendChild(schemaScript);

  }, []);

  return (
    <ContentProvider>
      <div className="min-h-screen bg-background">
          {/* SEO-friendly page structure with semantic HTML */}
          <Header onOmnisToggle={toggleOmnis} />
          <main role="main">
            <HeroSection />
            <AboutSection />
            <ServicesSection />
            <AIAcceleratorSection />
            <TeamSection />
            <SocialSection />
            <ContactSection />
          </main>
          
          {/* Portfolio Section */}
          <PortfolioSection />
          
          {/* Omnis AI Assistant */}
          <SmartAssistant 
            isOpen={omnisOpen} 
            onToggle={toggleOmnis}
          />
      
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">SF</span>
                </div>
                <span className="font-semibold">Smart Factory</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Transforming human potential into business reality since 2010.
              </p>
              <p className="text-xs text-muted-foreground">
                © 2025 Smart Factory. All rights reserved.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">+1 (913) 755-9268 (main)</p>
                <p className="text-sm text-muted-foreground">contact@smartfactory.io</p>
                <a href="#contact" className="block text-sm text-primary hover:text-primary-light transition-colors">Talk to a Smart Architect™</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </ContentProvider>
  );
}