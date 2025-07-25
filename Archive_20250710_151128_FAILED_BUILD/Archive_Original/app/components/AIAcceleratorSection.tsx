"use client"

import { sanityClient } from '../sanity.client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type AIAccelerator = {
  headline: string
  description: string
  features: string[]
  visual?: { asset: { url: string } }
  cta: string
}

export default function AIAcceleratorSection() {
  const [data, setData] = useState<AIAccelerator | null>(null)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "aiAccelerator"][0]{headline, description, features, visual{asset->{url}}, cta}`
    ).then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <section id="ai-accelerator" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <Image src="/placeholder.svg" alt="AI Accelerator Placeholder" width={120} height={80} />
      <h3>{data?.headline || 'Smart Factory AI Accelerator™'}</h3>
      <p>{data?.description || 'Secure, private, enterprise-grade AI platform for rapid, risk-managed AI implementation.'}</p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '2rem auto', maxWidth: 400 }}>
        {data.features?.map((f, i) => (
          <li key={i} style={{ margin: '0.5rem 0', fontWeight: 'bold', color: '#1A2340' }}>• {f}</li>
        ))}
      </ul>
      {data.visual?.asset?.url && <img src={data.visual.asset.url} alt="AI Accelerator Visual" style={{ maxHeight: 180, margin: '2rem auto' }} />}
      <a href="#contact" style={{ display: 'inline-block', marginTop: 24, padding: '1rem 2rem', background: '#FFD166', color: '#1A2340', borderRadius: 8, fontWeight: 'bold', textDecoration: 'none' }}>{data.cta}</a>
    </section>
  )
} 