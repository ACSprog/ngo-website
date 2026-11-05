'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function PrivacyPage() {
  const [activeSection, setActiveSection] = useState('')
  const [readProgress, setReadProgress] = useState(0)

  const lastUpdated = 'February 1, 2026'

  const sections = [
    { id: 'introduction',   title: '1. Introduction' },
    { id: 'collect',        title: '2. What We Collect' },
    { id: 'use',            title: '3. How We Use Your Data' },
    { id: 'share',          title: '4. Who We Share It With' },
    { id: 'retention',      title: '5. How Long We Keep It' },
    { id: 'rights',         title: '6. Your Rights' },
    { id: 'cookies',        title: '7. Cookies' },
    { id: 'children',       title: '8. Children\'s Privacy' },
    { id: 'security',       title: '9. Data Security' },
    { id: 'changes',        title: '10. Changes to This Policy' },
    { id: 'contact',        title: '11. Contact Us' },
  ]

  useEffect(() => {
    const handler = () => {
      const el = document.documentElement
      const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100
      setReadProgress(Math.min(100, progress))

      // Detect which section is active
      for (const s of sections) {
        const el = document.getElementById(s.id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) setActiveSection(s.id)
        }
      }
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const prose = { fontSize: '15px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", lineHeight: '1.85', marginBottom: '16px' }
  const h2s = { fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '22px', marginBottom: '12px', marginTop: '0', paddingTop: '32px' }
  const h3s = { fontFamily: "'Lato', sans-serif", color: 'var(--text)', fontSize: '16px', fontWeight: '700', marginBottom: '8px', marginTop: '20px' }

  return (
    <div>
      {/* Reading progress */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', backgroundColor: 'var(--grey)', zIndex: 9999 }}>
        <div style={{ height: '100%', width: `${readProgress}%`, background: 'linear-gradient(90deg, var(--purple), var(--gold))', transition: 'width 0.1s linear' }} />
      </div>

      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', padding: '70px 24px 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(244,196,48,0.06)', top: '-120px', right: '-80px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.18)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '7px 20px', borderRadius: '50px', marginBottom: '20px', fontFamily: "'Lato', sans-serif" }}>
            🔒 Legal
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,5vw,52px)', color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
            Privacy <span style={{ color: 'var(--gold)' }}>Policy</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Lato', sans-serif", fontSize: '15px', marginBottom: '0' }}>
            Last updated: <strong style={{ color: 'var(--gold)' }}>{lastUpdated}</strong> · Bupe Foundation, Lusaka, Zambia
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: 'var(--gold)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>Privacy Policy</span>
          </div>
        </div>
      </section>

      {/* Main layout */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '48px', alignItems: 'start' }}>

        {/* Sticky sidebar nav */}
        <aside style={{ position: 'sticky', top: '100px' }}>
          <div style={{ backgroundColor: 'var(--cream)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(107,45,139,0.1)' }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold-dark)', marginBottom: '14px' }}>Contents</p>
            {sections.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', borderRadius: '8px', border: 'none', backgroundColor: activeSection === s.id ? '#F3E5F5' : 'transparent', color: activeSection === s.id ? 'var(--purple)' : 'var(--text-light)', fontSize: '13px', fontFamily: "'Lato', sans-serif", fontWeight: activeSection === s.id ? '700' : '400', cursor: 'pointer', marginBottom: '2px', transition: 'all 0.2s ease', borderLeft: activeSection === s.id ? '3px solid var(--purple)' : '3px solid transparent' }}>
                {s.title}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#E8F5E9', borderRadius: '12px', border: '2px solid var(--green)' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", lineHeight: 1.6 }}>
              🛡️ Questions about your data? <Link href="/contact" style={{ color: 'var(--green)', fontWeight: '700', textDecoration: 'none' }}>Contact us →</Link>
            </p>
          </div>
        </aside>

        {/* Document body */}
        <article>

          <div style={{ backgroundColor: '#FFF8E1', borderRadius: '14px', padding: '18px 22px', borderLeft: '4px solid var(--gold)', marginBottom: '36px' }}>
            <p style={{ margin: 0, fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)', lineHeight: 1.7 }}>
              <strong style={{ color: '#D4A017' }}>Summary:</strong> We collect only what we need, use it only to serve you and the children we care for, and never sell your data to anyone.
            </p>
          </div>

          <section id="introduction">
            <h2 style={h2s}>1. Introduction</h2>
            <p style={prose}>Bupe Foundation ("we", "us", "our") is a registered non-governmental organisation based in Lusaka, Zambia. We are committed to protecting the personal information of all individuals who interact with us — including donors, volunteers, partners, website visitors and the families we serve.</p>
            <p style={prose}>This Privacy Policy explains what personal data we collect, why we collect it, how we use it, who we share it with, and what rights you have over your information.</p>
            <p style={prose}>By using our website or submitting your information to us, you agree to the terms of this policy. If you disagree with any part of this policy, please do not use our services.</p>
          </section>

          <section id="collect">
            <h2 style={h2s}>2. What We Collect</h2>
            <p style={prose}>We may collect the following types of personal information:</p>
            <h3 style={h3s}>Information you give us directly</h3>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li>Full name, email address and phone number (from contact and volunteer forms)</li>
              <li>Payment details (processed securely via third-party payment providers)</li>
              <li>Donation amount, frequency and fund preference</li>
              <li>Dedication names and messages (for memorial/honour donations)</li>
              <li>Messages and enquiries you send us</li>
              <li>Newsletter subscription preferences</li>
            </ul>
            <h3 style={h3s}>Information collected automatically</h3>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li>IP address and general location (country/city level)</li>
              <li>Browser type, device type and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or search term</li>
              <li>Cookie identifiers (see Section 7)</li>
            </ul>
            <h3 style={h3s}>Information about children in our programmes</h3>
            <p style={prose}>We collect sensitive information about the children we serve (age, health, education, family background). This information is collected with the explicit consent of their guardians and is treated with the highest levels of confidentiality. It is never published publicly without consent and is stored separately from donor data.</p>
          </section>

          <section id="use">
            <h2 style={h2s}>3. How We Use Your Data</h2>
            <p style={prose}>We use your personal information for the following purposes:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li>Processing donations and sending receipts and tax certificates</li>
              <li>Communicating programme updates, newsletters and impact reports</li>
              <li>Responding to your enquiries, volunteer applications and partnership requests</li>
              <li>Managing recurring donation subscriptions and cancellations</li>
              <li>Legal compliance (NGO registration, financial reporting, auditing)</li>
              <li>Improving our website and communications based on usage analytics</li>
              <li>Sending event invitations and fundraising appeals (with your consent)</li>
            </ul>
            <p style={prose}>We will never use your data for automated decision-making or profiling.</p>
          </section>

          <section id="share">
            <h2 style={h2s}>4. Who We Share It With</h2>
            <p style={prose}>We do not sell, trade or rent your personal information to any third party. We may share limited data with:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li><strong>Payment processors</strong> (e.g., MTN MoMo, Airtel Money, your bank) — to process your donation securely</li>
              <li><strong>Email service providers</strong> — to deliver newsletters and receipts (data is not used for their own marketing)</li>
              <li><strong>Government and regulatory bodies</strong> — as required by Zambian law (e.g., NGO Board, Zambia Revenue Authority)</li>
              <li><strong>Independent auditors</strong> — who review our finances annually and are bound by confidentiality agreements</li>
            </ul>
            <p style={prose}>All third parties we work with are contractually required to handle your data securely and in accordance with this policy.</p>
          </section>

          <section id="retention">
            <h2 style={h2s}>5. How Long We Keep It</h2>
            <p style={prose}>We retain your personal data only as long as necessary for the purposes described in this policy:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li><strong>Donor records:</strong> 7 years (required for financial and tax compliance)</li>
              <li><strong>Volunteer records:</strong> 3 years after the end of your volunteering</li>
              <li><strong>Contact form submissions:</strong> 2 years, or until your request is resolved</li>
              <li><strong>Newsletter subscriptions:</strong> Until you unsubscribe</li>
              <li><strong>Website analytics:</strong> 26 months (Google Analytics default)</li>
            </ul>
          </section>

          <section id="rights">
            <h2 style={h2s}>6. Your Rights</h2>
            <p style={prose}>You have the following rights regarding your personal data:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li><strong>Right of access:</strong> Request a copy of the data we hold about you</li>
              <li><strong>Right to rectification:</strong> Ask us to correct inaccurate data</li>
              <li><strong>Right to erasure:</strong> Ask us to delete your data (where legally permitted)</li>
              <li><strong>Right to restrict processing:</strong> Ask us to limit how we use your data</li>
              <li><strong>Right to object:</strong> Object to us using your data for marketing</li>
              <li><strong>Right to data portability:</strong> Request your data in a machine-readable format</li>
              <li><strong>Right to withdraw consent:</strong> Unsubscribe from communications at any time</li>
            </ul>
            <p style={prose}>To exercise any of these rights, contact us at <strong>privacy@bupefoundation.org</strong>. We will respond within 30 days.</p>
          </section>

          <section id="cookies">
            <h2 style={h2s}>7. Cookies</h2>
            <p style={prose}>Our website uses cookies — small text files stored on your device. We use:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li><strong>Essential cookies:</strong> Required for the website to function (cannot be disabled)</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site (Google Analytics)</li>
              <li><strong>Preference cookies:</strong> Remember your language and settings</li>
            </ul>
            <p style={prose}>You can manage or delete cookies through your browser settings at any time. See our <Link href="/cookie-policy" style={{ color: 'var(--purple)', fontWeight: '700', textDecoration: 'none' }}>Cookie Policy</Link> for full details.</p>
          </section>

          <section id="children">
            <h2 style={h2s}>8. Children's Privacy</h2>
            <p style={prose}>Our website is not directed at children under 13. We do not knowingly collect personal data directly from children under 13 through our website. All data about the children in our care programmes is collected from their adult guardians with explicit written consent, and is handled with the highest level of protection.</p>
            <p style={prose}>If you believe we have collected information from a child without appropriate consent, please contact us immediately at <strong>safeguarding@bupefoundation.org</strong>.</p>
          </section>

          <section id="security">
            <h2 style={h2s}>9. Data Security</h2>
            <p style={prose}>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, loss, destruction or alteration, including:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li>SSL/TLS encryption for all data transmitted through our website</li>
              <li>Secure, access-controlled databases for donor and programme data</li>
              <li>Staff training on data protection and confidentiality</li>
              <li>Regular security reviews of our systems and processes</li>
            </ul>
            <p style={prose}>No method of transmission over the internet is 100% secure. If you become aware of any security breach, please contact us immediately at <strong>security@bupefoundation.org</strong>.</p>
          </section>

          <section id="changes">
            <h2 style={h2s}>10. Changes to This Policy</h2>
            <p style={prose}>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will notify you by email (if you have subscribed) and update the "Last updated" date at the top of this page. We encourage you to review this policy periodically.</p>
          </section>

          <section id="contact">
            <h2 style={h2s}>11. Contact Us</h2>
            <p style={prose}>For any questions about this Privacy Policy or your personal data, please contact:</p>
            <div style={{ backgroundColor: '#F3E5F5', borderRadius: '16px', padding: '24px', border: '2px solid var(--purple)', marginTop: '16px' }}>
              <p style={{ margin: '0 0 8px', fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '18px' }}>Bupe Foundation — Data Controller</p>
              <p style={{ margin: '0 0 4px', fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)' }}>📧 privacy@bupefoundation.org</p>
              <p style={{ margin: '0 0 4px', fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)' }}>📞 +260 97X XXX XXX</p>
              <p style={{ margin: 0, fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)' }}>📍 14 Kafue Road, Mtendere East, Lusaka, Zambia</p>
            </div>
          </section>

          {/* Bottom nav */}
          <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'var(--cream)', borderRadius: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>
              Also read:
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/terms" style={{ backgroundColor: 'var(--purple)', color: 'white', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif" }}>Terms of Use</Link>
              <Link href="/cookie-policy" style={{ backgroundColor: 'var(--white)', color: 'var(--purple)', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", border: '2px solid var(--purple)' }}>Cookie Policy</Link>
              <Link href="/contact" style={{ backgroundColor: 'var(--white)', color: 'var(--purple)', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", border: '2px solid var(--purple)' }}>Contact Us</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}