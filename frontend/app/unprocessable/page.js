'use client'
import Link from 'next/link'

export default function UnprocessableEntity() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(212,160,23,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>422</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>📋</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: '#D4A017', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          Form Validation Failed
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 16px' }}>
          We received your submission but couldn't process it because some fields didn't pass validation. Please go back and check your entries.
        </p>

        {/* What to check */}
        <div style={{ backgroundColor: '#FFF8E1', borderRadius: '16px', padding: '16px 20px', marginBottom: '28px', border: '1px solid #FFE082', textAlign: 'left' }}>
          <p style={{ margin: '0 0 10px', fontWeight: '700', fontSize: '13px', color: '#D4A017', fontFamily: "'Lato', sans-serif" }}>📋 Please check:</p>
          {[
            'All required fields are filled in',
            'Email address is in the correct format',
            'Phone number includes country code (+260)',
            'Text fields are not too short or too long',
            'No special characters in name fields',
          ].map((item, i) => (
            <p key={i} style={{ margin: '4px 0', fontSize: '13px', color: '#795548', fontFamily: "'Lato', sans-serif" }}>› {item}</p>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '28px' }}>
          <button onClick={() => history.back()} style={{ backgroundColor: '#D4A017', color: 'white', padding: '13px 28px', borderRadius: '50px', border: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', cursor: 'pointer', boxShadow: '0 6px 20px rgba(212,160,23,0.3)' }}>
            ✏️ Fix My Form
          </button>
          <Link href="/contact" style={{ color: 'var(--purple)', padding: '13px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>
            📞 Contact Us
          </Link>
        </div>

        <p style={{ color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "Let all things be done decently and in order." — 1 Corinthians 14:40
        </p>
      </div>
    </div>
  )
}