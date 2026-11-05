'use client'
import Link from 'next/link'

export default function UnavailableForLegalReasons() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(26,75,140,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>451</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>⚖️</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#1A4B8C', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Unavailable For Legal Reasons
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 16px' }}>
          This content is not available in your region due to legal restrictions. This may be due to local laws, copyright, or regulatory requirements.
        </p>

        <div style={{ backgroundColor: '#E3F2FD', borderRadius: '16px', padding: '16px 20px', marginBottom: '28px', border: '1px solid #BBDEFB' }}>
          <p style={{ margin: 0, fontSize: '14px', color: '#1A4B8C', fontFamily: "'Lato', sans-serif", lineHeight: 1.7 }}>
            If you believe this is an error or you need assistance, please contact our team directly and we will do our best to help you.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          <Link href="/" style={{ backgroundColor: '#1A4B8C', color: 'white', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', boxShadow: '0 6px 20px rgba(26,75,140,0.3)' }}>
            🏠 Go Home
          </Link>
          <Link href="/contact" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            📞 Contact Us
          </Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "Give to Caesar what is Caesar's, and to God what is God's." — Matthew 22:21
        </p>
      </div>
    </div>
  )
}