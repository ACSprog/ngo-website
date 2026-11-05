'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const team = [
  { name: '[Founder Name]',     position: 'Founder & Executive Director', bio: 'A passionate advocate for orphaned children with over 10 years of experience in community development. Founded Bupe Foundation with a vision to restore hope to every forgotten child.',                                    avatar: '👨🏾', email: 'founder@bupefoundation.org' },
  { name: '[Chairperson Name]', position: 'Board Chairperson',             bio: "Brings strong leadership and governance experience to guide the foundation's strategic direction and ensure accountability to all stakeholders.",                                                                          avatar: '👩🏾', email: 'board@bupefoundation.org' },
  { name: '[Programs Manager]', position: 'Programs Manager',              bio: 'Oversees all foundation programs ensuring every child receives quality care, education and emotional support. Dedicated to measurable impact.',                                                                             avatar: '👨🏿', email: 'programs@bupefoundation.org' },
  { name: '[Finance Officer]',  position: 'Finance & Admin Officer',       bio: 'Ensures financial integrity, transparency and accountability in all foundation operations. Manages donor funds with the utmost responsibility.',                                                                            avatar: '👩🏽', email: 'finance@bupefoundation.org' },
  { name: '[Field Officer]',    position: 'Field Officer',                 bio: 'Works directly with children and communities on the ground. The boots on the ground ensuring our programs reach those who need them most.',                                                                                 avatar: '👨🏾', email: 'field@bupefoundation.org' },
  { name: '[Communications]',   position: 'Communications Officer',        bio: 'Tells the stories of hope and transformation. Manages all communications, social media and donor relations for the foundation.',                                                                                           avatar: '👩🏾', email: 'comms@bupefoundation.org' },
]

const milestones = [
  { year: '2018', title: 'Foundation Established', desc: 'Bupe Foundation was officially registered and began serving its first 10 children in Lusaka.' },
  { year: '2019', title: 'First School Program',   desc: 'Launched education support program helping 35 children access quality schooling.' },
  { year: '2020', title: 'Community Kitchens',     desc: 'Started nutrition program providing daily meals to over 80 vulnerable children.' },
  { year: '2021', title: 'Regional Expansion',     desc: 'Extended operations to 3 new communities reaching over 150 children and families.' },
  { year: '2022', title: 'International Partners', desc: 'Partnered with 5 international organizations strengthening our programs and reach.' },
  { year: '2023', title: '250+ Children Served',   desc: 'Milestone achieved — over 250 children supported across 18 communities in Zambia.' },
]

const values = [
  { icon: '✝️', title: 'Faith',     desc: 'Everything we do is rooted in Christ-centered love and biblical values.',              color: '#F3E5F5', border: '#6B2D8B' },
  { icon: '❤️', title: 'Love',      desc: 'Unconditional, sacrificial love is at the center of every interaction.',              color: '#FCE4EC', border: '#C62828' },
  { icon: '🌈', title: 'Unity',     desc: 'People from all nations, churches and cultures coming together as one family.',       color: '#E8F5E9', border: '#2E7D32' },
  { icon: '⭐', title: 'Dignity',   desc: "Every child has value, purpose and dignity in our eyes and God's eyes.",              color: '#FFF8E1', border: '#D4A017' },
  { icon: '🤝', title: 'Integrity', desc: 'We operate with transparency, accountability and clean intentions always.',           color: '#E3F2FD', border: '#1A4B8C' },
  { icon: '🕊️', title: 'Hope',     desc: 'Restoring hope and new beginnings to every child we serve.',                          color: '#E8F5E9', border: '#2E7D32' },
]

const governance = [
  { label: 'Registration Number', value: 'REG/NGO/XXXX/2018',     icon: '📋' },
  { label: 'Registration Body',   value: 'NGO Board of Zambia',    icon: '🏛️' },
  { label: 'Tax Status',          value: 'Non-Profit Organization', icon: '💼' },
  { label: 'Registered Office',   value: 'Lusaka, Zambia',         icon: '📍' },
  { label: 'Year Established',    value: '2018',                   icon: '📅' },
  { label: 'Annual Audit',        value: 'Independently Audited',  icon: '✅' },
]

export default function AboutPage() {
  const [activeTab, setActiveTab]       = useState('mission')
  const [activeMember, setActiveMember] = useState(null)

  return (
    <div>
      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 60%, #9C3ABB 100%)', padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(244,196,48,0.06)', top: '-150px', right: '-100px' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.2)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '8px 20px', borderRadius: '50px', marginBottom: '24px', fontFamily: "'Lato', sans-serif" }}>✦ Who We Are</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--white)', lineHeight: '1.1', marginBottom: '20px' }}>About <span style={{ color: 'var(--gold)' }}>Bupe Foundation</span></h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', fontFamily: "'Lato', sans-serif", lineHeight: '1.8', marginBottom: '32px' }}>A Christ-centered organization dedicated to restoring hope, dignity and a future to orphaned and vulnerable children in Zambia.</p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ color: 'var(--gold)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>About Us</span>
          </div>
        </div>
      </section>

      {/* MISSION / VISION / STORY */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
            {['mission', 'vision', 'story'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '12px 28px', borderRadius: '50px', border: '2px solid var(--purple)', backgroundColor: activeTab === tab ? 'var(--purple)' : 'transparent', color: activeTab === tab ? 'var(--white)' : 'var(--purple)', fontWeight: '700', fontSize: '14px', fontFamily: "'Lato', sans-serif", cursor: 'pointer', transition: 'all 0.3s ease' }}>
                {tab === 'mission' ? '🎯 Our Mission' : tab === 'vision' ? '🔭 Our Vision' : '📖 Our Story'}
              </button>
            ))}
          </div>

          {activeTab === 'mission' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple), var(--purple-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 24px' }}>🎯</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '36px', marginBottom: '20px' }}>Our Mission</h2>
              <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, var(--purple), var(--gold))', borderRadius: '2px', margin: '0 auto 24px' }} />
              <p style={{ fontSize: '18px', color: 'var(--text)', lineHeight: '1.9', maxWidth: '650px', margin: '0 auto', fontFamily: "'Lato', sans-serif" }}>
                To restore <strong style={{ color: 'var(--purple)' }}>hope</strong>, <strong style={{ color: 'var(--green)' }}>dignity</strong> and a <strong style={{ color: 'var(--gold-dark)' }}>future</strong> to orphaned and vulnerable children in Zambia through faith, love and the power of community — guided by the belief that <em>"He Left 99 To Find Me."</em>
              </p>
            </div>
          )}

          {activeTab === 'vision' && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 24px' }}>🔭</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '36px', marginBottom: '20px' }}>Our Vision</h2>
              <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, var(--purple), var(--gold))', borderRadius: '2px', margin: '0 auto 24px' }} />
              <p style={{ fontSize: '18px', color: 'var(--text)', lineHeight: '1.9', maxWidth: '650px', margin: '0 auto', fontFamily: "'Lato', sans-serif" }}>
                A Zambia where <strong style={{ color: 'var(--purple)' }}>every orphaned and vulnerable child</strong> grows up feeling loved, protected and full of purpose — where no child is forgotten, and every life is celebrated as a gift from God.
              </p>
            </div>
          )}

          {activeTab === 'story' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--green), var(--green-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 24px' }}>📖</div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '36px', marginBottom: '20px' }}>Our Story</h2>
                <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, var(--purple), var(--gold))', borderRadius: '2px', margin: '0 auto' }} />
              </div>
              <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '1.9', fontFamily: "'Lato', sans-serif", marginBottom: '20px' }}>Bupe Foundation was born out of a deep burden for the forgotten children of Zambia. Founded in 2018, our journey began with a simple but powerful conviction — that every child, no matter their circumstances, deserves to be loved, protected and given a chance at life.</p>
              <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '1.9', fontFamily: "'Lato', sans-serif", marginBottom: '20px' }}>The name <strong style={{ color: 'var(--purple)' }}>"Bupe"</strong> means <em>gift</em> in Bemba — because we believe every child is a precious gift from God. Our rainbow logo represents the beautiful diversity of people, nations, churches and cultures coming together as one family.</p>
              <p style={{ fontSize: '16px', color: 'var(--text)', lineHeight: '1.9', fontFamily: "'Lato', sans-serif" }}>What started as a small community initiative has grown into a foundation serving over 250 children across 18 communities. We remain committed to our founding principle: <strong style={{ color: 'var(--purple)' }}>"He Left 99 To Find Me"</strong> — reflecting God's heart for the one who is lost, forgotten or left behind.</p>
            </div>
          )}
        </div>
      </section>

      {/* VALUES */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">What Drives Us</div>
            <h2 className="section-title">Our Core Values</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {values.map(value => (
              <div key={value.title} style={{ backgroundColor: value.color, borderRadius: '16px', padding: '32px', borderLeft: `4px solid ${value.border}`, transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>{value.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: 'var(--purple)', marginBottom: '10px' }}>{value.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="section-label">Our Journey</div>
            <h2 className="section-title">History & Milestones</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'linear-gradient(180deg, var(--purple), var(--gold))', transform: 'translateX(-50%)' }} />
            {milestones.map((m, i) => (
              <div key={m.year} style={{ display: 'flex', justifyContent: i % 2 === 0 ? 'flex-start' : 'flex-end', marginBottom: '40px', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '50%', top: '20px', transform: 'translateX(-50%)', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'var(--gold)', border: '3px solid var(--purple)', zIndex: 1 }} />
                <div style={{ width: '100%', maxWidth: '340px', backgroundColor: i % 2 === 0 ? '#F3E5F5' : '#E8F5E9', borderRadius: '16px', padding: '24px', borderLeft: `4px solid ${i % 2 === 0 ? 'var(--purple)' : 'var(--green)'}`, marginLeft: i % 2 === 0 ? '0' : 'auto' }}>
                  <div style={{ display: 'inline-block', backgroundColor: i % 2 === 0 ? 'var(--purple)' : 'var(--green)', color: 'var(--white)', padding: '4px 12px', borderRadius: '20px', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", marginBottom: '10px' }}>{m.year}</div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '18px', marginBottom: '8px' }}>{m.title}</h4>
                  <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">The People Behind The Mission</div>
            <h2 className="section-title">Our Leadership Team</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {team.map((member, i) => (
              <div key={i} onClick={() => setActiveMember(activeMember === i ? null : i)} style={{ backgroundColor: 'var(--white)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(107,45,139,0.08)', cursor: 'pointer', transition: 'transform 0.3s ease, box-shadow 0.3s ease', border: activeMember === i ? '2px solid var(--purple)' : '2px solid transparent' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(107,45,139,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(107,45,139,0.08)' }}
              >
                <div style={{ height: '200px', background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                  <div style={{ fontSize: '72px', opacity: 0.4 }}>{member.avatar}</div>
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'var(--gold)', color: 'var(--dark)', fontSize: '11px', fontWeight: '700', padding: '4px 10px', borderRadius: '20px', fontFamily: "'Lato', sans-serif" }}>
                    {activeMember === i ? 'Hide Bio ↑' : 'View Bio ↓'}
                  </div>
                </div>
                <div style={{ padding: '24px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '20px', marginBottom: '4px' }}>{member.name}</h3>
                  <p style={{ color: 'var(--gold-dark)', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{member.position}</p>
                  <div style={{ maxHeight: activeMember === i ? '200px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '16px' }}>{member.bio}</p>
                    <a href={`mailto:${member.email}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--purple)', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>✉️ {member.email}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GOVERNANCE */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">Accountability & Trust</div>
            <h2 className="section-title">Transparency & Governance</h2>
            <div className="divider" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-light)', fontSize: '16px', maxWidth: '600px', margin: '0 auto', fontFamily: "'Lato', sans-serif" }}>We operate with full transparency and accountability. Below are our registration details and governance documents.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
            <div style={{ backgroundColor: 'var(--cream)', borderRadius: '20px', padding: '32px', border: '1px solid rgba(107,45,139,0.1)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '22px', marginBottom: '24px' }}>📋 Registration Details</h3>
              {governance.map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '12px', padding: '14px 0', borderBottom: '1px solid rgba(107,45,139,0.08)', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px', flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <p style={{ fontSize: '11px', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 2px', fontFamily: "'Lato', sans-serif", fontWeight: '700' }}>{item.label}</p>
                    <p style={{ fontSize: '15px', color: 'var(--text)', margin: 0, fontFamily: "'Lato', sans-serif", fontWeight: '600' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '22px', marginBottom: '24px' }}>📁 Documents & Downloads</h3>
              {[{ title: 'Certificate of Registration', size: 'PDF • 245KB', icon: '📜', color: '#F3E5F5' },{ title: 'Annual Report 2023', size: 'PDF • 1.2MB', icon: '📊', color: '#E8F5E9' },{ title: 'Financial Audit Report', size: 'PDF • 890KB', icon: '💰', color: '#FFF8E1' },{ title: 'Board Constitution', size: 'PDF • 560KB', icon: '⚖️', color: '#E3F2FD' },{ title: 'Child Protection Policy', size: 'PDF • 320KB', icon: '🛡️', color: '#FCE4EC' }].map(doc => (
                <a key={doc.title} href="#" style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', backgroundColor: doc.color, borderRadius: '12px', marginBottom: '12px', textDecoration: 'none', transition: 'transform 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateX(6px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateX(0)'}
                >
                  <span style={{ fontSize: '28px' }}>{doc.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text)', margin: '0 0 2px', fontFamily: "'Lato', sans-serif" }}>{doc.title}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0, fontFamily: "'Lato', sans-serif" }}>{doc.size}</p>
                  </div>
                  <span style={{ color: 'var(--purple)', fontSize: '18px' }}>⬇</span>
                </a>
              ))}
              <div style={{ marginTop: '24px', padding: '20px', background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', borderRadius: '16px' }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', marginBottom: '8px', color: 'var(--gold)' }}>🏛️ Board of Governors</p>
                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', fontFamily: "'Lato', sans-serif", lineHeight: '1.7', margin: '0 0 12px' }}>Our foundation is governed by an independent board ensuring strategic oversight, financial accountability and ethical operations.</p>
                <Link href="/contact" style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Contact the Board →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="scripture-band">
        <h2>"He Left 99 To <span>Find Me."</span></h2>
        <p>The story that drives everything we do at Bupe Foundation</p>
      </div>

      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '36px', marginBottom: '16px' }}>Join Our Family</h2>
          <p style={{ color: 'var(--text-light)', fontSize: '17px', fontFamily: "'Lato', sans-serif", lineHeight: '1.8', marginBottom: '32px' }}>Whether you volunteer, donate or partner — you become part of something bigger than yourself.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/get-involved" className="btn-primary">🤝 Get Involved</Link>
            <Link href="/donate" className="btn-gold">💛 Donate Now</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
