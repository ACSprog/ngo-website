'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TooManyRequests() {
  const [count, setCount] = useState(30)

  // Countdown before suggesting retry
  useEffect(() => {
    if (count <= 0) return
    const t = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count])

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(198,40,40,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>429</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>⏱️</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#C62828', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Too Many Requests
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 16px' }}>
          You've made too many requests in a short time. Please wait a moment before trying again.
        </p>

        {/* Countdown */}
        <div style={{ display: 'inline-block', backgroundColor: '#FCE4EC', borderRadius: '50px', padding: '8px 24px', marginBottom: '28px', border: '2px solid #FFCDD2' }}>
          <p style={{ margin: 0, fontSize: '14px', fontFamily: "'Lato', sans-serif", color: '#C62828', fontWeight: '700' }}>
            {count > 0 ? `Please wait ${count} seconds before retrying` : '✅ You can try again now!'}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button
            onClick={() => count === 0 && history.back()}
            style={{ backgroundColor: count === 0 ? '#C62828' : '#ccc', color: 'white', padding: '13px 28px', borderRadius: '50px', border: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', cursor: count === 0 ? 'pointer' : 'not-allowed', boxShadow: count === 0 ? '0 6px 20px rgba(198,40,40,0.3)' : 'none', transition: 'all 0.3s ease' }}
          >
            🔄 {count > 0 ? `Retry in ${count}s` : 'Try Again'}
          </button>
          <Link href="/" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            🏠 Go Home
          </Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "Be still before the Lord and wait patiently." — Psalm 37:7
        </p>
      </div>
    </div>
  )
}