"use client"

import { sanityClient } from '../sanity.client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type SocialLink = {
  platform: string
  url: string
  icon?: { asset: { url: string } }
}

type Social = {
  socialLinks: SocialLink[]
  statement: string
}

export default function SocialSection() {
  const [data, setData] = useState<Social | null>(null)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "social"][0]{socialLinks[]{platform, url, icon{asset->{url}}}, statement}`
    ).then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <section id="social" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h2>Connect with Us</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 24, margin: '2rem 0' }}>
        {data.socialLinks?.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block' }}>
            <Image src={link.icon?.asset?.url || '/placeholder.svg'} alt={link.platform || 'Social Platform'} width={32} height={32} />
            <span style={{ fontWeight: 'bold', color: '#1A2340' }}>{link.platform || 'Platform'}</span>
          </a>
        ))}
      </div>
      <p style={{ marginTop: 24 }}>{data.statement}</p>
    </section>
  )
} 