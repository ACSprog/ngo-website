'use client'
import Link from 'next/link'

export default function Gone() {
  const links = [
    { label: '📰 Latest News',    href: '/news' },
    { label: '📊 Impact Reports', href: '/impact' },
    { label: '🙏 Our Programs',   href: '/programs' },
    { label: '📞 Contact Us',     href: '/contact' },
  ]

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '560px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(80px,15vw,150px)', color: 'rgba(107,45,139,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>410</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(40px,8vw,68px)' }}>🌿</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: 'clamp(22px,4vw,36px)', marginBottom: '12px' }}>
          This Page Is Gone
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: 1.8, maxWidth: '440px', margin: '0 auto 28px' }}>
          This page has been permanently removed. It may have been an old news article, event or resource that is no longer available. Please explore our other content below.
        </p>

        {/* Suggested links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '28px' }}>
          {links.map(link => (
            <Link key={link.href} href={link.href} style={{ backgroundColor: 'var(--white)', borderRadius: '12px', padding: '14px 12px', textDecoration: 'none', color: 'var(--purple)', fontSize: '14px', fontWeight: '700', fontFamily: "'Lato', sans-serif", border: '2px solid rgba(107,45,139,0.12)', transition: 'all 0.2s ease', display: 'block' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F3E5F5'; e.currentTarget.style.borderColor = 'var(--purple)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--white)'; e.currentTarget.style.borderColor = 'rgba(107,45,139,0.12)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/" style={{ backgroundColor: 'var(--purple)', color: 'white', padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '15px', boxShadow: '0 6px 20px rgba(107,45,139,0.3)', display: 'inline-block' }}>
          🏠 Take Me Home →
        </Link>

        <p style={{ marginTop: '32px', color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "See, I am doing a new thing!" — Isaiah 43:19
        </p>
      </div>
    </div>
  )
}