'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState('')
  const [readProgress, setReadProgress] = useState(0)

  const lastUpdated = 'February 1, 2026'

  const sections = [
    { id: 'acceptance',    title: '1. Acceptance of Terms' },
    { id: 'use',           title: '2. Permitted Use' },
    { id: 'prohibited',    title: '3. Prohibited Use' },
    { id: 'intellectual',  title: '4. Intellectual Property' },
    { id: 'donations',     title: '5. Donations & Payments' },
    { id: 'volunteer',     title: '6. Volunteering' },
    { id: 'accuracy',      title: '7. Accuracy of Information' },
    { id: 'liability',     title: '8. Limitation of Liability' },
    { id: 'links',         title: '9. Third-Party Links' },
    { id: 'governing',     title: '10. Governing Law' },
    { id: 'changes',       title: '11. Changes to Terms' },
    { id: 'contact',       title: '12. Contact Us' },
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
  const h3s = { fontFamily: "'Lato', sans-serif", color: 'var(--text)', fontSize: '16px', fontWeight: '700', marginBottom: '8px', marginTop: '20px' }

  return (
    <div>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', backgroundColor: 'var(--grey)', zIndex: 9999 }}>
        <div style={{ height: '100%', width: `${readProgress}%`, background: 'linear-gradient(90deg, var(--green), var(--gold))', transition: 'width 0.1s linear' }} />
      </div>

      <section style={{ background: 'linear-gradient(135deg, #1A4B8C, #2E7D32)', padding: '70px 24px 50px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(244,196,48,0.06)', top: '-120px', right: '-80px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '680px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.18)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '7px 20px', borderRadius: '50px', marginBottom: '20px', fontFamily: "'Lato', sans-serif" }}>
            📋 Legal
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,5vw,52px)', color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
            Terms of <span style={{ color: 'var(--gold)' }}>Use</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontFamily: "'Lato', sans-serif", fontSize: '15px' }}>
            Last updated: <strong style={{ color: 'var(--gold)' }}>{lastUpdated}</strong> · Bupe Foundation, Lusaka, Zambia
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: 'var(--gold)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>Terms of Use</span>
          </div>
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 24px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '48px', alignItems: 'start' }}>

        <aside style={{ position: 'sticky', top: '100px' }}>
          <div style={{ backgroundColor: 'var(--cream)', borderRadius: '16px', padding: '20px', border: '1px solid rgba(107,45,139,0.1)' }}>
            <p style={{ fontFamily: "'Lato', sans-serif", fontWeight: '700', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold-dark)', marginBottom: '14px' }}>Contents</p>
            {sections.map(s => (
              <button key={s.id} onClick={() => scrollTo(s.id)} style={{ display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', borderRadius: '8px', border: 'none', backgroundColor: activeSection === s.id ? '#E8F5E9' : 'transparent', color: activeSection === s.id ? '#2E7D32' : 'var(--text-light)', fontSize: '13px', fontFamily: "'Lato', sans-serif", fontWeight: activeSection === s.id ? '700' : '400', cursor: 'pointer', marginBottom: '2px', transition: 'all 0.2s ease', borderLeft: activeSection === s.id ? '3px solid #2E7D32' : '3px solid transparent' }}>
                {s.title}
              </button>
            ))}
          </div>
          <div style={{ marginTop: '16px', padding: '16px', backgroundColor: '#E3F2FD', borderRadius: '12px', border: '2px solid #1A4B8C' }}>
            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", lineHeight: 1.6 }}>
              ⚖️ Questions? <Link href="/contact" style={{ color: '#1A4B8C', fontWeight: '700', textDecoration: 'none' }}>Contact us →</Link>
            </p>
          </div>
        </aside>

        <article>
          <div style={{ backgroundColor: '#E3F2FD', borderRadius: '14px', padding: '18px 22px', borderLeft: '4px solid #1A4B8C', marginBottom: '36px' }}>
            <p style={{ margin: 0, fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)', lineHeight: 1.7 }}>
              <strong style={{ color: '#1A4B8C' }}>Summary:</strong> Use our website for good — to learn, donate, volunteer or partner with us. Don't misuse it. All content belongs to Bupe Foundation unless stated otherwise.
            </p>
          </div>

          <section id="acceptance">
            <h2 style={h2s}>1. Acceptance of Terms</h2>
            <p style={prose}>By accessing or using the Bupe Foundation website (bupefoundation.org) or any of our digital services, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, please do not use our website.</p>
            <p style={prose}>These terms apply to all visitors, donors, volunteers, partners and any other users of our digital services. We reserve the right to update these terms at any time, and your continued use of the website after changes are posted constitutes your acceptance of the updated terms.</p>
          </section>

          <section id="use">
            <h2 style={h2s}>2. Permitted Use</h2>
            <p style={prose}>You may use our website to:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li>Learn about Bupe Foundation's programmes, mission and impact</li>
              <li>Make donations to support our work</li>
              <li>Apply to volunteer or partner with us</li>
              <li>Download publicly available reports and documents</li>
              <li>Subscribe to our newsletter and communications</li>
              <li>Contact our team with legitimate enquiries</li>
              <li>Share our content on social media with appropriate attribution</li>
            </ul>
          </section>

          <section id="prohibited">
            <h2 style={h2s}>3. Prohibited Use</h2>
            <p style={prose}>You may not use our website to:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li>Engage in any unlawful, fraudulent or harmful activity</li>
              <li>Impersonate Bupe Foundation, our staff, volunteers or partners</li>
              <li>Upload or transmit viruses, malware or other harmful code</li>
              <li>Attempt to gain unauthorised access to our systems or databases</li>
              <li>Scrape, harvest or collect user data without written permission</li>
              <li>Use our name, logo or branding without prior written consent</li>
              <li>Reproduce our content commercially without a license</li>
              <li>Submit false, misleading or malicious information through our forms</li>
            </ul>
            <p style={prose}>Violations may result in legal action and permanent suspension of access.</p>
          </section>

          <section id="intellectual">
            <h2 style={h2s}>4. Intellectual Property</h2>
            <p style={prose}>All content on this website — including text, photographs, videos, graphics, logos, reports, programme materials and the website's design — is the intellectual property of Bupe Foundation or our licensed contributors, and is protected by copyright law.</p>
            <p style={prose}>You may share or reproduce content for non-commercial purposes with clear attribution to "Bupe Foundation — bupefoundation.org". Commercial use, reproduction in paid publications, or re-branding of our content requires explicit written permission.</p>
            <p style={prose}>Images of the children we serve are particularly protected. We do not permit reproduction or redistribution of child photographs without explicit consent from us.</p>
          </section>

          <section id="donations">
            <h2 style={h2s}>5. Donations & Payments</h2>
            <p style={prose}>All donations made through our website are made by mobile money, bank transfer or other methods arranged with us directly. To donate, please contact us. By donating, you confirm that:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li>You are the authorised account holder or have permission to use the payment method</li>
              <li>All information provided is accurate and complete</li>
              <li>You understand that all donations are voluntary and generally non-refundable</li>
              <li>Recurring donations can be cancelled by contacting us at any time</li>
            </ul>
            <h3 style={h3s}>Refunds</h3>
            <p style={prose}>If a donation was made in error or fraudulently, please contact us within 7 days at <strong>donations@bupefoundation.org</strong>. We will consider refund requests on a case-by-case basis. We are not responsible for errors made by third-party payment processors.</p>
            <h3 style={h3s}>Fund Allocation</h3>
            <p style={prose}>Donations are used in accordance with the fund allocation described on our Donate page (75% to programmes, 25% to operations). Where a donor designates a specific programme, we will honour that designation where operationally possible. In exceptional circumstances, funds may be reallocated with a similar purpose.</p>
          </section>

          <section id="volunteer">
            <h2 style={h2s}>6. Volunteering</h2>
            <p style={prose}>By applying to volunteer with Bupe Foundation, you agree to:</p>
            <ul style={{ ...prose, paddingLeft: '24px' }}>
              <li>Abide by our Child Protection Policy and Safeguarding Code of Conduct</li>
              <li>Undergo any required background checks or vetting processes</li>
              <li>Attend required orientation and training sessions</li>
              <li>Treat all children, families and staff with dignity and respect</li>
              <li>Maintain confidentiality of all information related to the children in our care</li>
              <li>Not photograph or record children without explicit permission from our team</li>
            </ul>
            <p style={prose}>Violation of any of the above may result in immediate removal from our volunteer programme and, where appropriate, referral to law enforcement.</p>
          </section>

          <section id="accuracy">
            <h2 style={h2s}>7. Accuracy of Information</h2>
            <p style={prose}>We make every effort to ensure that information on our website is accurate, complete and up to date. However, we do not guarantee the accuracy of all content and reserve the right to update or correct information without notice.</p>
            <p style={prose}>Impact statistics, financial data and programme information are based on our best available data at the time of publication. Annual reports contain independently audited figures which supersede any earlier estimates.</p>
          </section>

          <section id="liability">
            <h2 style={h2s}>8. Limitation of Liability</h2>
            <p style={prose}>To the maximum extent permitted by Zambian law, Bupe Foundation shall not be liable for any indirect, incidental, special or consequential damages arising from your use of, or inability to use, our website or services.</p>
            <p style={prose}>We are not responsible for the content of external websites linked from our site, for technical failures or service interruptions, or for actions taken based on information found on our website.</p>
          </section>

          <section id="links">
            <h2 style={h2s}>9. Third-Party Links</h2>
            <p style={prose}>Our website may contain links to third-party websites (such as payment providers, partner organisations and social media platforms). These links are provided for your convenience only. Bupe Foundation does not endorse, control or take responsibility for the content, privacy practices or terms of any third-party website. We encourage you to read the privacy policies of any external sites you visit.</p>
          </section>

          <section id="governing">
            <h2 style={h2s}>10. Governing Law</h2>
            <p style={prose}>These Terms of Use are governed by and construed in accordance with the laws of the Republic of Zambia. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Zambia.</p>
          </section>

          <section id="changes">
            <h2 style={h2s}>11. Changes to Terms</h2>
            <p style={prose}>We may revise these Terms of Use at any time without prior notice. The revised terms will be effective immediately upon posting to our website. We recommend reviewing these terms periodically. Your continued use of the website after changes are posted constitutes acceptance of the revised terms.</p>
          </section>

          <section id="contact">
            <h2 style={h2s}>12. Contact Us</h2>
            <p style={prose}>For any questions about these Terms of Use, please contact:</p>
            <div style={{ backgroundColor: '#E8F5E9', borderRadius: '16px', padding: '24px', border: '2px solid var(--green)', marginTop: '16px' }}>
              <p style={{ margin: '0 0 8px', fontFamily: "'Playfair Display', serif", color: '#2E7D32', fontSize: '18px' }}>Bupe Foundation</p>
              <p style={{ margin: '0 0 4px', fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)' }}>📧 legal@bupefoundation.org</p>
              <p style={{ margin: '0 0 4px', fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)' }}>📞 +260 97X XXX XXX</p>
              <p style={{ margin: 0, fontSize: '14px', fontFamily: "'Lato', sans-serif", color: 'var(--text)' }}>📍 14 Kafue Road, Mtendere East, Lusaka, Zambia</p>
            </div>
          </section>

          <div style={{ marginTop: '48px', padding: '24px', backgroundColor: 'var(--cream)', borderRadius: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>Also read:</p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <Link href="/privacy" style={{ backgroundColor: 'var(--purple)', color: 'white', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif" }}>Privacy Policy</Link>
              <Link href="/cookie-policy" style={{ backgroundColor: 'var(--white)', color: 'var(--purple)', padding: '8px 16px', borderRadius: '50px', textDecoration: 'none', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", border: '2px solid var(--purple)' }}>Cookie Policy</Link>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}