'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GatewayTimeout() {
  const [retrying, setRetrying] = useState(false)
  const [count, setCount]       = useState(30)

  useEffect(() => {
    if (count <= 0) return
    const t = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count])

  const handleRetry = () => {
    setRetrying(true)
    setTimeout(() => window.location.reload(), 1500)
  }

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(198,40,40,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>504</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>🐌</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#C62828', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Gateway Timeout
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 16px' }}>
          Our server took too long to get a response from an upstream service. This is a temporary issue. Please wait a moment and try again.
        </p>

        {/* Countdown */}
        <div style={{ display: 'inline-block', backgroundColor: '#FCE4EC', borderRadius: '50px', padding: '8px 24px', marginBottom: '28px', border: '2px solid #FFCDD2' }}>
          <p style={{ margin: 0, fontSize: '14px', fontFamily: "'Lato', sans-serif", color: '#C62828', fontWeight: '700' }}>
            {count > 0 ? `Suggested retry in ${count} seconds` : '✅ You can retry now!'}
          </p>
        </div>

        {/* Status indicators */}
        <div style={{ backgroundColor: '#FFF5F5', borderRadius: '16px', padding: '16px 20px', marginBottom: '28px', border: '1px solid #FFCDD2', textAlign: 'left' }}>
          <p style={{ margin: '0 0 10px', fontWeight: '700', fontSize: '13px', color: '#C62828', fontFamily: "'Lato', sans-serif" }}>🔍 What's happening:</p>
          {[
            'Your request reached our server successfully',
            'Our server forwarded it to a backend service',
            'The backend service did not respond in time',
            'This is usually resolved within a few minutes',
          ].map((item, i) => (
            <p key={i} style={{ margin: '4px 0', fontSize: '13px', color: '#795548', fontFamily: "'Lato', sans-serif" }}>
              {i < 2 ? '✅' : i === 2 ? '❌' : '⏳'} {item}
            </p>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button
            onClick={handleRetry}
            style={{ backgroundColor: count === 0 || !retrying ? '#C62828' : '#ccc', color: 'white', padding: '13px 28px', borderRadius: '50px', border: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(198,40,40,0.3)', minWidth: '140px' }}
          >
            {retrying ? '⏳ Retrying...' : count > 0 ? `🔄 Retry in ${count}s` : '🔄 Try Again'}
          </button>
          <Link href="/" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            🏠 Go Home
          </Link>
          <Link href="/contact" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            📞 Contact Us
          </Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "Those who hope in the Lord will renew their strength." — Isaiah 40:31
        </p>
      </div>
    </div>
  )
}