'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState('')
  const [readProgress, setReadProgress] = useState(0)
  const [preferences, setPreferences] = useState({ essential: true, analytics: true, preference: true })
  const [saved, setSaved] = useState(false)

  const lastUpdated = 'February 1, 2026'

  const sections = [
    { id: 'what',       title: '1. What Are Cookies' },
    { id: 'types',      title: '2. Types We Use' },
    { id: 'table',      title: '3. Cookie Details' },
    { id: 'control',    title: '4. Your Control' },
    { id: 'thirdparty', title: '5. Third-Party Cookies' },
    { id: 'changes',    title: '6. Changes' },
    { id: 'contact',    title: '7. Contact Us' },
  ]

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement
      setReadProgress(Math.min(100, (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100))
      for (const s of sections) {
        const el2 = document.getElementById(s.id)
        if (el2 && el2.getBoundingClientRect().top <= 120) setActiveSection(s.id)
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const prose = { fontSize: '15px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", lineHeight: '1.85', marginBottom: '16px' }
  const h2s = { fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '22px', marginBottom: '12px', marginTop: '0', paddingTop: '32px' }

  const cookieTable = [
    { name: '_ga',            type: 'Analytics', provider: 'Google Analytics', purpose: 'Distinguishes unique users', expiry: '2 years', essential: false },
    { name: '_gid',           type: 'Analytics', provider: 'Google Analytics', purpose: 'Distinguishes unique users', expiry: '24 hours', essential: false },
    { name: '_gat',           type: 'Analytics', provider: 'Google Analytics', purpose: 'Throttles request rate',     expiry: '1 minute', essential: false },
    { name: 'session_id',     type: 'Essential', provider: 'Bupe Foundation',  purpose: 'Maintains user session',   expiry: 'Session',  essential: true },
    { name: 'csrf_token',     type: 'Essential', provider: 'Bupe Foundation',  purpose: 'Prevents CSRF attacks',    expiry: 'Session',  essential: true },
    { name: 'cookie_consent', type: 'Preference', provider: 'Bupe Foundation', purpose: 'Stores cookie preferences', expiry: '1 year',   essential: false },
  ]

  const typeColors = { Essential: '#2E7D32', Analytics: '#1A4B8C', Preference: '#D4A017' }

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', backgroundColor: 'var(--grey)', zIndex: 9999 }}>
        <div style={{ height: '100%', width: `${readProgress}%`, background: 'linear-gradient(90deg, var(--gold), var(--purple))', transition: 'width 0.1s linear' }} />
      </div>

      <section style={{ background: 'linear-gradient(135deg, #D4A017 0%, #F5C842 100%)', padding: '70px 24px 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', top: '-120px', right: '-80px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.5)', color: 'white', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '7px 20px', borderRadius: '50px', marginBottom: '20px', fontFamily: "'Lato', sans-serif" }}>
            🍪 Legal
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,5vw,52px)', color: 'white', lineHeight: 1.1, marginBottom: '16px', textShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            Cookie <span style={{ color: 'var(--dark)' }}>Policy</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontFamily: "'Lato', sans-serif", fontSize: '15px' }}>
            Last updated: <strong>{lastUpdated}</strong> · Bupe Foundation, Lusaka, Zambia
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ color: 'white', fontSize: '13px', fontFamily: "'Lato', sans-serif", fontWeight: '700' }}>Cookie Policy</span>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '48px', alignItems: 'start' }}>

        <aside style={{ position: 'sticky', top: '100px' }}>
          <div style={{ backgroundColor: 'var(--cream)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(107,45,139,0.1)' }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold-dark)', marginBottom: '14px' }}>Contents</p>
            {sections.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', borderRadius: '8px', border: 'none', backgroundColor: activeSection === s.id ? '#FFF8E1' : 'transparent', color: activeSection === s.id ? '#D4A017' : 'var(--text-light)', fontSize: '13px', fontFamily: "'Lato', sans-serif", fontWeight: activeSection === s.id ? '700' : '400', cursor: 'pointer', marginBottom: '2px', transition: 'all 0.2s ease', borderLeft: activeSection === s.id ? '3px solid #D4A017' : '3px solid transparent' }}>
                {s.title}
              </button>
            ))}
          </div>

          {/* Inline preference manager */}
          <div style={{ marginTop: '16px', padding: '18px', backgroundColor: 'var(--white)', borderRadius: '14px', border: '2px solid var(--gold)', boxShadow: '0 4px 16px rgba(212,160,23,0.15)' }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#D4A017', marginBottom: '12px' }}>🍪 My Preferences</p>
            {[
              { key: 'essential', label: 'Essential', required: true },
              { key: 'analytics', label: 'Analytics', required: false },
              { key: 'preference', label: 'Preferences', required: false },
            ].map(item => (
              <div key={item.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontFamily: "'Lato', sans-serif", color: 'var(--text)' }}>{item.label}</span>
                <div onClick={() => !item.required && setPreferences(p => ({ ...p, [item.key]: !p[item.key] }))} style={{ width: '40px', height: '22px', borderRadius: '11px', backgroundColor: preferences[item.key] ? '#2E7D32' : 'var(--grey)', position: 'relative', cursor: item.required ? 'not-allowed' : 'pointer', transition: 'background 0.3s ease', opacity: item.required ? 0.6 : 1 }}>
                  <div style={{ position: 'absolute', top: '3px', left: preferences[item.key] ? '21px' : '3px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white', transition: 'left 0.3s ease', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                </div>
              </div>
            ))}
            <button onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }} style={{ width: '100%', marginTop: '8px', backgroundColor: saved ? '#2E7D32' : '#D4A017', color: 'white', border: 'none', borderRadius: '8px', padding: '8px', fontSize: '12px', fontFamily: "'Lato', sans-serif", fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s ease' }}>
              {saved ? '✅ Saved!' : 'Save Preferences'}
            </button>
          </div>
        </aside>

        <article>
          <div style={{ backgroundColor: '#FFF8E1', borderRadius: '14px', padding: '18px 22px', borderLeft: '4px solid #D4A017', marginBottom: '36px' }}>
            <p style={{ margin: 0, fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)', lineHeight: 1.7 }}>
              <strong style={{ color: '#D4A017' }}>Summary:</strong> We use a small number of cookies — some essential for the site to work, others to improve your experience. You can manage your preferences in the panel on the left.
            </p>
          </div>

          <section id="what">
            <h2 style={h2s}>1. What Are Cookies?</h2>
            <p style={prose}>Cookies are small text files that are placed on your device (computer, tablet or phone) when you visit a website. They are widely used to make websites work efficiently, remember your preferences and provide website owners with information about how their site is used.</p>
            <p style={prose}>Cookies do not contain personal information such as your name or payment details. They are specific to the browser and device you are using, and cannot access other files stored on your device.</p>
          </section>

          <section id="types">
            <h2 style={h2s}>2. Types of Cookies We Use</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              {[
                { type: 'Essential', icon: '🔒', color: '#E8F5E9', border: '#2E7D32', desc: 'Required for the website to function. Cannot be disabled. They include login session cookies and security tokens.' },
                { type: 'Analytics', icon: '📊', color: '#E3F2FD', border: '#1A4B8C', desc: 'Help us understand how visitors interact with our site so we can improve it. All data is anonymised.' },
                { type: 'Preference', icon: '⚙️', color: '#FFF8E1', border: '#D4A017', desc: 'Remember your choices such as cookie consent status and language settings.' },
              ].map(t => (
                <div key={t.type} style={{ backgroundColor: t.color, borderRadius: '14px', padding: '20px', borderLeft: `4px solid ${t.border}` }}>
                  <div style={{ fontSize: '28px', marginBottom: '8px' }}>{t.icon}</div>
                  <h3 style={{ fontFamily: "'Lato', sans-serif", color: t.border, fontSize: '15px', fontWeight: '700', marginBottom: '6px' }}>{t.type}</h3>
                  <p style={{ fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="table">
            <h2 style={h2s}>3. Cookie Details</h2>
            <p style={prose}>The following specific cookies are in use on our website:</p>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Lato', sans-serif", fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: 'var(--purple)' }}>
                    {['Cookie Name', 'Type', 'Provider', 'Purpose', 'Expiry'].map(h => (
                      <th key={h} style={{ padding: '12px 14px', color: 'white', textAlign: 'left', fontWeight: '700', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cookieTable.map((row, i) => (
                    <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'var(--cream)' : 'var(--white)' }}>
                      <td style={{ padding: '11px 14px', color: 'var(--text)', fontFamily: 'monospace', fontSize: '12px' }}>{row.name}</td>
                      <td style={{ padding: '11px 14px' }}>
                        <span style={{ backgroundColor: typeColors[row.type], color: 'white', fontSize: '10px', fontWeight: '700', padding: '2px 8px', borderRadius: '20px' }}>{row.type}</span>
                      </td>
                      <td style={{ padding: '11px 14px', color: 'var(--text-light)' }}>{row.provider}</td>
                      <td style={{ padding: '11px 14px', color: 'var(--text)' }}>{row.purpose}</td>
                      <td style={{ padding: '11px 14px', color: 'var(--text-light)', whiteSpace: 'nowrap' }}>{row.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="control">
            <h2 style={h2s}>4. Your Control Over Cookies</h2>
            <p style={prose}>You can manage your cookie preferences in two ways:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li><strong>Through our preference panel</strong> (left sidebar on this page) — save your choices and we will remember them</li>
              <li><strong>Through your browser settings</strong> — most browsers let you view, delete or block cookies. Instructions for popular browsers:</li>
            </ul>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '20px' }}>
              {['Chrome', 'Firefox', 'Safari', 'Edge'].map(browser => (
                <a key={browser} href="#" style={{ display: 'block', padding: '12px', backgroundColor: 'var(--cream)', borderRadius: '10px', textAlign: 'center', textDecoration: 'none', color: 'var(--purple)', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", border: '2px solid rgba(107,45,139,0.1)', transition: 'all 0.2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#F3E5F5'; e.currentTarget.style.borderColor = 'var(--purple)' }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--cream)'; e.currentTarget.style.borderColor = 'rgba(107,45,139,0.1)' }}
                >
                  🌐 {browser}
                </a>
              ))}
            </div>
            <p style={prose}>Please note that disabling essential cookies may affect the functionality of our website. Disabling analytics cookies will not affect your experience but will limit our ability to improve the site.</p>
          </section>

          <section id="thirdparty">
            <h2 style={h2s}>5. Third-Party Cookies</h2>
            <p style={prose}>Some cookies on our website are set by third-party services we use:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li><strong>Google Analytics</strong> (analytics.google.com) — anonymised website usage statistics. <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" style={{ color: 'var(--purple)', fontWeight: '700' }}>Opt out here</a></li>
                          </ul>
            <p style={prose}>These third parties have their own privacy and cookie policies which we encourage you to review.</p>
          </section>

          <section id="changes">
            <h2 style={h2s}>6. Changes to This Policy</h2>
            <p style={prose}>We may update this Cookie Policy from time to time. We will notify you of significant changes by updating the date at the top of this page. We encourage you to review this policy periodically.</p>
          </section>

          <section id="contact">
            <h2 style={h2s}>7. Contact Us</h2>
            <p style={prose}>If you have any questions about our use of cookies, please contact:</p>
            <div style={{ backgroundColor: '#FFF8E1', borderRadius: '16px', padding: '24px', border: '2px solid #D4A017', marginTop: '16px' }}>
              <p style={{ margin: '0 0 8px', fontFamily: "'Playfair Display', serif", color: '#D4A017', fontSize: '18px' }}>Bupe Foundation</p>
              <p style={{ margin: '0 0 4px', fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)' }}>📧 privacy@bupefoundation.org</p>
              <p style={{ margin: '0 0 4px', fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)' }}>📞 +260 97X XXX XXX</p>
            </div>
          </section>

          <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'var(--cream)', borderRadius: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>Also read:</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/privacy" style={{ backgroundColor: 'var(--purple)', color: 'white', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif" }}>Privacy Policy</Link>
              <Link href="/terms" style={{ backgroundColor: 'var(--white)', color: 'var(--purple)', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", border: '2px solid var(--purple)' }}>Terms of Use</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}