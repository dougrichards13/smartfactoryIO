"use client"
import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    if (dark) {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [dark])

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setDark(d => !d)}
      style={{
        marginLeft: 16,
        background: 'var(--color-section-bg)',
        color: 'var(--color-text)',
        border: 'none',
        borderRadius: 8,
        padding: '0.5rem 1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: 16,
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)'
      }}
    >
      {dark ? '🌙 Dark' : '☀️ Light'}
    </button>
  )
}

export function DarkModeFallback() {
  return <button style={{marginLeft: 16}}>Toggle Dark Mode</button>;
} 