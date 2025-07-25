"use client"

import { sanityClient } from '../sanity.client'
import { useEffect, useState } from 'react'
import Image from 'next/image'

type Leader = {
  name: string
  photo?: { asset: { url: string } }
  bio: string
  contactLink: string
  role: string
}

type Team = {
  leaders: Leader[]
}

export default function TeamSection() {
  const [data, setData] = useState<Team | null>(null)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "team"][0]{leaders[]{name, photo{asset->{url}}, bio, contactLink, role}}`
    ).then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  return (
    <section id="team" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h2>Our Leadership Team</h2>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap', marginTop: 32 }}>
        {data.leaders?.map((leader, i) => (
          <div key={i} style={{ minWidth: 220, maxWidth: 320, background: '#f5f5f5', borderRadius: 12, padding: 24, margin: 8 }}>
            {leader.photo?.asset?.url && <Image src={leader.photo.asset.url} alt={leader.name} width={64} height={64} style={{ borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />}
            <h3 style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>{leader.name || 'Name'}</h3>
            <p style={{ fontStyle: 'italic', color: '#505A6B' }}>{leader.role || 'Role'}</p>
            <p>{leader.bio}</p>
            <a href={leader.contactLink} style={{ color: '#2AD18B', fontWeight: 'bold', textDecoration: 'underline' }}>Contact</a>
          </div>
        ))}
      </div>
    </section>
  )
} 