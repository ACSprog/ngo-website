'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Home() {

  // ── State ──
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentMoment, setCurrentMoment] = useState(0)
  const [activeDonation, setActiveDonation] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [activeVolunteer, setActiveVolunteer] = useState(0)
  const [countersStarted, setCountersStarted] = useState(false)
  const [counts, setCounts] = useState({ children: 0, communities: 0, hours: 0, meals: 0 })
  const [donationAmount, setDonationAmount] = useState(200)
  const [prayerText, setPrayerText] = useState('')
  const [prayerSubmitted, setPrayerSubmitted] = useState(false)
  const [eventDays, setEventDays] = useState(0)
  const [eventHours, setEventHours] = useState(0)
  const [eventMins, setEventMins] = useState(0)
  const [eventSecs, setEventSecs] = useState(0)
  const [prayers, setPrayers] = useState([
    { name: 'Sarah T.', prayer: 'Lord bless every child at Bupe Foundation with peace and joy.', time: '2 mins ago' },
    { name: 'James K.', prayer: 'Father protect these children and provide for all their needs.', time: '15 mins ago' },
    { name: 'Grace M.', prayer: 'God restore hope and happiness to every orphaned child in Zambia.', time: '1 hr ago' },
  ])
  const [donations] = useState([
    { name: 'John', location: 'UK', amount: 'K500', time: '2s ago' },
    { name: 'Mary', location: 'USA', amount: 'K1,200', time: '1m ago' },
    { name: 'David', location: 'Lusaka', amount: 'K200', time: '3m ago' },
    { name: 'Grace', location: 'South Africa', amount: 'K800', time: '5m ago' },
    { name: 'Peter', location: 'Germany', amount: 'K2,000', time: '8m ago' },
  ])

  // ── Data Arrays ──
  const slides = [
    { badge: 'He Left 99 To Find Me', title: 'Restoring Hope to', highlight: 'Every Child', sub: 'Faith • Love • Community • Zambia' },
    { badge: 'Our Programs', title: 'Education', highlight: 'Changes Everything', sub: 'Helping children access the future they deserve' },
    { badge: 'Get Involved', title: 'Join the', highlight: 'Bupe Family', sub: 'Volunteer • Donate • Partner with us' },
  ]

  const moments = [
    { caption: 'Children receiving school supplies', emoji: '📚' },
    { caption: 'Community feeding program', emoji: '🍽️' },
    { caption: 'Graduation celebration', emoji: '🎓' },
    { caption: 'Worship and prayer session', emoji: '🙏' },
    { caption: 'Volunteer day with the children', emoji: '🤝' },
    { caption: 'Children enjoying playtime', emoji: '😊' },
  ]

  const volunteers = [
    { name: 'Chanda M.', role: 'Teaching volunteer', months: 8, avatar: '👩🏾', quote: 'Serving these children has changed my life forever.' },
    { name: 'Mulenga P.', role: 'Medical volunteer', months: 6, avatar: '👨🏿', quote: 'Every visit reminds me why I became a doctor.' },
    { name: 'Natasha K.', role: 'Counseling volunteer', months: 12, avatar: '👩🏽', quote: 'Watching these children heal is the greatest reward.' },
  ]

  const partners = [
    { name: 'Church Partner 1', icon: '⛪' },
    { name: 'NGO Partner', icon: '🌍' },
    { name: 'School Partner', icon: '🏫' },
    { name: 'Hospital Partner', icon: '🏥' },
    { name: 'Business Partner', icon: '🏢' },
    { name: 'International NGO', icon: '🌐' },
    { name: 'Government Body', icon: '🏛️' },
    { name: 'Media Partner', icon: '📺' },
  ]

  const programs = [
    { icon: '🤝', title: 'Child Care & Protection', desc: 'Safe, loved and provided for every day.', color: '#E8F5E9', border: 'var(--green)' },
    { icon: '📚', title: 'Education Support', desc: 'No child left behind due to school fees.', color: '#F3E5F5', border: 'var(--purple)' },
    { icon: '💛', title: 'Emotional Healing', desc: 'Restoring identity, joy and confidence.', color: '#FFF8E1', border: 'var(--gold-dark)' },
    { icon: '🏘️', title: 'Community Empowerment', desc: 'Stronger families, stronger futures.', color: '#E3F2FD', border: 'var(--blue)' },
    { icon: '🙏', title: 'Spiritual Development', desc: 'Grounded in faith, purpose and love.', color: '#FCE4EC', border: 'var(--red)' },
    { icon: '🍽️', title: 'Nutrition & Health', desc: 'Every child deserves to be healthy.', color: '#E8F5E9', border: 'var(--orange)' },
  ]

  const stats = [
    { key: 'children', label: 'Children Supported', icon: '👶' },
    { key: 'communities', label: 'Communities Reached', icon: '🏘️' },
    { key: 'hours', label: 'Volunteer Hours', icon: '⏰' },
    { key: 'meals', label: 'Meals Provided', icon: '🍽️' },
  ]

  const testimonials = [
    { quote: 'Bupe Foundation has been a true blessing to our community. When we had nothing, they showed up with love, food, and hope.', name: 'Grace M.', role: 'Guardian, Lusaka', avatar: '👩🏾' },
    { quote: 'My children now go to school with smiles on their faces. I never thought this day would come. God bless Bupe Foundation.', name: 'James K.', role: 'Parent, Kafue', avatar: '👨🏿' },
    { quote: "Volunteering with Bupe changed my life. Seeing the joy in these children's eyes is something I will never forget.", name: 'Sarah T.', role: 'Volunteer', avatar: '👩🏽' },
  ]

  const impactData = {
    50: { text: 'provides a child with nutritious meals for one week', icon: '🍽️' },
    100: { text: 'covers school stationery for a full term', icon: '📚' },
    200: { text: 'pays for one month of after-school tutoring', icon: '✏️' },
    500: { text: 'covers a school uniform and supplies for the year', icon: '🎒' },
    1000: { text: "sponsors a child's full education for one term", icon: '🎓' },
    2000: { text: 'funds an entire community feeding program for a month', icon: '🤝' },
  }

  const getImpact = (amount) => {
    const keys = Object.keys(impactData).map(Number).sort((a, b) => a - b)
    for (let i = keys.length - 1; i >= 0; i--) {
      if (amount >= keys[i]) return impactData[keys[i]]
    }
    return { text: "makes a difference in a child's life", icon: '💛' }
  }

  // ── Effects ──
  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setCurrentMoment(p => (p + 1) % moments.length), 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveDonation(p => (p + 1) % donations.length), 3000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveVolunteer(p => (p + 1) % volunteers.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById('counters')
      if (!el) return
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && !countersStarted) {
        setCountersStarted(true)
        animateCount('children', 250)
        animateCount('communities', 18)
        animateCount('hours', 5000)
        animateCount('meals', 12000)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [countersStarted])

  useEffect(() => {
    const eventDate = new Date('2026-04-15T09:00:00')
    const timer = setInterval(() => {
      const diff = eventDate - new Date()
      if (diff <= 0) { clearInterval(timer); return }
      setEventDays(Math.floor(diff / (1000 * 60 * 60 * 24)))
      setEventHours(Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)))
      setEventMins(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
      setEventSecs(Math.floor((diff % (1000 * 60)) / 1000))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const animateCount = (key, target) => {
    let start = 0
    const step = target / 60
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCounts(prev => ({ ...prev, [key]: target }))
        clearInterval(timer)
      } else {
        setCounts(prev => ({ ...prev, [key]: Math.floor(start) }))
      }
    }, 30)
  }

  return (
    <div>

      {/* ════════════════════════════════
          HERO SLIDER
      ════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 50%, #9C3ABB 100%)',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '80px 24px 60px',
      }}>
        <div style={{ position: 'absolute', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(244,196,48,0.06)', top: '-150px', right: '-150px', animation: 'pulse 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(76,175,80,0.06)', bottom: '-100px', left: '-100px', animation: 'pulse 8s ease-in-out infinite reverse' }} />

        <div style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.2)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '12px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '8px 20px', borderRadius: '50px', marginBottom: '30px', fontFamily: "'Lato', sans-serif" }}>
            ✦ {slides[currentSlide].badge}
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 6vw, 68px)', color: 'var(--white)', lineHeight: '1.1', marginBottom: '20px' }}>
            {slides[currentSlide].title}{' '}
            <span style={{ color: 'var(--gold)' }}>{slides[currentSlide].highlight}</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 2vw, 20px)', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', fontFamily: "'Lato', sans-serif" }}>
            {slides[currentSlide].sub}
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/get-involved" style={{ backgroundColor: 'var(--gold)', color: 'var(--dark)', padding: '16px 36px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', boxShadow: '0 8px 24px rgba(244,196,48,0.4)' }}>
              Get Involved 💛
            </Link>
            <Link href="/donate" style={{ backgroundColor: 'transparent', color: 'var(--white)', padding: '16px 36px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', border: '2px solid rgba(255,255,255,0.5)' }}>
              Donate Now ❤️
            </Link>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '50px' }}>
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrentSlide(i)} style={{ width: currentSlide === i ? '28px' : '10px', height: '10px', borderRadius: '5px', backgroundColor: currentSlide === i ? 'var(--gold)' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '30px', left: '50%', transform: 'translateX(-50%)', color: 'rgba(255,255,255,0.5)', fontSize: '24px', animation: 'float 2s ease-in-out infinite' }}>↓</div>
      </section>

      {/* ════════════════════════════════
          LIVE DONATION TICKER
      ════════════════════════════════ */}
      <div style={{ backgroundColor: 'var(--purple)', padding: '14px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: 'var(--gold)', color: 'var(--dark)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', fontFamily: "'Lato', sans-serif", whiteSpace: 'nowrap', letterSpacing: '1px' }}>
            💛 LIVE
          </div>
          <div style={{ color: 'var(--white)', fontSize: '14px', fontFamily: "'Lato', sans-serif" }}>
            <strong style={{ color: 'var(--gold)' }}>{donations[activeDonation].name}</strong>{' '}from{' '}
            <strong style={{ color: 'var(--gold)' }}>{donations[activeDonation].location}</strong>{' '}just donated{' '}
            <strong style={{ color: 'var(--gold)' }}>{donations[activeDonation].amount}</strong>{' '}— {donations[activeDonation].time}
          </div>
          <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
            <Link href="/donate" style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Join them →
            </Link>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════
          MISSION STATEMENT
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '70px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto' }}>
          <div className="section-label">Our Mission</div>
          <h2 className="section-title">Reaching the One the World Forgot</h2>
          <div className="divider" style={{ margin: '0 auto 24px' }} />
          <p style={{ fontSize: '18px', color: 'var(--text)', lineHeight: '1.9', fontFamily: "'Lato', sans-serif", marginBottom: '32px' }}>
            Bupe Foundation exists to restore <strong style={{ color: 'var(--purple)' }}>hope</strong>,{' '}
            <strong style={{ color: 'var(--green)' }}>dignity</strong> and a{' '}
            <strong style={{ color: 'var(--gold-dark)' }}>future</strong> to orphaned and vulnerable children in Zambia — through faith, love and the power of community coming together as one family.
          </p>
          <Link href="/about" style={{ color: 'var(--purple)', fontWeight: '700', fontSize: '15px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', borderBottom: '2px solid var(--gold)', paddingBottom: '2px' }}>
            Learn More About Us →
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════
          IMPACT COUNTERS
      ════════════════════════════════ */}
      <section id="counters" style={{ background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', padding: '70px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', textAlign: 'center' }}>
          {stats.map((stat) => (
            <div key={stat.key} style={{ padding: '30px 20px', borderRadius: '16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontSize: '36px', marginBottom: '10px' }}>{stat.icon}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', fontWeight: '900', color: 'var(--gold)', lineHeight: '1', marginBottom: '8px' }}>
                {counts[stat.key].toLocaleString()}+
              </div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.75)', letterSpacing: '1px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════
          PROGRAMS
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">What We Do</div>
            <h2 className="section-title">Our Programs</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {programs.map((program) => (
              <div key={program.title} style={{ backgroundColor: program.color, borderRadius: '16px', padding: '32px', borderLeft: `4px solid ${program.border}`, transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <div style={{ fontSize: '40px', marginBottom: '16px' }}>{program.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: 'var(--purple)', marginBottom: '10px' }}>{program.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.7', margin: 0 }}>{program.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/programs" className="btn-primary">View All Programs →</Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          SCRIPTURE BAND
      ════════════════════════════════ */}
      <div className="scripture-band">
        <h2>"What you do for the least of these, <span>you do for me."</span></h2>
        <p>Matthew 25:40 — The heartbeat of Bupe Foundation</p>
      </div>

      {/* ════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '750px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label">Voices of Hope</div>
          <h2 className="section-title">What People Say</h2>
          <div className="divider" style={{ margin: '0 auto 40px' }} />
          <div style={{ background: 'linear-gradient(135deg, rgba(107,45,139,0.05), rgba(76,175,80,0.05))', borderRadius: '20px', padding: '40px', borderLeft: '4px solid var(--gold)', position: 'relative', minHeight: '200px' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '80px', color: 'var(--purple)', opacity: 0.1, position: 'absolute', top: '-10px', left: '20px', lineHeight: 1 }}>"</div>
            <p style={{ fontSize: '17px', lineHeight: '1.9', color: 'var(--text)', fontStyle: 'italic', marginBottom: '24px', position: 'relative', zIndex: 1 }}>
              {testimonials[activeTestimonial].quote}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple), var(--green-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
                {testimonials[activeTestimonial].avatar}
              </div>
              <div style={{ textAlign: 'left' }}>
                <p style={{ fontWeight: '700', color: 'var(--purple)', margin: 0, fontSize: '14px' }}>{testimonials[activeTestimonial].name}</p>
                <p style={{ fontSize: '12px', color: 'var(--text-light)', margin: 0 }}>{testimonials[activeTestimonial].role}</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
            {testimonials.map((_, i) => (
              <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: activeTestimonial === i ? '24px' : '10px', height: '10px', borderRadius: '5px', backgroundColor: activeTestimonial === i ? 'var(--purple)' : 'rgba(107,45,139,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PHOTO MOMENTS SLIDER
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--dark)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: '12px' }}>Our Moments</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--white)', fontSize: 'clamp(28px, 4vw, 42px)', marginBottom: 0 }}>
              Life at <span style={{ color: 'var(--gold)' }}>Bupe Foundation</span>
            </h2>
          </div>
          <div style={{ position: 'relative', height: '420px', borderRadius: '20px', overflow: 'hidden', marginBottom: '16px', background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))' }}>
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
              <div style={{ fontSize: '80px' }}>{moments[currentMoment].emoji}</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: 'var(--white)', textAlign: 'center', padding: '0 40px' }}>
                {moments[currentMoment].caption}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>
                📸 Add your photos to /public/images/gallery/
              </p>
            </div>
            <button onClick={() => setCurrentMoment(p => (p - 1 + moments.length) % moments.length)} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>‹</button>
            <button onClick={() => setCurrentMoment(p => (p + 1) % moments.length)} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', width: '44px', height: '44px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', fontSize: '20px', cursor: 'pointer' }}>›</button>
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.7))', padding: '30px 24px 20px' }}>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                {moments.map((_, i) => (
                  <button key={i} onClick={() => setCurrentMoment(i)} style={{ width: currentMoment === i ? '28px' : '10px', height: '10px', borderRadius: '5px', backgroundColor: currentMoment === i ? 'var(--gold)' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '8px' }}>
            {moments.map((m, i) => (
              <div key={i} onClick={() => setCurrentMoment(i)} style={{ height: '70px', borderRadius: '10px', background: currentMoment === i ? 'linear-gradient(135deg, var(--gold-dark), var(--gold))' : 'linear-gradient(135deg, var(--purple-dark), var(--purple))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', cursor: 'pointer', transition: 'all 0.3s ease', border: currentMoment === i ? '2px solid var(--gold)' : '2px solid transparent', opacity: currentMoment === i ? 1 : 0.6 }}>
                {m.emoji}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FUNDRAISING PROGRESS BAR
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label">Current Campaign</div>
          <h2 className="section-title">Help Us Reach 500 Children</h2>
          <div className="divider" style={{ margin: '0 auto 30px' }} />
          <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", marginBottom: '40px' }}>
            We are halfway to our goal of supporting 500 children by end of 2026. Every donation brings us closer.
          </p>
          <div style={{ backgroundColor: 'var(--grey)', borderRadius: '50px', height: '24px', overflow: 'hidden', marginBottom: '16px', position: 'relative' }}>
            <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, var(--purple), var(--gold))', borderRadius: '50px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: '-100%', width: '100%', height: '100%', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)', animation: 'shimmer 2s infinite' }} />
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
            <div style={{ textAlign: 'left' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--purple)', margin: 0, fontWeight: '900' }}>250</p>
              <p style={{ fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", margin: 0 }}>Children Supported</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--gold-dark)', margin: 0, fontWeight: '900' }}>50%</p>
              <p style={{ fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", margin: 0 }}>Of Goal Reached</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--green)', margin: 0, fontWeight: '900' }}>500</p>
              <p style={{ fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", margin: 0 }}>Our 2026 Goal</p>
            </div>
          </div>
          <style>{`@keyframes shimmer { 0% { left: -100%; } 100% { left: 100%; } }`}</style>
          <Link href="/donate" className="btn-gold">💛 Help Us Reach 500 Children</Link>
        </div>
      </section>

      {/* ════════════════════════════════
          IMPACT CALCULATOR
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
          <div className="section-label">See Your Impact</div>
          <h2 className="section-title">Your Gift in Action</h2>
          <div className="divider" style={{ margin: '0 auto 16px' }} />
          <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", marginBottom: '40px' }}>
            Move the slider to see exactly what your donation provides.
          </p>
          <div style={{ backgroundColor: 'var(--white)', borderRadius: '24px', padding: '40px', boxShadow: '0 8px 40px rgba(107,45,139,0.1)' }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '56px', fontWeight: '900', color: 'var(--purple)', marginBottom: '8px' }}>
              K{donationAmount.toLocaleString()}
            </div>
            <input type="range" min="50" max="2000" step="50" value={donationAmount} onChange={e => setDonationAmount(Number(e.target.value))} style={{ width: '100%', marginBottom: '30px', accentColor: 'var(--purple)', height: '6px', cursor: 'pointer' }} />
            <div style={{ backgroundColor: '#F3E5F5', borderRadius: '16px', padding: '24px', borderLeft: '4px solid var(--purple)', marginBottom: '24px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>{getImpact(donationAmount).icon}</div>
              <p style={{ fontSize: '18px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", lineHeight: '1.7', margin: 0 }}>
                <strong style={{ color: 'var(--purple)' }}>K{donationAmount.toLocaleString()}</strong>{' '}{getImpact(donationAmount).text}
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '24px' }}>
              {[50, 200, 500, 1000, 2000].map(amt => (
                <button key={amt} onClick={() => setDonationAmount(amt)} style={{ padding: '8px 16px', borderRadius: '20px', border: '2px solid var(--purple)', backgroundColor: donationAmount === amt ? 'var(--purple)' : 'transparent', color: donationAmount === amt ? 'var(--white)' : 'var(--purple)', fontWeight: '700', fontSize: '14px', fontFamily: "'Lato', sans-serif", cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  K{amt.toLocaleString()}
                </button>
              ))}
            </div>
            <Link href="/donate" className="btn-primary" style={{ display: 'block', textAlign: 'center' }}>
              Donate K{donationAmount.toLocaleString()} Now →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          EVENT COUNTDOWN
      ════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: '12px' }}>⏰ Upcoming Event</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--white)', fontSize: 'clamp(24px, 4vw, 40px)', marginBottom: '8px' }}>Annual Fundraising Gala 2026</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Lato', sans-serif", fontSize: '16px', marginBottom: '40px' }}>📍 Lusaka • April 15, 2026</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', maxWidth: '500px', margin: '0 auto 40px' }}>
            {[{ value: eventDays, label: 'Days' }, { value: eventHours, label: 'Hours' }, { value: eventMins, label: 'Minutes' }, { value: eventSecs, label: 'Seconds' }].map((item) => (
              <div key={item.label} style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '16px', padding: '20px 10px', border: '1px solid rgba(255,255,255,0.15)' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '900', color: 'var(--gold)', lineHeight: 1, marginBottom: '6px' }}>
                  {String(item.value).padStart(2, '0')}
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '2px', fontFamily: "'Lato', sans-serif" }}>{item.label}</div>
              </div>
            ))}
          </div>
          <Link href="/get-involved" style={{ backgroundColor: 'var(--gold)', color: 'var(--dark)', padding: '16px 40px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', boxShadow: '0 8px 24px rgba(244,196,48,0.4)' }}>
            Register for the Event →
          </Link>
        </div>
      </section>

      {/* ════════════════════════════════
          VOLUNTEER SPOTLIGHT
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">Volunteer Spotlight</div>
            <h2 className="section-title">Our Heroes of the Month</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </div>
          <div style={{ backgroundColor: 'var(--cream)', borderRadius: '24px', padding: '40px', display: 'flex', gap: '30px', flexWrap: 'wrap', alignItems: 'center', border: '2px solid rgba(107,45,139,0.1)' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple), var(--purple-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', flexShrink: 0, boxShadow: '0 8px 24px rgba(107,45,139,0.3)' }}>
              {volunteers[activeVolunteer].avatar}
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'inline-block', backgroundColor: 'var(--gold)', color: 'var(--dark)', fontSize: '11px', fontWeight: '700', padding: '4px 12px', borderRadius: '20px', fontFamily: "'Lato', sans-serif", marginBottom: '12px', letterSpacing: '1px' }}>⭐ VOLUNTEER SPOTLIGHT</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '24px', marginBottom: '4px' }}>{volunteers[activeVolunteer].name}</h3>
              <p style={{ color: 'var(--gold-dark)', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                {volunteers[activeVolunteer].role} • {volunteers[activeVolunteer].months} months
              </p>
              <p style={{ fontSize: '16px', color: 'var(--text)', fontStyle: 'italic', lineHeight: '1.7', fontFamily: "'Lato', sans-serif", margin: '0 0 20px' }}>
                "{volunteers[activeVolunteer].quote}"
              </p>
              <Link href="/get-involved" style={{ color: 'var(--purple)', fontWeight: '700', fontSize: '14px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', borderBottom: '2px solid var(--gold)', paddingBottom: '2px' }}>
                Become a Volunteer →
              </Link>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
            {volunteers.map((_, i) => (
              <button key={i} onClick={() => setActiveVolunteer(i)} style={{ width: activeVolunteer === i ? '24px' : '10px', height: '10px', borderRadius: '5px', backgroundColor: activeVolunteer === i ? 'var(--purple)' : 'rgba(107,45,139,0.2)', border: 'none', cursor: 'pointer', transition: 'all 0.3s ease', padding: 0 }} />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PARTNER LOGOS STRIP
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '60px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="section-label">Our Partners</div>
            <h2 className="section-title">Together We Are Stronger</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </div>
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <div style={{ display: 'flex', gap: '20px', animation: 'scrollPartners 20s linear infinite' }}>
              {[...partners, ...partners].map((partner, i) => (
                <div key={i} style={{ flexShrink: 0, backgroundColor: 'var(--white)', borderRadius: '16px', padding: '20px 30px', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 16px rgba(107,45,139,0.06)', border: '1px solid rgba(107,45,139,0.08)', minWidth: '180px' }}>
                  <span style={{ fontSize: '28px' }}>{partner.icon}</span>
                  <span style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text)', fontFamily: "'Lato', sans-serif", whiteSpace: 'nowrap' }}>{partner.name}</span>
                </div>
              ))}
            </div>
          </div>
          <style>{`@keyframes scrollPartners { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
        </div>
      </section>

      {/* ════════════════════════════════
          PRAYER WALL
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">Community Prayer</div>
            <h2 className="section-title">Prayer Wall 🙏</h2>
            <div className="divider" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif" }}>Leave a prayer for the children of Bupe Foundation</p>
          </div>
          {!prayerSubmitted ? (
            <div style={{ backgroundColor: 'var(--cream)', borderRadius: '20px', padding: '32px', marginBottom: '32px', border: '2px solid rgba(107,45,139,0.1)' }}>
              <textarea value={prayerText} onChange={e => setPrayerText(e.target.value)} placeholder="Write your prayer for the children here..." rows={4} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: '2px solid rgba(107,45,139,0.2)', fontSize: '15px', fontFamily: "'Lato', sans-serif", outline: 'none', resize: 'none', marginBottom: '16px', backgroundColor: 'var(--white)', color: 'var(--text)' }} />
              <button onClick={() => { if (!prayerText.trim()) return; setPrayers(prev => [{ name: 'You', prayer: prayerText, time: 'Just now' }, ...prev]); setPrayerSubmitted(true) }} style={{ backgroundColor: 'var(--purple)', color: 'var(--white)', padding: '14px 32px', borderRadius: '50px', border: 'none', fontWeight: '700', fontSize: '15px', fontFamily: "'Lato', sans-serif", cursor: 'pointer', width: '100%' }}>
                🙏 Submit Your Prayer
              </button>
            </div>
          ) : (
            <div style={{ backgroundColor: '#E8F5E9', borderRadius: '20px', padding: '32px', marginBottom: '32px', textAlign: 'center', border: '2px solid var(--green)' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🙏</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--green)', fontSize: '22px', marginBottom: '8px' }}>Thank You for Your Prayer!</h3>
              <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", margin: 0 }}>Your prayer has been added to the wall below.</p>
            </div>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {prayers.slice(0, 4).map((prayer, i) => (
              <div key={i} style={{ backgroundColor: 'var(--cream)', borderRadius: '16px', padding: '20px 24px', borderLeft: '4px solid var(--purple)', position: 'relative' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', color: 'var(--purple)', opacity: 0.1, position: 'absolute', top: '5px', left: '16px', lineHeight: 1 }}>"</div>
                <p style={{ fontSize: '15px', color: 'var(--text)', fontStyle: 'italic', lineHeight: '1.7', marginBottom: '12px', fontFamily: "'Lato', sans-serif", position: 'relative', zIndex: 1 }}>{prayer.prayer}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--purple)', fontFamily: "'Lato', sans-serif" }}>🙏 {prayer.name}</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>{prayer.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          GET INVOLVED CTA
      ════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, var(--green), #388E3C)', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--white)', marginBottom: '16px' }}>Ready to Make a Difference?</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '17px', marginBottom: '40px', fontFamily: "'Lato', sans-serif" }}>
            Every act of love counts. Volunteer, donate or partner with us today.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/donate" style={{ backgroundColor: 'var(--gold)', color: 'var(--dark)', padding: '16px 36px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', boxShadow: '0 8px 24px rgba(244,196,48,0.4)' }}>💛 Donate Now</Link>
            <Link href="/get-involved" style={{ backgroundColor: 'transparent', color: 'var(--white)', padding: '16px 36px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', border: '2px solid rgba(255,255,255,0.6)' }}>🤝 Get Involved</Link>
          </div>
        </div>
      </section>

    </div>
  )
}