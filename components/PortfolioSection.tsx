import { ExternalLink } from 'lucide-react';

export function PortfolioSection() {
  return (
    <section id="portfolio" className="bg-[#161922] border-t border-white/10">
      <div className="container-custom py-16 md:py-24">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="mb-8 text-4xl lg:text-6xl font-black leading-tight text-white">Our Other Companies</h2>
          <p className="mt-3 text-white/70 max-w-3xl mx-auto">
            Founded by Doug and Heather Richards. A portfolio that proves repeatable innovation at enterprise scale.
          </p>
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {/* KCIT Consulting */}
          <a
            href="https://kcitconsulting.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 hover:from-white/10 hover:to-white/5 transition-all duration-300 p-6 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {/* Visual thumbnail (placeholder since KCIT OG image wasn't easily extractable) */}
            <div className="overflow-hidden rounded-xl border border-white/10">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80"
                alt="KCIT Consulting website visual placeholder"
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-secondary">KCIT Consulting</h3>
                <h4 className="mt-2 text-lg md:text-xl font-semibold text-white">Subscription Contract Workforce, Automated</h4>
                <p className="mt-2 text-white/70">
                  Removes agency friction from contract worker management and replaces it with automation. Predictable cost, SLA-grade delivery, and executive visibility baked in.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>• Operating Model: Subscription-based contract workforce</li>
                  <li>• C-Suite Outcomes: Cost transparency, cycle-time compression, compliance control</li>
                  <li>• Integration: Works alongside internal PMO/Vendor Mgmt with automated governance</li>
                </ul>
              </div>
              <ExternalLink className="mt-1 h-5 w-5 text-white/40 group-hover:text-primary transition-colors" />
            </div>
          </a>

          {/* DropBear AI */}
          <a
            href="https://dropbear.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/0 hover:from-white/10 hover:to-white/5 transition-all duration-300 p-6 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            {/* Visual thumbnail from DropBear OG image */}
            <div className="overflow-hidden rounded-xl border border-white/10">
              <img
                src="https://img1.wsimg.com/isteam/getty/1957321937"
                alt="DropBear AI hero visual"
                className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            <div className="mt-4 flex items-start justify-between">
              <div>
                <h3 className="mt-3 text-2xl md:text-3xl font-extrabold text-primary">DropBear AI</h3>
                <h4 className="mt-2 text-lg md:text-xl font-semibold text-white">Patent-Pending AI for Restomod Vehicles</h4>
                <p className="mt-2 text-white/70">
                  A first-of-its-kind platform to install AI into restomod cars—launching with squarebody trucks. Demonstrates full-stack invention and commercialization capability; currently raising Seed/Series A.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/70">
                  <li>• Innovation: Embedded AI + vehicle systems integration</li>
                  <li>• Market: Hi-end enthusiast segment, launch target Fall 2026</li>
                  <li>• Signaling: Proof of frontier engineering and IP creation</li>
                </ul>
              </div>
              <ExternalLink className="mt-1 h-5 w-5 text-white/40 group-hover:text-primary transition-colors" />
            </div>
          </a>
        </div>

        {/* Executive framing */}
        <div className="mt-10 md:mt-14 text-center">
          <p className="text-sm md:text-base text-white/60 max-w-3xl mx-auto">
            Why this matters to the C-Suite: these sister companies illustrate Smart Factory’s operating system—identify value gaps, engineer scalable mechanisms, and ship outcomes with governance. The same playbook we apply inside your enterprise.
          </p>
        </div>
      </div>
    </section>
  );
}
