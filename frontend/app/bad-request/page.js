'use client'
import Link from 'next/link'

export default function BadRequest() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(212,160,23,0.1)', lineHeight: 1, margin: 0, userSelect: 'none' }}>400</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>🤔</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#D4A017', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Bad Request
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 28px' }}>
          Something about your request didn't look right. This can happen if a form was submitted incorrectly or a link is broken. Please try again.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button
            onClick={() => history.back()}
            style={{ backgroundColor: '#D4A017', color: 'white', padding: '13px 28px', borderRadius: '50px', border: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(212,160,23,0.3)' }}
          >
            🔄 Go Back
          </button>
          <Link href="/" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            🏠 Go Home
          </Link>
          <Link href="/contact" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            📞 Contact Us
          </Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "Ask and it will be given to you." — Matthew 7:7
        </p>
      </div>
    </div>
  )
}