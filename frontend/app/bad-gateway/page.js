'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function BadGateway() {
  const [retrying, setRetrying] = useState(false)

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => window.location.reload(), 1500)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(198,40,40,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>502</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>🔌</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#C62828', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Bad Gateway
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 16px' }}>
          Our server received an invalid response from an upstream service. This is a temporary issue on our end — not your fault. Please try again in a moment.
        </p>

        <div style={{ backgroundColor: '#FCE4EC', borderRadius: '16px', padding: '14px 20px', marginBottom: '28px', border: '1px solid #FFCDD2' }}>
          <p style={{ margin: 0, fontSize: '13px', color: '#C62828', fontFamily: "'Lato', sans-serif", fontWeight: '600' }}>
            🔧 Our technical team has been automatically notified and is working on a fix.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button onClick={handleRetry} style={{ backgroundColor: '#C62828', color: 'white', padding: '13px 28px', borderRadius: '50px', border: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(198,40,40,0.3)', minWidth: '140px' }}>
            {retrying ? '⏳ Retrying...' : '🔄 Try Again'}
          </button>
          <Link href="/" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            🏠 Go Home
          </Link>
          <Link href="/contact" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            📞 Contact Us
          </Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "He restores my soul." — Psalm 23:3
        </p>
      </div>
    </div>
  )
}