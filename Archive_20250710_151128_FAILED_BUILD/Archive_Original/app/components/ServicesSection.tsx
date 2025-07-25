"use client"

import { sanityClient } from '../sanity.client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type Service = {
  icon?: { asset: { url: string } }
  headline: string
  description: string
  cta: string
}

type ServicesDoc = {
  services: Service[]
}

export default function ServicesSection() {
  const [data, setData] = useState<ServicesDoc | null>(null)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "services"][0]{services[]{icon{asset->{url}}, headline, description, cta}}`
    ).then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <section id="services" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h2>Our Services</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 32 }}>
        {data.services?.map((svc, i) => (
          <div key={i} style={{ minWidth: 220, maxWidth: 320, background: '#f5f5f5', borderRadius: 12, padding: 24, margin: 8 }}>
            {svc.icon?.asset?.url ? (
              <Image src={svc.icon.asset.url} alt={svc.headline || 'Service Icon'} width={64} height={64} />
            ) : (
              <Image src="/placeholder.svg" alt="Placeholder Icon" width={64} height={64} />
            )}
            <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{svc.headline || 'Service Name'}</h3>
            <p>{svc.description || 'Service description goes here.'}</p>
            <button>{svc.cta || 'Learn More'}</button>
          </div>
        ))}
      </div>
    </section>
  )
} 