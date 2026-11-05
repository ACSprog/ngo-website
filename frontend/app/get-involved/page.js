'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function GetInvolvedPage() {
  const [activeTab, setActiveTab]     = useState('volunteer')
  const [activeEvent, setActiveEvent] = useState(0)
  const [countdown, setCountdown]     = useState({ days: 0, hours: 0, mins: 0, secs: 0 })

  const volunteerRoles = [
    { icon: '📚', title: 'Teaching & Tutoring',       desc: 'Help children with schoolwork, literacy and numeracy. Perfect for teachers, students and anyone who loves education.', commitment: '4 hrs/week',     skills: 'Teaching, Patience',      spots: 5, color: '#F3E5F5', border: '#6B2D8B' },
    { icon: '🏥', title: 'Medical & Health',           desc: 'Provide health screenings, first aid and health education. Ideal for doctors, nurses and health workers.',              commitment: '2 days/month',   skills: 'Medical background',      spots: 3, color: '#E8F5E9', border: '#2E7D32' },
    { icon: '💆', title: 'Counseling & Support',       desc: 'Offer emotional support and trauma counseling to children and families. For trained counselors and social workers.',     commitment: '3 hrs/week',     skills: 'Counseling, Empathy',     spots: 4, color: '#FFF8E1', border: '#D4A017' },
    { icon: '🍳', title: 'Nutrition & Cooking',        desc: 'Help prepare nutritious meals at our community kitchens. Great for anyone who loves cooking and feeding people.',        commitment: '2 days/week',    skills: 'Cooking, Food handling',  spots: 6, color: '#E3F2FD', border: '#1A4B8C' },
    { icon: '📸', title: 'Media & Communications',     desc: 'Document our work through photography, video and social media. For creatives who want to tell stories of hope.',        commitment: 'Flexible',       skills: 'Photography, Social media',spots: 2, color: '#FCE4EC', border: '#C62828' },
    { icon: '🏗️', title: 'Construction & Maintenance', desc: 'Help build and maintain safe spaces for children. For those skilled in construction, plumbing or electrical work.',     commitment: 'Project-based',  skills: 'Technical skills',        spots: 8, color: '#E8F5E9', border: '#F57C00' },
    { icon: '💻', title: 'IT & Digital Skills',        desc: 'Teach digital literacy, maintain our systems or help with website and data management.',                                commitment: 'Flexible',       skills: 'IT, Programming',         spots: 3, color: '#F3E5F5', border: '#6B2D8B' },
    { icon: '🎨', title: 'Arts & Crafts',              desc: 'Run creative workshops in art, drama, music and dance. Help children express themselves through creativity.',            commitment: '2 hrs/week',     skills: 'Creative arts',           spots: 4, color: '#FFF8E1', border: '#D4A017' },
  ]

  const partnerTypes = [
    { icon: '⛪', title: 'Church Partnership',   desc: 'Partner your congregation with Bupe Foundation. Mobilize volunteers, host fundraisers and pray for our children.',          benefits: ['Monthly prayer updates', 'Volunteer coordination', 'Joint events and outreach', 'Recognition on website'],          color: '#F3E5F5', border: '#6B2D8B' },
    { icon: '🏢', title: 'Corporate Partnership',desc: 'Align your business with a cause that matters. CSR partnerships that create real impact in Zambian communities.',            benefits: ['Brand visibility', 'Employee volunteering programs', 'CSR reporting support', 'Tax deduction certificates'],       color: '#E8F5E9', border: '#2E7D32' },
    { icon: '🌍', title: 'NGO Partnership',       desc: 'Collaborate with us on shared programs, joint funding and complementary services for vulnerable children.',                 benefits: ['Joint program delivery', 'Shared resources', 'Co-funding opportunities', 'Learning exchanges'],                    color: '#E3F2FD', border: '#1A4B8C' },
    { icon: '🏫', title: 'School Partnership',    desc: 'Link your school with Bupe Foundation for student volunteering, donation drives and educational exchange.',                  benefits: ['Student volunteer placements', 'School donation drives', 'Exchange visits', 'Awareness campaigns'],                color: '#FFF8E1', border: '#D4A017' },
  ]

  const membershipTiers = [
    { id: 'friend',   icon: '💛', title: 'Friend of Bupe',  price: 'K50/month',  desc: 'Support our work with a small monthly contribution and stay connected with impact updates.',    perks: ['Monthly newsletter', 'Impact reports', 'Prayer updates', 'Name on website'],                                                                         color: '#FFF8E1', border: '#D4A017' },
    { id: 'champion', icon: '🌟', title: 'Bupe Champion',   price: 'K150/month', desc: 'Go deeper with exclusive behind-the-scenes updates and quarterly calls with our team.',        perks: ['All Friend benefits', 'Quarterly video calls', 'Exclusive story updates', 'Champion certificate', 'Priority event invites'],                        color: '#F3E5F5', border: '#6B2D8B', featured: true },
    { id: 'guardian', icon: '🛡️', title: 'Child Guardian', price: 'K300/month', desc: "Sponsor a specific child's full needs — education, nutrition, care and emotional support.",   perks: ['All Champion benefits', 'Child sponsorship letter', 'Progress reports', 'Birthday card from child', 'Annual visit opportunity'],                   color: '#E8F5E9', border: '#2E7D32' },
  ]

  const events = [
    { title: 'Annual Fundraising Gala 2026', date: 'April 15, 2026',  time: '18:00 – 22:00', location: 'Lusaka Intercontinental Hotel', type: 'Fundraiser', icon: '🎉', desc: 'Our flagship annual event featuring dinner, live music, silent auction and inspiring stories from the children.', spots: 200, registered: 147, color: '#F3E5F5', border: '#6B2D8B', eventDate: new Date('2026-04-15T18:00:00') },
    { title: 'Community Volunteer Day',      date: 'March 8, 2026',   time: '08:00 – 16:00', location: 'Kafue Community Centre',        type: 'Volunteer',  icon: '🤝', desc: 'A full day of hands-on volunteering — cooking, teaching, building and playing with the children.',                 spots: 50,  registered: 38,  color: '#E8F5E9', border: '#2E7D32', eventDate: new Date('2026-03-08T08:00:00') },
    { title: 'Child Awareness Walk',         date: 'May 20, 2026',    time: '07:00 – 10:00', location: 'Lusaka City Centre',            type: 'Awareness',  icon: '🚶', desc: 'Join hundreds of supporters for a 5km awareness walk raising visibility for orphaned children.',                    spots: 500, registered: 210, color: '#E3F2FD', border: '#1A4B8C', eventDate: new Date('2026-05-20T07:00:00') },
    { title: 'Partner Breakfast Meeting',    date: 'March 22, 2026',  time: '08:00 – 10:00', location: 'Lusaka Boardroom',              type: 'Networking', icon: '☕', desc: 'An exclusive breakfast for current and prospective partners to learn about partnership opportunities.',              spots: 30,  registered: 18,  color: '#FFF8E1', border: '#D4A017', eventDate: new Date('2026-03-22T08:00:00') },
  ]

  useEffect(() => {
    const nextEvent = new Date('2026-03-08T08:00:00')
    const timer = setInterval(() => {
      const diff = nextEvent - new Date()
      if (diff <= 0) { clearInterval(timer); return }
      setCountdown({
        days:  Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins:  Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs:  Math.floor((diff % (1000 * 60)) / 1000),
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Reusable contact CTA card
  const ContactCTA = ({ icon, title, desc, subject }) => (
    <div style={{ maxWidth: '640px', margin: '0 auto', backgroundColor: 'var(--cream)', borderRadius: '24px', padding: '40px', border: '2px solid rgba(107,45,139,0.12)', textAlign: 'center' }}>
      <div style={{ fontSize: '52px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '26px', marginBottom: '10px' }}>{title}</h3>
      <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', lineHeight: '1.8', marginBottom: '28px', maxWidth: '480px', margin: '0 auto 28px' }}>{desc}</p>
      <Link href="/contact" style={{ display: 'inline-block', backgroundColor: 'var(--purple)', color: 'white', padding: '16px 40px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', boxShadow: '0 6px 20px rgba(107,45,139,0.3)' }}>
        💬 Contact Us →
      </Link>
    </div>
  )

  return (
    <div>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 60%, #9C3ABB 100%)', padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(244,196,48,0.06)', top: '-150px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(76,175,80,0.06)', bottom: '-100px', left: '-50px' }} />
        <div style={{ maxWidth: '750px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.2)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '8px 20px', borderRadius: '50px', marginBottom: '24px', fontFamily: "'Lato', sans-serif" }}>
            ✦ Join the Mission
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--white)', lineHeight: '1.1', marginBottom: '20px' }}>
            Get <span style={{ color: 'var(--gold)' }}>Involved</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', fontFamily: "'Lato', sans-serif", lineHeight: '1.8', marginBottom: '32px' }}>
            There are many ways to make a difference. Volunteer your time, partner your organization, become a member or join us at an event.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[{ label: '🙋 Volunteer', tab: 'volunteer' },{ label: '🤝 Partner', tab: 'partner' },{ label: '💛 Membership', tab: 'membership' },{ label: '📅 Events', tab: 'events' }].map(item => (
              <button key={item.tab} onClick={() => { setActiveTab(item.tab); document.getElementById('tabs')?.scrollIntoView({ behavior: 'smooth' }) }} style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', color: 'var(--white)', padding: '10px 20px', borderRadius: '50px', fontWeight: '700', fontSize: '14px', fontFamily: "'Lato', sans-serif", cursor: 'pointer' }}>
                {item.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ color: 'var(--gold)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>Get Involved</span>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div style={{ background: 'linear-gradient(90deg, var(--green), #388E3C)', padding: '20px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ value: '85+', label: 'Active Volunteers' },{ value: '12', label: 'Partner Organizations' },{ value: '320+', label: 'Members Worldwide' },{ value: '8', label: 'Annual Events' }].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center', color: 'white' }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: '900', color: 'var(--gold)' }}>{stat.value}</div>
              <div style={{ fontSize: '12px', fontFamily: "'Lato', sans-serif", opacity: 0.85, textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* TABS */}
      <section id="tabs" style={{ backgroundColor: 'var(--white)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '60px' }}>
            {[{ id: 'volunteer', label: '🙋 Volunteer' },{ id: 'partner', label: '🤝 Partner With Us' },{ id: 'membership', label: '💛 Membership' },{ id: 'events', label: '📅 Events' }].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '14px 28px', borderRadius: '50px', border: '2px solid var(--purple)', backgroundColor: activeTab === tab.id ? 'var(--purple)' : 'transparent', color: activeTab === tab.id ? 'var(--white)' : 'var(--purple)', fontWeight: '700', fontSize: '15px', fontFamily: "'Lato', sans-serif", cursor: 'pointer', transition: 'all 0.3s ease' }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* VOLUNTEER TAB */}
          {activeTab === 'volunteer' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <div className="section-label">Give Your Time</div>
                <h2 className="section-title">Volunteer Opportunities</h2>
                <div className="divider" style={{ margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", maxWidth: '550px', margin: '0 auto' }}>
                  We have opportunities for every skill set. Find your fit and make a difference.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                {volunteerRoles.map((role, i) => (
                  <div key={i} style={{ backgroundColor: role.color, borderRadius: '16px', padding: '24px', borderLeft: `4px solid ${role.border}`, transition: 'transform 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span style={{ fontSize: '36px' }}>{role.icon}</span>
                      <span style={{ backgroundColor: role.spots <= 3 ? '#C62828' : '#2E7D32', color: 'white', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '20px', fontFamily: "'Lato', sans-serif" }}>{role.spots} spots left</span>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '18px', marginBottom: '8px' }}>{role.title}</h3>
                    <p style={{ fontSize: '13px', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '12px' }}>{role.desc}</p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: 'var(--text)', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '20px', fontFamily: "'Lato', sans-serif" }}>⏰ {role.commitment}</span>
                      <span style={{ backgroundColor: 'rgba(255,255,255,0.7)', color: 'var(--text)', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '20px', fontFamily: "'Lato', sans-serif" }}>🎯 {role.skills}</span>
                    </div>
                  </div>
                ))}
              </div>
              <ContactCTA
                icon="🙋"
                title="Ready to Volunteer?"
                desc="Get in touch with our volunteer coordinator and tell us which role interests you. We will respond within 48 hours and guide you through the next steps."
              />
            </div>
          )}

          {/* PARTNER TAB */}
          {activeTab === 'partner' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <div className="section-label">Collaborate With Us</div>
                <h2 className="section-title">Partnership Opportunities</h2>
                <div className="divider" style={{ margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", maxWidth: '550px', margin: '0 auto' }}>
                  Together we can do far more than we can alone. Explore partnership opportunities for your organization.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '60px' }}>
                {partnerTypes.map((type, i) => (
                  <div key={i} style={{ backgroundColor: 'var(--white)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(107,45,139,0.08)', transition: 'transform 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ backgroundColor: type.color, padding: '28px', borderBottom: `3px solid ${type.border}` }}>
                      <span style={{ fontSize: '44px', display: 'block', marginBottom: '12px' }}>{type.icon}</span>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '20px', margin: 0 }}>{type.title}</h3>
                    </div>
                    <div style={{ padding: '24px' }}>
                      <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '16px' }}>{type.desc}</p>
                      <h4 style={{ fontFamily: "'Lato', sans-serif", color: 'var(--purple)', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>What You Get</h4>
                      {type.benefits.map((benefit, j) => (
                        <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '6px', alignItems: 'center' }}>
                          <span style={{ color: type.border, fontSize: '12px' }}>✓</span>
                          <span style={{ fontSize: '13px', color: 'var(--text)', fontFamily: "'Lato', sans-serif" }}>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <ContactCTA
                icon="🤝"
                title="Interested in Partnering?"
                desc="Reach out to our partnerships team and tell us about your organisation. We will get back to you within 3 business days to explore how we can work together."
              />
            </div>
          )}

          {/* MEMBERSHIP TAB */}
          {activeTab === 'membership' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <div className="section-label">Join the Family</div>
                <h2 className="section-title">Membership Tiers</h2>
                <div className="divider" style={{ margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", maxWidth: '550px', margin: '0 auto' }}>
                  Become a formal member of the Bupe Foundation family and support our work with a regular monthly contribution.
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '1000px', margin: '0 auto 60px' }}>
                {membershipTiers.map((tier) => (
                  <div key={tier.id} style={{ backgroundColor: tier.featured ? 'var(--purple)' : 'var(--white)', borderRadius: '20px', padding: '32px', border: tier.featured ? '3px solid var(--gold)' : '3px solid transparent', boxShadow: tier.featured ? '0 20px 48px rgba(107,45,139,0.3)' : '0 4px 24px rgba(107,45,139,0.08)', position: 'relative', transform: tier.featured ? 'scale(1.04)' : 'scale(1)', transition: 'transform 0.3s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform = tier.featured ? 'scale(1.06)' : 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = tier.featured ? 'scale(1.04)' : 'translateY(0)'}
                  >
                    {tier.featured && <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--gold)', color: 'var(--dark)', fontSize: '11px', fontWeight: '700', padding: '4px 16px', borderRadius: '20px', fontFamily: "'Lato', sans-serif", whiteSpace: 'nowrap' }}>⭐ MOST POPULAR</div>}
                    <div style={{ fontSize: '44px', marginBottom: '12px' }}>{tier.icon}</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: tier.featured ? 'var(--white)' : 'var(--purple)', fontSize: '22px', marginBottom: '4px' }}>{tier.title}</h3>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: '900', color: tier.featured ? 'var(--gold)' : tier.border, marginBottom: '12px' }}>{tier.price}</div>
                    <p style={{ fontSize: '14px', color: tier.featured ? 'rgba(255,255,255,0.8)' : 'var(--text-light)', lineHeight: '1.7', marginBottom: '20px', fontFamily: "'Lato', sans-serif" }}>{tier.desc}</p>
                    {tier.perks.map((perk, j) => (
                      <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'center' }}>
                        <span style={{ color: tier.featured ? 'var(--gold)' : tier.border, fontSize: '13px' }}>✓</span>
                        <span style={{ fontSize: '13px', color: tier.featured ? 'rgba(255,255,255,0.9)' : 'var(--text)', fontFamily: "'Lato', sans-serif" }}>{perk}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <ContactCTA
                icon="💛"
                title="Ready to Become a Member?"
                desc="Contact us to sign up for membership. Tell us which tier you are interested in and we will send you all the details you need to get started."
              />
            </div>
          )}

          {/* EVENTS TAB */}
          {activeTab === 'events' && (
            <div>
              <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <div className="section-label">Join Us In Person</div>
                <h2 className="section-title">Upcoming Events</h2>
                <div className="divider" style={{ margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", maxWidth: '550px', margin: '0 auto' }}>
                  Meet our team, connect with supporters and experience the Bupe mission firsthand.
                </p>
              </div>
              <div style={{ background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', borderRadius: '24px', padding: '40px', textAlign: 'center', marginBottom: '50px' }}>
                <div style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: '8px' }}>⏰ Next Event In</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--white)', fontSize: '24px', marginBottom: '24px' }}>Community Volunteer Day — March 8, 2026</h3>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  {[{ v: countdown.days, l: 'Days' },{ v: countdown.hours, l: 'Hours' },{ v: countdown.mins, l: 'Mins' },{ v: countdown.secs, l: 'Secs' }].map(item => (
                    <div key={item.l} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 20px', minWidth: '80px', border: '1px solid rgba(255,255,255,0.15)' }}>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: '900', color: 'var(--gold)', lineHeight: 1 }}>{String(item.v).padStart(2, '0')}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: "'Lato', sans-serif" }}>{item.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {events.map((event, i) => (
                  <div key={i} style={{ backgroundColor: 'var(--white)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(107,45,139,0.08)', transition: 'transform 0.3s ease', border: activeEvent === i ? `2px solid ${event.border}` : '2px solid transparent', cursor: 'pointer' }}
                    onClick={() => setActiveEvent(i)}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    <div style={{ backgroundColor: event.color, padding: '24px', borderBottom: `3px solid ${event.border}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <span style={{ fontSize: '40px' }}>{event.icon}</span>
                        <span style={{ backgroundColor: event.border, color: 'white', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', fontFamily: "'Lato', sans-serif" }}>{event.type}</span>
                      </div>
                      <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '18px', marginBottom: '8px' }}>{event.title}</h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        <span style={{ fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>📅 {event.date} • {event.time}</span>
                        <span style={{ fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>📍 {event.location}</span>
                      </div>
                    </div>
                    <div style={{ padding: '20px' }}>
                      <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.6', marginBottom: '16px' }}>{event.desc}</p>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>{event.registered} registered</span>
                          <span style={{ fontSize: '12px', color: event.border, fontWeight: '700', fontFamily: "'Lato', sans-serif" }}>{event.spots - event.registered} spots left</span>
                        </div>
                        <div style={{ backgroundColor: 'var(--grey)', borderRadius: '50px', height: '8px', overflow: 'hidden' }}>
                          <div style={{ width: `${(event.registered / event.spots) * 100}%`, height: '100%', backgroundColor: event.border, borderRadius: '50px' }} />
                        </div>
                      </div>
                      <Link href="/contact" style={{ display: 'block', textAlign: 'center', backgroundColor: event.border, color: 'white', padding: '12px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', fontFamily: "'Lato', sans-serif" }}>
                        Register via Contact →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '40px', padding: '24px', backgroundColor: 'var(--cream)', borderRadius: '16px' }}>
                <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', margin: 0 }}>
                  📅 Want to be notified of future events?{' '}
                  <Link href="/contact" style={{ color: 'var(--purple)', fontWeight: '700', textDecoration: 'none', borderBottom: '2px solid var(--gold)' }}>Get in touch →</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SOCIAL SHARING */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label">Spread the Word</div>
          <h2 className="section-title">Share Our Mission</h2>
          <div className="divider" style={{ margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", marginBottom: '32px' }}>
            You don't have to volunteer to make a difference. Simply sharing our story can change a child's life.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[{ label: 'Share on Facebook', color: '#1877F2', icon: 'f' },{ label: 'Share on Twitter/X', color: '#000000', icon: '𝕏' },{ label: 'Share on WhatsApp', color: '#25D366', icon: '💬' },{ label: 'Copy Link', color: 'var(--purple)', icon: '🔗' }].map(s => (
              <button key={s.label} style={{ backgroundColor: s.color, color: 'white', padding: '12px 20px', borderRadius: '50px', border: 'none', fontWeight: '700', fontSize: '14px', fontFamily: "'Lato', sans-serif", cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'transform 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span>{s.icon}</span> {s.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* DONATE CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--green), #388E3C)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--white)', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>Can't Volunteer Right Now?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', fontFamily: "'Lato', sans-serif", lineHeight: '1.8', marginBottom: '32px' }}>
            A financial gift is just as powerful. Every kwacha directly supports a child's education, nutrition and care.
          </p>
          <Link href="/donate" style={{ backgroundColor: 'var(--gold)', color: 'var(--dark)', padding: '16px 40px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', boxShadow: '0 8px 24px rgba(244,196,48,0.4)' }}>
            ❤️ Donate Now
          </Link>
        </div>
      </section>
    </div>
  )
}
