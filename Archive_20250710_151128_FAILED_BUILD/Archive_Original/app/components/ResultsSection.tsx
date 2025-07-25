"use client"

import { sanityClient } from '../sanity.client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type Testimonial = {
  client: string
  quote: string
}

type Results = {
  metrics: string[]
  testimonials: Testimonial[]
  visual?: { asset: { url: string } }
}

export default function ResultsSection() {
  const [data, setData] = useState<Results | null>(null)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "results"][0]{metrics, testimonials, visual{asset->{url}}}`
    ).then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <section id="results" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h2>Results & Impact</h2>
      <ul style={{ listStyle: 'none', padding: 0, margin: '2rem auto', maxWidth: 400 }}>
        {data.metrics?.map((m, i) => (
          <li key={i} style={{ margin: '0.5rem 0', fontWeight: 'bold', color: '#1A2340' }}>{m}</li>
        ))}
      </ul>
      {data.visual?.asset?.url && <img src={data.visual.asset.url} alt="Results Visual" style={{ maxHeight: 180, margin: '2rem auto' }} />}
      <div style={{ marginTop: 32 }}>
        {data.testimonials?.map((t, i) => (
          <blockquote key={i} style={{ fontStyle: 'italic', margin: '1rem auto', maxWidth: 500 }}>
            “{t.quote}”<br />
            <span style={{ fontWeight: 'bold', color: '#2AD18B' }}>— {t.client}</span>
          </blockquote>
        ))}
      </div>
      <Image src="/placeholder.svg" alt="Results Placeholder" width={120} height={80} />
      <p>{data.metrics?.length > 0 ? data.metrics[0] : 'Key Metric'}</p>
      <p>{data.testimonials?.length > 0 ? data.testimonials[0].quote : 'Client testimonial goes here.'}</p>
    </section>
  )
} 