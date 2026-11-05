'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function RequestTimeout() {
  const [retrying, setRetrying] = useState(false)

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => window.location.reload(), 1500)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(26,75,140,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>408</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>⌛</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#1A4B8C', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Request Timed Out
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 28px' }}>
          Your connection took too long to respond. This is usually caused by a slow internet connection. Please check your connection and try again.
        </p>

        {/* Connection tips */}
        <div style={{ backgroundColor: '#E3F2FD', borderRadius: '16px', padding: '16px 20px', marginBottom: '28px', border: '1px solid #BBDEFB', textAlign: 'left' }}>
          <p style={{ margin: '0 0 10px', fontWeight: '700', fontSize: '13px', color: '#1A4B8C', fontFamily: "'Lato', sans-serif" }}>💡 Try these quick fixes:</p>
          {['Check your Wi-Fi or mobile data connection', 'Move closer to your router', 'Turn airplane mode on and off', 'Clear your browser cache'].map((tip, i) => (
            <p key={i} style={{ margin: '4px 0', fontSize: '13px', color: '#1565C0', fontFamily: "'Lato', sans-serif" }}>› {tip}</p>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button onClick={handleRetry} style={{ backgroundColor: '#1A4B8C', color: 'white', padding: '13px 28px', borderRadius: '50px', border: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(26,75,140,0.3)', minWidth: '140px' }}>
            {retrying ? '⏳ Retrying...' : '🔄 Try Again'}
          </button>
          <Link href="/" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            🏠 Go Home
          </Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "Wait for the Lord; be strong and take heart." — Psalm 27:14
        </p>
      </div>
    </div>
  )
}