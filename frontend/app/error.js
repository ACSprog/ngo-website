'use client'
import { useEffect } from 'react'
import Link from 'next/link'

// Catches all unhandled runtime errors (500-level)
export default function GlobalError({ error, reset }) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '580px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(198,40,40,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>500</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>⚠️</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#C62828', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Something Went Wrong
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, marginBottom: '28px', maxWidth: '440px', margin: '0 auto 28px' }}>
          We're sorry — an unexpected error occurred on our end. Our team has been notified. Please try again or come back shortly.
        </p>

        {/* Error code for devs */}
        {error?.message && (
          <div style={{ backgroundColor: '#FCE4EC', borderRadius: '10px', padding: '10px 16px', marginBottom: '24px', border: '1px solid #FFCDD2', display: 'inline-block' }}>
            <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '12px', color: '#C62828' }}>
              {error.message}
            </p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={reset} style={{ backgroundColor: '#C62828', color: 'white', padding: '13px 28px', borderRadius: '50px', border: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(198,40,40,0.3)' }}>
            🔄 Try Again
          </button>
          <Link href="/" style={{ backgroundColor: 'var(--white)', color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            🏠 Go Home
          </Link>
        </div>

        <p style={{ marginTop: '28px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '13px' }}>
          If this keeps happening, please{' '}
          <Link href="/contact" style={{ color: 'var(--purple)', fontWeight: '700', textDecoration: 'none' }}>contact us</Link>
          {' '}and we'll fix it.
        </p>

        <p style={{ marginTop: '20px', color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "He restores my soul." — Psalm 23:3
        </p>
      </div>
    </div>
  )
}