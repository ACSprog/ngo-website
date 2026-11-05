'use client'
import Link from 'next/link'

export default function Conflict() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(230,81,0,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>409</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>⚡</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#E65100', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Conflict Detected
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 16px' }}>
          Your request conflicts with existing data — for example, the email address or record you submitted may already exist. Please check your details and try again.
        </p>

        {/* Common causes */}
        <div style={{ backgroundColor: '#FFF3E0', borderRadius: '16px', padding: '16px 20px', marginBottom: '28px', border: '1px solid #FFE0B2', textAlign: 'left' }}>
          <p style={{ margin: '0 0 10px', fontWeight: '700', fontSize: '13px', color: '#E65100', fontFamily: "'Lato', sans-serif" }}>⚡ Common causes:</p>
          {[
            'Email address already registered',
            'Duplicate volunteer or donor record',
            'Form submitted more than once',
            'Account already exists',
          ].map((cause, i) => (
            <p key={i} style={{ margin: '4px 0', fontSize: '13px', color: '#BF360C', fontFamily: "'Lato', sans-serif" }}>› {cause}</p>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button onClick={() => history.back()} style={{ backgroundColor: '#E65100', color: 'white', padding: '13px 28px', borderRadius: '50px', border: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(230,81,0,0.3)' }}>
            🔄 Go Back
          </button>
          <Link href="/contact" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            📞 Contact Us
          </Link>
          <Link href="/" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            🏠 Go Home
          </Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "In all things God works for the good." — Romans 8:28
        </p>
      </div>
    </div>
  )
}