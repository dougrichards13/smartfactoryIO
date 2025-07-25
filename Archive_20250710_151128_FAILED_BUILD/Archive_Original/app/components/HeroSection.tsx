"use client"

import { useEffect, useRef } from 'react'
import styles from './HeroSection.module.css'

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (heroRef.current) {
      observer.observe(heroRef.current)
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current)
      }
    }
  }, [])

  return (
    <div ref={heroRef} className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>
          Transforming Human Potential into Business Reality
        </h1>
        <h2 className={styles.subtitle}>
          AI-Driven Consulting for Visionary Leaders
        </h2>
        <p className={styles.description}>
          Smart Factory is the premier AI and technology consulting partner for upper mid-size and early enterprise companies with a minimum $500k annual innovation/AI budget.
        </p>
        <div className={styles.cta}>
          <a 
            href="#contact" 
            className={styles.primaryButton}
            onClick={(e) => {
              e.preventDefault()
              const contactSection = document.querySelector('#contact')
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Talk to a Smart Architect™
          </a>
          <a 
            href="#services" 
            className={styles.secondaryButton}
            onClick={(e) => {
              e.preventDefault()
              const servicesSection = document.querySelector('#services')
              if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' })
              }
            }}
          >
            Explore Our Services
          </a>
        </div>
      </div>
      <div className={styles.background}>
        <div className={styles.overlay} />
        <div className={styles.pattern} />
      </div>
    </div>
  )
} 