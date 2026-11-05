'use client'
import { useEffect, useState } from 'react'

export default function Loading() {
  const [show, setShow] = useState(true)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 2000)
    const hideTimer = setTimeout(() => setShow(false), 2500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'var(--white)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 0.5s ease',
    }}>

      {/* ── Spinning Rainbow Ring ── */}
      <div style={{ position: 'relative', width: '120px', height: '120px', marginBottom: '24px' }}>

        {/* Spinning rainbow outer ring */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'conic-gradient(var(--green), var(--gold), var(--orange), var(--red), var(--purple), var(--blue), var(--green))',
          animation: 'spin 1.5s linear infinite',
        }} />

        {/* White inner circle */}
        <div style={{
          position: 'absolute',
          top: '8px', left: '8px',
          width: '104px',
          height: '104px',
          borderRadius: '50%',
          backgroundColor: 'var(--white)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}>
        </div>
      </div>

      {/* Foundation name */}
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '24px',
        fontWeight: '900',
        color: 'var(--purple)',
        margin: 0,
        marginBottom: '6px',
        animation: 'fadeDown 0.8s ease forwards',
      }}>
        Bupe Foundation
      </p>
      <p style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: '11px',
        fontWeight: '700',
        letterSpacing: '3px',
        textTransform: 'uppercase',
        color: 'var(--gold-dark)',
        margin: 0,
        marginBottom: '30px',
        animation: 'fadeDown 0.8s ease 0.2s both',
      }}>
        He Left 99 To Find Me
      </p>

      {/* Loading dots */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: 'var(--purple)',
            animation: `bounce 0.8s ease-in-out ${i * 0.2}s infinite`,
          }} />
        ))}
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-10px); opacity: 1; }
        }
      `}</style>
    </div>
  )
}