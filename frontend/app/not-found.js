'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function NotFound() {
  const [count, setCount] = useState(10)

  useEffect(() => {
    if (count <= 0) { window.location.href = '/'; return }
    const t = setTimeout(() => setCount(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [count])

  const links = [
    { label: '🏠 Home',         href: '/' },
    { label: '💛 Donate',       href: '/donate' },
    { label: '🙋 Get Involved', href: '/get-involved' },
    { label: '📊 Impact',       href: '/impact' },
    { label: '📰 News',         href: '/news' },
    { label: '📞 Contact',      href: '/contact' },
  ]

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', width: '100%' }}>

        <div style={{ position: 'relative', marginBottom: '8px' }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(100px,20vw,180px)', color: 'rgba(107,45,139,0.08)', lineHeight: 1, margin: 0, userSelect: 'none' }}>404</p>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: 'clamp(48px,10vw,80px)' }}>🕊️</span>
          </div>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: 'clamp(24px,4vw,40px)', marginBottom: '12px' }}>
          Page Not Found
        </h1>
        <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '16px', lineHeight: 1.8, maxWidth: '480px', margin: '0 auto 12px' }}>
          The page you're looking for doesn't exist or has been moved. Don't worry — there's still plenty of hope to find here.
        </p>

        <div style={{ display: 'inline-block', backgroundColor: '#F3E5F5', borderRadius: '50px', padding: '8px 20px', marginBottom: '32px', border: '2px solid var(--purple)' }}>
          <p style={{ margin: 0, fontSize: '13px', fontFamily: "'Lato', sans-serif", color: 'var(--purple)', fontWeight: '700' }}>
            Redirecting to Home in <strong>{count}s</strong>
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '28px' }}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{ backgroundColor: 'var(--white)', borderRadius: '12px', padding: '12px 8px', textDecoration: 'none', color: 'var(--purple)', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", border: '2px solid rgba(107,45,139,0.12)', transition: 'all 0.2s ease', display: 'block' }}
              onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F3E5F5'; e.currentTarget.style.borderColor = 'var(--purple)' }}
              onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--white)'; e.currentTarget.style.borderColor = 'rgba(107,45,139,0.12)' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <Link href="/" style={{ backgroundColor: 'var(--purple)', color: 'white', padding: '14px 32px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '15px', boxShadow: '0 6px 20px rgba(107,45,139,0.3)', display: 'inline-block' }}>
          Take Me Home →
        </Link>

        <p style={{ marginTop: '36px', color: 'var(--text-light)', fontFamily: "'Playfair Display', serif", fontSize: '15px', fontStyle: 'italic' }}>
          "He left the 99 to find the one." — Luke 15:4
        </p>
      </div>
    </div>
  )
}