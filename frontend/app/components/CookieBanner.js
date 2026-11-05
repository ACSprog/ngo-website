'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieBanner() {
  const [visible, setVisible]   = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [prefs, setPrefs]       = useState({ essential: true, analytics: true, preference: true })
  const [saved, setSaved]       = useState(false)

  // Show banner only if consent not yet given
  useEffect(() => {
    const consent = localStorage.getItem('bupe_cookie_consent')
    if (!consent) {
      const t = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('bupe_cookie_consent', JSON.stringify({ essential: true, analytics: true, preference: true, date: new Date().toISOString() }))
    setVisible(false)
  }

  const rejectAll = () => {
    localStorage.setItem('bupe_cookie_consent', JSON.stringify({ essential: true, analytics: false, preference: false, date: new Date().toISOString() }))
    setVisible(false)
  }

  const savePrefs = () => {
    localStorage.setItem('bupe_cookie_consent', JSON.stringify({ ...prefs, date: new Date().toISOString() }))
    setSaved(true)
    setTimeout(() => setVisible(false), 800)
  }

  if (!visible) return null

  return (
    <>
      {/* Backdrop blur on mobile */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundColor: 'rgba(0,0,0,0.3)',
        zIndex: 99990,
        backdropFilter: 'blur(2px)',
      }} onClick={() => setVisible(false)} />

      {/* Banner */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'min(680px, calc(100vw - 32px))',
        backgroundColor: 'var(--white)',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        zIndex: 99991,
        overflow: 'hidden',
        border: '2px solid rgba(107,45,139,0.15)',
        animation: 'slideUp 0.4s ease forwards',
      }}>
        <style>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateX(-50%) translateY(30px); }
            to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
          }
        `}</style>

        {/* Top bar */}
        <div style={{ background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '22px' }}>🍪</span>
            <p style={{ margin: 0, color: 'white', fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: '700' }}>
              We use cookies
            </p>
          </div>
          <button onClick={() => setVisible(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '20px', cursor: 'pointer', lineHeight: 1 }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px' }}>
          <p style={{ margin: '0 0 16px', fontSize: '14px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", lineHeight: 1.75 }}>
            We use cookies to improve your experience, analyse site traffic and personalise content. By clicking <strong>"Accept All"</strong> you consent to our use of cookies.{' '}
            <Link href="/cookie-policy" style={{ color: 'var(--purple)', fontWeight: '700', textDecoration: 'none' }}>
              Learn more →
            </Link>
          </p>

          {/* Expandable preferences */}
          <button onClick={() => setExpanded(e => !e)} style={{ background: 'none', border: 'none', color: 'var(--purple)', fontFamily: "'Lato', sans-serif", fontSize: '13px', fontWeight: '700', cursor: 'pointer', padding: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s ease', display: 'inline-block' }}>›</span>
            {expanded ? 'Hide preferences' : 'Manage preferences'}
          </button>

          {/* Preference toggles */}
          {expanded && (
            <div style={{ backgroundColor: 'var(--cream)', borderRadius: '14px', padding: '16px 18px', marginBottom: '16px' }}>
              {[
                { key: 'essential',  label: '🔒 Essential',   desc: 'Required for the site to work. Cannot be disabled.', required: true  },
                { key: 'analytics',  label: '📊 Analytics',   desc: 'Help us understand how visitors use our site.',       required: false },
                { key: 'preference', label: '⚙️ Preferences', desc: 'Remember your settings and choices.',                required: false },
              ].map(item => (
                <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(107,45,139,0.08)' }}>
                  <div>
                    <p style={{ margin: 0, fontWeight: '700', fontSize: '13px', color: 'var(--text)', fontFamily: "'Lato', sans-serif" }}>{item.label}</p>
                    <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>{item.desc}</p>
                  </div>
                  <div
                    onClick={() => !item.required && setPrefs(p => ({ ...p, [item.key]: !p[item.key] }))}
                    style={{ width: '44px', height: '24px', borderRadius: '12px', backgroundColor: prefs[item.key] ? '#2E7D32' : '#ccc', position: 'relative', cursor: item.required ? 'not-allowed' : 'pointer', transition: 'background 0.3s ease', flexShrink: 0, opacity: item.required ? 0.6 : 1 }}
                  >
                    <div style={{ position: 'absolute', top: '3px', left: prefs[item.key] ? '23px' : '3px', width: '18px', height: '18px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.3s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                  </div>
                </div>
              ))}
              <button onClick={savePrefs} style={{ marginTop: '12px', width: '100%', backgroundColor: saved ? '#2E7D32' : 'var(--purple)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontSize: '13px', fontFamily: "'Lato', sans-serif", fontWeight: '700', cursor: 'pointer', transition: 'background 0.2s ease' }}>
                {saved ? '✅ Preferences Saved!' : 'Save My Preferences'}
              </button>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={rejectAll} style={{ flex: 1, minWidth: '120px', backgroundColor: 'var(--cream)', color: 'var(--text)', border: '2px solid rgba(107,45,139,0.15)', borderRadius: '50px', padding: '11px 16px', fontSize: '14px', fontFamily: "'Lato', sans-serif", fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--purple)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(107,45,139,0.15)'}
            >
              Reject All
            </button>
            <button onClick={acceptAll} style={{ flex: 2, minWidth: '160px', backgroundColor: 'var(--purple)', color: 'white', border: 'none', borderRadius: '50px', padding: '11px 16px', fontSize: '14px', fontFamily: "'Lato', sans-serif", fontWeight: '700', cursor: 'pointer', boxShadow: '0 4px 16px rgba(107,45,139,0.3)', transition: 'opacity 0.2s ease' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              ✅ Accept All Cookies
            </button>
          </div>

          <p style={{ margin: '12px 0 0', fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", textAlign: 'center' }}>
            You can change your preferences at any time in our{' '}
            <Link href="/cookie-policy" style={{ color: 'var(--purple)', fontWeight: '700', textDecoration: 'none' }}>Cookie Policy</Link>
          </p>
        </div>
      </div>
    </>
  )
}