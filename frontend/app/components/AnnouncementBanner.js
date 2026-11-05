'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const COLORS = {
  info:    { bg: '#1A4B8C', text: '#ffffff', border: '#1565C0' },
  warning: { bg: '#D4A017', text: '#1a1a1a', border: '#B8860B' },
  success: { bg: '#2E7D32', text: '#ffffff', border: '#1B5E20' },
  urgent:  { bg: '#C62828', text: '#ffffff', border: '#B71C1C' },
}

// ── Edit your announcements here ──────────────────────────────────────────
const ANNOUNCEMENTS = [
  {
    id: 1,
    type: 'info',
    icon: '🎉',
    message: 'Annual Fundraising Gala 2026 — April 15 at Lusaka Intercontinental Hotel. Tables from K2,500.',
    ctaLabel: 'Register Now',
    ctaLink: '/get-involved',
    dismissible: true,
  },
  {
    id: 2,
    type: 'success',
    icon: '💛',
    message: 'We now serve 250+ children across 18 communities in Zambia. Thank you for your support!',
    ctaLabel: 'See Our Impact',
    ctaLink: '/impact',
    dismissible: true,
  },
]
// ─────────────────────────────────────────────────────────────────────────

export default function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState([])
  const [current, setCurrent]     = useState(0)
  const [mounted, setMounted]     = useState(false)

  useEffect(() => {
    setMounted(true)
    try {
      const stored = JSON.parse(localStorage.getItem('bupe_dismissed_banners') || '[]')
      setDismissed(stored)
    } catch {}
  }, [])

  const active = ANNOUNCEMENTS.filter(a => !dismissed.includes(a.id))

  useEffect(() => {
    window.dispatchEvent(new CustomEvent('bannerVisible', { detail: active.length > 0 }))
  }, [dismissed])

  useEffect(() => {
    if (active.length <= 1) return
    const t = setInterval(() => setCurrent(c => (c + 1) % active.length), 6000)
    return () => clearInterval(t)
  }, [active.length])

  const dismiss = (id) => {
    const updated = [...dismissed, id]
    setDismissed(updated)
    try { localStorage.setItem('bupe_dismissed_banners', JSON.stringify(updated)) } catch {}
    window.dispatchEvent(new CustomEvent('bannerDismissed'))
  }

  if (!mounted || active.length === 0) return null

  const ann    = active[current % active.length]
  const colors = COLORS[ann.type] || COLORS.info

  return (
    <div style={{ backgroundColor: colors.bg, borderBottom: `2px solid ${colors.border}`, padding: '9px 16px', position: 'fixed', top: 0, left: 0, right: 0, zIndex: 99998, animation: 'bannerSlide 0.4s ease forwards' }}>
      <style>{`
        @keyframes bannerSlide { from { opacity:0; max-height:0 } to { opacity:1; max-height:60px } }
        @keyframes bannerProgress { from { width:0% } to { width:100% } }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: '16px', flexShrink: 0 }}>{ann.icon || '📢'}</span>
          <p style={{ margin: 0, fontSize: '13px', color: colors.text, fontFamily: "'Lato', sans-serif", fontWeight: '600', lineHeight: 1.4 }}>{ann.message}</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          {ann.ctaLabel && ann.ctaLink && (
            <Link href={ann.ctaLink} style={{ backgroundColor: 'rgba(255,255,255,0.2)', color: colors.text, padding: '4px 12px', borderRadius: '50px', fontSize: '12px', fontWeight: '700', fontFamily: "'Lato', sans-serif", textDecoration: 'none', whiteSpace: 'nowrap', border: '1px solid rgba(255,255,255,0.3)' }}>
              {ann.ctaLabel}
            </Link>
          )}
          {active.length > 1 && (
            <div style={{ display: 'flex', gap: '4px' }}>
              {active.map((_, i) => (
                <div key={i} onClick={() => setCurrent(i)} style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: i === current % active.length ? colors.text : 'rgba(255,255,255,0.3)', cursor: 'pointer' }} />
              ))}
            </div>
          )}
          {ann.dismissible !== false && (
            <button onClick={() => dismiss(ann.id)} style={{ background: 'none', border: 'none', color: colors.text, fontSize: '15px', cursor: 'pointer', opacity: 0.65, lineHeight: 1, padding: '2px 4px' }} aria-label="Dismiss">✕</button>
          )}
        </div>
      </div>

      {active.length > 1 && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', backgroundColor: 'rgba(255,255,255,0.15)' }}>
          <div key={current} style={{ height: '100%', backgroundColor: 'rgba(255,255,255,0.5)', animation: 'bannerProgress 6s linear forwards' }} />
        </div>
      )}
    </div>
  )
}
