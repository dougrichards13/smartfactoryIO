"use client"

import { sanityClient } from '../sanity.client'
import { useEffect, useState } from 'react'

type ChatbotConfig = {
  provider: string
  embedCode: string
}
type LeadCaptureLogic = {
  qualificationQuestions: string[]
  routingLogic: string
}
type Contact = {
  chatbotConfig: ChatbotConfig
  leadCaptureLogic: LeadCaptureLogic
  additionalInfo: string
}

export default function ContactSection() {
  const [data, setData] = useState<Contact | null>(null)

  useEffect(() => {
    sanityClient.fetch(
      `*[_type == "contact"][0]{chatbotConfig, leadCaptureLogic, additionalInfo}`
    ).then(setData)
  }, [])

  if (!data) return <div>Loading...</div>

  const defaultBotpressEmbed = `<script>window.botpressWebChat = { botId: 'YOUR_BOTPRESS_BOT_ID', hostUrl: 'https://cdn.botpress.cloud/webchat/v0', messagingUrl: 'https://messaging.botpress.cloud' }<\/script><script src='https://cdn.botpress.cloud/webchat/v0/inject.js'><\/script>`;

  return (
    <section id="contact" style={{ padding: '4rem 0', textAlign: 'center' }}>
      <h2>Contact & Chatbot</h2>
      <p>{data.additionalInfo}</p>
      <div style={{ margin: '2rem 0' }}>
        <h3>Lead Qualification</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {data.leadCaptureLogic?.qualificationQuestions?.map((q, i) => (
            <li key={i} style={{ margin: '0.5rem 0' }}>{q}</li>
          ))}
        </ul>
        <p><strong>Routing Logic:</strong> {data.leadCaptureLogic?.routingLogic}</p>
      </div>
      {(data?.chatbotConfig?.embedCode || defaultBotpressEmbed) && (
        <div dangerouslySetInnerHTML={{ __html: data?.chatbotConfig?.embedCode || defaultBotpressEmbed }} />
      )}
    </section>
  )
} 