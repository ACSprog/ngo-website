'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function DonatePage() {
  const [totalRaised, setTotalRaised] = useState(127450)
  const [donorCount, setDonorCount]   = useState(342)
  const [activeTicker, setActiveTicker] = useState(0)

  const recentDonors = [
    { name: 'Sarah M.',   location: 'UK',           amount: 'K1,200', time: '2 mins ago',  flag: '🇬🇧' },
    { name: 'James K.',   location: 'Lusaka',        amount: 'K500',   time: '5 mins ago',  flag: '🇿🇲' },
    { name: 'Anonymous',  location: 'USA',           amount: 'K2,000', time: '12 mins ago', flag: '🇺🇸' },
    { name: 'Grace N.',   location: 'South Africa',  amount: 'K800',   time: '18 mins ago', flag: '🇿🇦' },
    { name: 'David T.',   location: 'Germany',       amount: 'K1,500', time: '25 mins ago', flag: '🇩🇪' },
    { name: 'Ruth B.',    location: 'Canada',        amount: 'K300',   time: '31 mins ago', flag: '🇨🇦' },
  ]

  const impactBreakdown = [
    { pct: 75, label: 'Direct Program Costs', color: '#6B2D8B', desc: 'Education, nutrition, care and healing programs' },
    { pct: 15, label: 'Staff & Operations',   color: '#2E7D32', desc: 'Staff salaries and operational costs' },
    { pct: 7,  label: 'Administration',       color: '#1A4B8C', desc: 'Finance, legal and governance costs' },
    { pct: 3,  label: 'Fundraising',          color: '#D4A017', desc: 'Costs of raising funds for our work' },
  ]

  const impactAmounts = [
    { amount: 'K50',    icon: '🍽️', text: 'feeds one child for a full week' },
    { amount: 'K100',   icon: '📚', text: 'covers school stationery for a full term' },
    { amount: 'K200',   icon: '✏️', text: 'pays for one month of after-school tutoring' },
    { amount: 'K500',   icon: '🎒', text: 'covers a full school uniform and supplies' },
    { amount: 'K1,000', icon: '🎓', text: "sponsors a child's education for one term" },
    { amount: 'K2,000', icon: '🤝', text: 'funds a community feeding program for a month' },
  ]

  const howToDonate = [
    {
      icon: '📱', title: 'Airtel Money',    color: '#E31E24', bg: '#FFF0F0',
      steps: ['Dial *115# on your Airtel line', 'Select "Send Money"', 'Enter our number: +260 XXX XXX XXX', 'Enter your amount and confirm'],
      note: 'Reference: BUPE DONATION',
    },
    {
      icon: '📲', title: 'MTN Mobile Money', color: '#FFC200', bg: '#FFFBF0',
      steps: ['Dial *303# on your MTN line', 'Select "Send Money"', 'Enter our number: +260 XXX XXX XXX', 'Enter your amount and confirm'],
      note: 'Reference: BUPE DONATION',
    },
    {
      icon: '🏦', title: 'Bank Transfer',   color: '#00447C', bg: '#F0F4FF',
      steps: ['Bank: ZANACO', 'Account Name: Bupe Foundation', 'Account Number: XXXXXXXXXX', 'Branch Code: XXXX'],
      note: 'Use your name as reference',
    },
    {
      icon: '🌍', title: 'International / PayPal', color: '#003087', bg: '#F0F4FF',
      steps: ['Send to: donate@bupefoundation.org', 'Or contact us for bank SWIFT details', 'All currencies accepted', 'Receipt issued on request'],
      note: 'Contact us to confirm receipt',
    },
  ]

  useEffect(() => {
    const t = setInterval(() => setActiveTicker(p => (p + 1) % recentDonors.length), 4000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.7) { setTotalRaised(p => p + Math.floor(Math.random() * 500 + 100)); setDonorCount(p => p + 1) }
    }, 8000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>

      {/* HERO */}
      <section style={{ background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 60%, #9C3ABB 100%)', padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(244,196,48,0.06)', top: '-150px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(76,175,80,0.06)', bottom: '-100px', left: '-50px' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.2)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '8px 20px', borderRadius: '50px', marginBottom: '24px', fontFamily: "'Lato', sans-serif" }}>
            ✦ Make a Difference Today
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--white)', lineHeight: '1.1', marginBottom: '20px' }}>
            Donate & <span style={{ color: 'var(--gold)' }}>Change a Life</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', fontFamily: "'Lato', sans-serif", lineHeight: '1.8', marginBottom: '32px' }}>
            Every kwacha goes directly to supporting orphaned and vulnerable children in Zambia. 75% of all donations fund our programs directly.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[{ value: `K${totalRaised.toLocaleString()}`, label: 'Raised This Year', live: true },{ value: `${donorCount}+`, label: 'Donors Worldwide', live: true },{ value: '75%', label: 'To Programs Directly' }].map(stat => (
              <div key={stat.label} style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '16px 24px', textAlign: 'center', position: 'relative' }}>
                {stat.live && <span style={{ position: 'absolute', top: '8px', right: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#4CAF50', display: 'block' }} />}
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: '900', color: 'var(--gold)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontFamily: "'Lato', sans-serif", textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ color: 'var(--gold)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>Donate</span>
          </div>
        </div>
      </section>

      {/* LIVE TICKER */}
      <div style={{ backgroundColor: 'var(--purple)', padding: '14px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ backgroundColor: 'var(--gold)', color: 'var(--dark)', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', fontFamily: "'Lato', sans-serif", whiteSpace: 'nowrap' }}>💛 LIVE</div>
          <div style={{ color: 'var(--white)', fontSize: '14px', fontFamily: "'Lato', sans-serif" }}>
            {recentDonors[activeTicker].flag}{' '}
            <strong style={{ color: 'var(--gold)' }}>{recentDonors[activeTicker].name}</strong>{' '}from{' '}
            <strong style={{ color: 'var(--gold)' }}>{recentDonors[activeTicker].location}</strong>{' '}donated{' '}
            <strong style={{ color: 'var(--gold)' }}>{recentDonors[activeTicker].amount}</strong>{' '}— {recentDonors[activeTicker].time}
          </div>
          <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontFamily: "'Lato', sans-serif", whiteSpace: 'nowrap' }}>{donorCount} donors and counting 💛</div>
        </div>
      </div>

      {/* HOW TO DONATE */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: '12px' }}>Simple & Secure</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', color: 'var(--purple)', marginBottom: '12px' }}>How to Donate</h2>
            <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, var(--purple), var(--gold))', borderRadius: '2px', margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", maxWidth: '560px', margin: '0 auto' }}>
              Choose any of the methods below. After sending your donation, please contact us so we can confirm receipt and send you an official receipt.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginBottom: '50px' }}>
            {howToDonate.map((method, i) => (
              <div key={i} style={{ backgroundColor: 'var(--white)', borderRadius: '20px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(107,45,139,0.08)', transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ backgroundColor: method.bg, padding: '24px', borderBottom: `3px solid ${method.color}`, display: 'flex', gap: '14px', alignItems: 'center' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', backgroundColor: method.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', flexShrink: 0 }}>{method.icon}</div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '20px', margin: 0 }}>{method.title}</h3>
                </div>
                <div style={{ padding: '24px' }}>
                  {method.steps.map((step, j) => (
                    <div key={j} style={{ display: 'flex', gap: '12px', marginBottom: '10px', alignItems: 'flex-start' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', backgroundColor: method.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: '900', fontFamily: "'Lato', sans-serif", flexShrink: 0, marginTop: '1px' }}>{j + 1}</div>
                      <p style={{ margin: 0, fontSize: '14px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", lineHeight: 1.5 }}>{step}</p>
                    </div>
                  ))}
                  <div style={{ marginTop: '16px', backgroundColor: `${method.color}15`, borderRadius: '10px', padding: '10px 14px', borderLeft: `3px solid ${method.color}` }}>
                    <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: method.color, fontFamily: "'Lato', sans-serif" }}>📌 {method.note}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div style={{ background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', borderRadius: '24px', padding: '48px 40px', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>💬</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--white)', fontSize: '28px', marginBottom: '12px' }}>
              Have a Question About Donating?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontFamily: "'Lato', sans-serif", fontSize: '16px', lineHeight: '1.8', marginBottom: '28px', maxWidth: '520px', margin: '0 auto 28px' }}>
              We are happy to assist with any donation — large or small. Contact us and we will guide you through the process and confirm your gift personally.
            </p>
            <Link href="/contact" style={{ display: 'inline-block', backgroundColor: 'var(--gold)', color: 'var(--dark)', padding: '16px 40px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', boxShadow: '0 8px 24px rgba(244,196,48,0.4)' }}>
              💬 Contact Us to Donate →
            </Link>
          </div>
        </div>
      </section>

      {/* IMPACT OF YOUR GIFT */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: '12px' }}>Real Impact</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', color: 'var(--purple)', marginBottom: 0 }}>What Your Gift Does</h2>
            <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, var(--purple), var(--gold))', borderRadius: '2px', margin: '12px auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
            {impactAmounts.map((item, i) => (
              <div key={i} style={{ backgroundColor: 'var(--cream)', borderRadius: '16px', padding: '24px', borderLeft: '4px solid var(--purple)', transition: 'transform 0.25s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '36px', marginBottom: '10px' }}>{item.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: '900', color: 'var(--purple)', marginBottom: '6px' }}>{item.amount}</div>
                <p style={{ fontSize: '14px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE MONEY GOES + RECENT DONORS */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          <div style={{ backgroundColor: 'var(--white)', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(107,45,139,0.08)' }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '22px', marginBottom: '24px' }}>📊 How We Use Your Donation</h4>
            {impactBreakdown.map((item, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", fontWeight: '600' }}>{item.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: '900', color: item.color, fontFamily: "'Playfair Display', serif" }}>{item.pct}%</span>
                </div>
                <div style={{ backgroundColor: 'var(--grey)', borderRadius: '50px', height: '9px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.pct}%`, height: '100%', backgroundColor: item.color, borderRadius: '50px' }} />
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", margin: '4px 0 0' }}>{item.desc}</p>
              </div>
            ))}
            <div style={{ backgroundColor: 'var(--cream)', borderRadius: '10px', padding: '12px', marginTop: '8px' }}>
              <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", lineHeight: '1.6' }}>
                📜 We are independently audited annually. View our <Link href="/impact" style={{ color: 'var(--purple)', fontWeight: '700' }}>financial reports</Link>.
              </p>
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--white)', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 24px rgba(107,45,139,0.08)' }}>
            <h4 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '22px', marginBottom: '24px' }}>💛 Recent Donors</h4>
            {recentDonors.map((donor, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < recentDonors.length - 1 ? '1px solid rgba(107,45,139,0.06)' : 'none' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '18px' }}>{donor.flag}</span>
                  <div>
                    <p style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: 'var(--text)', fontFamily: "'Lato', sans-serif" }}>{donor.name}</p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>{donor.location} · {donor.time}</p>
                  </div>
                </div>
                <span style={{ fontSize: '15px', fontWeight: '900', color: 'var(--green)', fontFamily: "'Playfair Display', serif" }}>{donor.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTHER WAYS TO GIVE */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: '12px' }}>More Ways to Give</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px,4vw,44px)', color: 'var(--purple)', marginBottom: 0 }}>Other Ways to Support</h2>
            <div style={{ width: '60px', height: '4px', background: 'linear-gradient(90deg, var(--purple), var(--gold))', borderRadius: '2px', margin: '12px auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { icon: '🎂', title: 'Birthday Fundraiser', desc: 'Ask friends to donate to Bupe Foundation instead of buying you a gift.',       color: '#FFF8E1', border: '#D4A017' },
              { icon: '🏢', title: 'Corporate Giving',    desc: 'Set up a corporate donation programme or match employee gifts.',               color: '#E8F5E9', border: '#2E7D32' },
              { icon: '📦', title: 'Gifts in Kind',       desc: 'Donate food, clothes, school supplies or equipment directly.',                 color: '#E3F2FD', border: '#1A4B8C' },
              { icon: '📜', title: 'Leave a Legacy',      desc: 'Include Bupe Foundation in your will and leave a lasting impact.',             color: '#F3E5F5', border: '#6B2D8B' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: item.color, borderRadius: '16px', padding: '28px', borderLeft: `4px solid ${item.border}`, transition: 'transform 0.3s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span style={{ fontSize: '40px', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '20px', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '16px' }}>{item.desc}</p>
                <Link href="/contact" style={{ color: item.border, fontWeight: '700', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', borderBottom: `2px solid ${item.border}`, paddingBottom: '2px' }}>
                  Contact Us →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="scripture-band">
        <h2>"Give and it will be given to you — <span>pressed down, shaken together and running over."</span></h2>
        <p>Luke 6:38 — Your generosity returns to you multiplied</p>
      </div>
    </div>
  )
}
