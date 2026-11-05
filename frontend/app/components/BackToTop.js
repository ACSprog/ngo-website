'use client'
import { useState, useEffect } from 'react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement
      const scrolled = el.scrollTop
      const total = el.scrollHeight - el.clientHeight
      setProgress(total > 0 ? (scrolled / total) * 100 : 0)
      setVisible(scrolled > 400)
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  if (!visible) return null

  // SVG circle progress
  const size = 44
  const strokeWidth = 3
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (progress / 100) * circumference

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      style={{
        position: 'fixed',
        bottom: '100px',   // sits above WhatsApp button
        right: '28px',
        zIndex: 9998,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        backgroundColor: 'var(--white)',
        border: 'none',
        cursor: 'pointer',
        boxShadow: '0 4px 16px rgba(107,45,139,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 0,
        transition: 'box-shadow 0.2s ease, transform 0.2s ease',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(107,45,139,0.35)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(107,45,139,0.2)'; e.currentTarget.style.transform = 'translateY(0)' }}
    >
      {/* Circular progress ring */}
      <svg width={size} height={size} style={{ position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)' }}>
        {/* Track */}
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(107,45,139,0.1)" strokeWidth={strokeWidth} />
        {/* Progress */}
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="var(--purple)" strokeWidth={strokeWidth}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 0.1s linear' }}
        />
      </svg>
      {/* Arrow */}
      <span style={{ fontSize: '16px', position: 'relative', zIndex: 1, lineHeight: 1 }}>↑</span>
    </button>
  )
}