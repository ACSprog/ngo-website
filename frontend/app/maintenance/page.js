'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ServiceUnavailable() {
  const [time, setTime] = useState({ h: '00', m: '00', s: '00' })

  // Countdown to maintenance end — adjust target time as needed
  useEffect(() => {
    const target = new Date()
    target.setHours(4, 0, 0, 0)
    if (target < new Date()) target.setDate(target.getDate() + 1)

    const tick = () => {
      const diff = Math.max(0, target - new Date())
      setTime({
        h: String(Math.floor(diff / 3600000)).padStart(2, '0'),
        m: String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0'),
        s: String(Math.floor((diff % 60000) / 1000)).padStart(2, '0'),
      })
    }
    tick()
    const t = setInterval(tick, 1000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Decorative circles */}
      <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(244,196,48,0.05)', top: '-200px', right: '-150px', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(76,175,80,0.05)', bottom: '-100px', left: '-80px', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '560px', width: '100%', position: 'relative', zIndex: 1 }}>

        {/* Logo */}
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'conic-gradient(#4CAF50, #F5C842, #FF9800, #F44336, #9C27B0, #2196F3, #4CAF50)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>✝️</div>
        </div>

        <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.2)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '7px 20px', borderRadius: '50px', marginBottom: '20px', fontFamily: "'Lato', sans-serif" }}>
          🔧 Service Unavailable
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,5vw,48px)', color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
          We'll Be Back <span style={{ color: 'var(--gold)' }}>Shortly</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Lato', sans-serif", fontSize: '16px', lineHeight: 1.8, marginBottom: '36px' }}>
          We're performing scheduled maintenance to improve your experience. Bupe Foundation will be back online very soon.
        </p>

        {/* Live countdown */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '36px' }}>
          {[{ label: 'Hours', value: time.h }, { label: 'Minutes', value: time.m }, { label: 'Seconds', value: time.s }].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '16px', padding: '20px 24px', minWidth: '80px', border: '1px solid rgba(255,255,255,0.15)' }}>
              <p style={{ margin: 0, fontFamily: "'Playfair Display', serif", fontSize: '40px', color: 'var(--gold)', lineHeight: 1, fontWeight: '700' }}>{item.value}</p>
              <p style={{ margin: '6px 0 0', fontFamily: "'Lato', sans-serif", fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
            </div>
          ))}
        </div>

        {/* Contact during maintenance */}
        <div style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px 24px', marginBottom: '28px', border: '1px solid rgba(255,255,255,0.15)' }}>
          <p style={{ margin: '0 0 12px', fontFamily: "'Lato', sans-serif", fontWeight: '700', fontSize: '14px', color: 'var(--gold)' }}>Need urgent help during maintenance?</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="tel:+260973229312" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Lato', sans-serif", fontSize: '14px', textDecoration: 'none' }}>📞 +260 973 229 312</a>
            <a href="mailto:info@bupefoundation.org" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Lato', sans-serif", fontSize: '14px', textDecoration: 'none' }}>✉️ info@bupefoundation.org</a>
            <a href="https://wa.me/260973229312" target="_blank" rel="noreferrer" style={{ color: 'rgba(255,255,255,0.85)', fontFamily: "'Lato', sans-serif", fontSize: '14px', textDecoration: 'none' }}>💬 WhatsApp</a>
          </div>
        </div>

        <p style={{ color: 'rgba(255,255,255,0.5)', fontFamily: "'Playfair Display', serif", fontSize: '14px', fontStyle: 'italic' }}>
          "Be still, and know that I am God." — Psalm 46:10
        </p>
      </div>
    </div>
  )
}