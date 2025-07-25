"use client"
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'
import DarkModeToggle from './DarkModeToggle'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'AI Accelerator', href: '#ai-accelerator' },
  { label: 'Method', href: '#method' },
  { label: 'Results', href: '#results' },
  { label: 'Team', href: '#team' },
  { label: 'Social', href: '#social' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    e.preventDefault()
    setIsOpen(false)
    const el = document.querySelector(href)
    if (el) {
      const navHeight = 80 // Approximate navbar height
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - navHeight

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <a href="#hero" className={styles.logo} onClick={(e) => handleNavClick(e, '#hero')}>
          Smart Factory
        </a>

        {/* Mobile menu button */}
        <button 
          className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation items */}
        <ul className={`${styles.navItems} ${isOpen ? styles.open : ''}`}>
          {navItems.map((item, i) => (
            <li key={i}>
              <a 
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={styles.navLink}
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className={styles.themeToggle}>
            <DarkModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  )
} 