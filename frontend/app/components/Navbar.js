'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [bannerHeight, setBannerHeight] = useState(44)

useEffect(() => {
  const onVisible  = (e) => setBannerHeight(e.detail ? 44 : 0)
  const onDismiss  = ()  => setBannerHeight(0)
  window.addEventListener('bannerVisible',   onVisible)
  window.addEventListener('bannerDismissed', onDismiss)
  return () => {
    window.removeEventListener('bannerVisible',   onVisible)
    window.removeEventListener('bannerDismissed', onDismiss)
  }
}, [])

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Programs', href: '/programs' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Impact', href: '/impact' },
    { name: 'News', href: '/news' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <>
      <style>{`
        .desktop-links {
          display: none;
          align-items: center;
          gap: 2px;
        }
        .hamburger {
          display: flex;
          flex-direction: column;
          gap: 5px;
          align-items: flex-end;
          background: none;
          border: none;
          cursor: pointer;
          padding: 6px;
        }
        @media (min-width: 768px) {
          .hamburger { display: none !important; }
          .mobile-dropdown { display: none !important; }
          .desktop-links { display: flex !important; }
        }
        @media (max-width: 767px) {
          .desktop-links { display: none !important; }
        }
        .nav-link:hover {
          color: var(--purple) !important;
          background-color: rgba(107,45,139,0.06) !important;
        }
      `}</style>

      <nav style={{
        
        backgroundColor: 'var(--white)',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: scrolled ? '0 2px 20px rgba(107,45,139,0.1)' : 'none',
        transition: 'all 0.3s ease',
        position: 'fixed',
        top: `${bannerHeight}px`, // just below announcement banner height
        left: 0,
        right: 0,
        zIndex: 1000,
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 16px' }}>

          {/* ── Main Bar ── */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: `${120 + bannerHeight}px`,
          }}>

            {/* ── Logo ── */}
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              flexShrink: 0,
            }}>
              <img
                src="/logo.png"
                alt="Bupe Foundation Logo"
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                }}
              />
              <div>
                <p style={{
                  color: 'var(--purple)',
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: '900',
                  fontSize: '28px',
                  lineHeight: '1.2',
                  margin: 0,
                  whiteSpace: 'nowrap',
                }}>Bupe Foundation</p>
                <p style={{
                  color: 'var(--gold-dark)',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: '700',
                  margin: 0,
                  fontFamily: "'Lato', sans-serif",
                  whiteSpace: 'nowrap',
                }}>He Left 99 To Find Me</p>
              </div>
            </Link>

            {/* ── Right Side ── */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>

              {/* ── Desktop Links ── */}
              <div className="desktop-links">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="nav-link"
                    style={{
                      color: 'var(--text)',
                      fontSize: '14px',
                      fontWeight: '600',
                      fontFamily: "'Lato', sans-serif",
                      padding: '8px 10px',
                      borderRadius: '6px',
                      transition: 'all 0.2s ease',
                      textDecoration: 'none',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* ── Donate Button — always visible ── */}
              <Link
                href="/donate"
                style={{
                  backgroundColor: 'var(--gold)',
                  color: 'var(--dark)',
                  padding: '9px 18px',
                  borderRadius: '50px',
                  fontSize: '13px',
                  fontWeight: '700',
                  fontFamily: "'Lato', sans-serif",
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 3px 10px rgba(244,196,48,0.35)',
                }}
              >
                ❤️ Donate
              </Link>

              {/* ── Hamburger — mobile only ── */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="hamburger"
                aria-label="Toggle menu"
              >
                <span style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  backgroundColor: 'var(--purple)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                }} />
                <span style={{
                  display: 'block',
                  width: '16px',
                  height: '2px',
                  backgroundColor: 'var(--purple)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  opacity: isOpen ? 0 : 1,
                }} />
                <span style={{
                  display: 'block',
                  width: '22px',
                  height: '2px',
                  backgroundColor: 'var(--purple)',
                  borderRadius: '2px',
                  transition: 'all 0.3s ease',
                  transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                }} />
              </button>

            </div>
          </div>
        </div>

        {/* ── Mobile Dropdown ── */}
        <div
          className="mobile-dropdown"
          style={{
            maxHeight: isOpen ? '600px' : '0',
            overflow: 'hidden',
            transition: 'max-height 0.4s ease',
            backgroundColor: 'var(--white)',
            borderTop: isOpen ? '1px solid #f0f0f0' : 'none',
          }}>
          <div style={{ padding: '8px 16px 20px' }}>

            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  color: 'var(--text)',
                  fontWeight: '600',
                  fontFamily: "'Lato', sans-serif",
                  padding: '14px 4px',
                  fontSize: '16px',
                  borderBottom: '1px solid #f5f5f5',
                  textDecoration: 'none',
                }}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
                <span style={{ color: 'var(--purple)', fontSize: '18px' }}>›</span>
              </Link>
            ))}

            {/* Mobile Donate Full Width */}
            <Link
              href="/donate"
              style={{
                display: 'block',
                textAlign: 'center',
                backgroundColor: 'var(--gold)',
                color: 'var(--dark)',
                padding: '16px',
                borderRadius: '50px',
                fontWeight: '700',
                fontFamily: "'Lato', sans-serif",
                fontSize: '16px',
                textDecoration: 'none',
                marginTop: '16px',
                boxShadow: '0 4px 14px rgba(244,196,48,0.35)',
              }}
              onClick={() => setIsOpen(false)}
            >
              ❤️ Donate Now
            </Link>

          </div>
        </div>
      </nav>

      {/* ── Spacer ── */}
      <div style={{ height: `${100 + bannerHeight}px` }} />
    </>
  )
}