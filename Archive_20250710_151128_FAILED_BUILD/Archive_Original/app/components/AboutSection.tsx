"use client"

import { sanityClient } from '../sanity.client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type About = {
  companyHistory: string
  credentials: string
  vision: string
  differentiation: string
  clientLogos: { asset: { url: string } }[]
}

export default function AboutSection() {
  const [about, setAbout] = useState<About | null>(null)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "about"][0]{companyHistory, credentials, vision, differentiation, clientLogos[]{asset->{url}}}`
    ).then(setAbout)
  }, [])

  if (!about) return <div>Loading...</div>

  return (
    <section id="about" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h2>About Smart Factory</h2>
      <Image src="/placeholder.svg" alt="About Placeholder" width={120} height={80} />
      <p><strong>History:</strong> {about.companyHistory || 'Founded 2011, $5B+ in project impact, enterprise focus.'}</p>
      <p><strong>Credentials:</strong> {about.credentials || 'Factory approach, C-level expertise, AI leadership.'}</p>
      <p><strong>Vision:</strong> {about.vision || 'Factory approach, C-level expertise, AI leadership.'}</p>
      <p><strong>What makes us different:</strong> {about.differentiation || 'Factory approach, C-level expertise, AI leadership.'}</p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginTop: 24 }}>
        {about.clientLogos?.map((logo, i) => (
          <img key={i} src={logo.asset.url} alt="Client Logo" style={{ height: 48, background: '#fff', borderRadius: 8, padding: 8 }} />
        ))}
      </div>
    </section>
  )
} 