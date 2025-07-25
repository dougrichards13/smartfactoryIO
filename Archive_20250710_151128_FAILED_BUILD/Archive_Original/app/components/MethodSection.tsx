"use client"

import { sanityClient } from '../sanity.client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type Method = {
  title: string
  description: string
  bulletPoints: string[]
}

export default function MethodSection() {
  const [data, setData] = useState<Method | null>(null)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "method"][0]{title, description, bulletPoints}`
    ).then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <section id="method" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h2>{data.title}</h2>
      <Image src="/placeholder.svg" alt="Method Placeholder" width={120} height={80} />
      <p>{data?.description || 'The Smart Factory Method™: Assembly line/plug-and-play, proprietary frameworks, innovation, strategy, quality, impact.'}</p>
      <ul style={{ textAlign: 'left', display: 'inline-block', margin: '2rem auto', padding: 0 }}>
        {data.bulletPoints?.map((bp, i) => (
          <li key={i} style={{ margin: '0.5rem 0', fontWeight: 'bold', color: '#2AD18B' }}>{bp}</li>
        ))}
      </ul>
    </section>
  )
} 