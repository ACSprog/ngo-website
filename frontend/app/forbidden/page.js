'use client'
import Link from 'next/link'

export default function Forbidden() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(107,45,139,0.1)', lineHeight: 1, margin: 0, userSelect: 'none' }}>403</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>🚫</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Access Denied
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 28px' }}>
          You don't have permission to view this page. If you think this is a mistake, please contact our team and we'll sort it out.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          <Link href="/" style={{ backgroundColor: 'var(--purple)', color: 'white', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', boxShadow: '0 6px 20px rgba(107,45,139,0.3)' }}>
            🏠 Go Home
          </Link>
          <Link href="/contact" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            📞 Contact Us
          </Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "The Lord is my shepherd; I lack nothing." — Psalm 23:1
        </p>
      </div>
    </div>
  )
}