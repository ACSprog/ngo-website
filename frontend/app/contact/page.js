'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

export default function ContactPage() {

  // ── State ──
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', category: '', message: '', urgent: false,
  })
  const [submitted, setSubmitted]     = useState(false)
  const [submitting, setSubmitting]   = useState(false)
  const [activeOffice, setActiveOffice] = useState(0)
  const [activeFaq, setActiveFaq]     = useState(null)
  const [chatOpen, setChatOpen]       = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { from: 'bot', text: 'Hi! 👋 Welcome to Bupe Foundation. How can we help you today?' }
  ])
  const [chatInput, setChatInput]     = useState('')
  const [charCount, setCharCount]     = useState(0)
  const [officeHours, setOfficeHours] = useState({ open: false, label: '' })
  const [copyToast, setCopyToast]     = useState('')
  const chatEndRef = useRef(null)

  const MAX_CHARS = 1000

  // ── Data ──
  const offices = [
    {
      name:    'Head Office — Lusaka',
      address: '14 Kafue Road, Mtendere East, Lusaka, Zambia',
      phone:   '+260 97X XXX XXX',
      email:   'info@bupefoundation.org',
      hours:   'Mon–Fri: 08:00–17:00 · Sat: 09:00–13:00',
      mapEmbed:'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3846.12!2d28.3228!3d-15.4167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDI1JzAwLjAiUyAyOMKwMTknMjIuMSJF!5e0!3m2!1sen!2szm!4v1',
      icon:    '🏢',
      color:   '#F3E5F5',
      border:  '#6B2D8B',
      primary: true,
    },
    {
      name:    'Field Office — Ndola',
      address: '8 Broadway Avenue, Ndola, Copperbelt Province',
      phone:   '+260 96X XXX XXX',
      email:   'ndola@bupefoundation.org',
      hours:   'Mon–Fri: 08:00–16:30',
      icon:    '🏗️',
      color:   '#E3F2FD',
      border:  '#1A4B8C',
      primary: false,
    },
    {
      name:    'Field Office — Livingstone',
      address: '3 Mosi-oa-Tunya Road, Livingstone, Southern Province',
      phone:   '+260 95X XXX XXX',
      email:   'livingstone@bupefoundation.org',
      hours:   'Mon–Fri: 08:00–16:30',
      icon:    '🌊',
      color:   '#E8F5E9',
      border:  '#2E7D32',
      primary: false,
    },
  ]

  const categories = [
    { id: 'general',     label: '💬 General Enquiry',       desc: 'Any question not covered below' },
    { id: 'donation',    label: '💛 Donation Support',       desc: 'Help with payments or receipts' },
    { id: 'volunteer',   label: '🙋 Volunteering',           desc: 'Join us as a volunteer' },
    { id: 'partnership', label: '🤝 Partnership',            desc: 'Organisations wanting to partner' },
    { id: 'media',       label: '📸 Media & Press',          desc: 'Journalists and content creators' },
    { id: 'prayer',      label: '🙏 Prayer Request',         desc: 'Share a personal prayer need' },
    { id: 'complaint',   label: '⚠️ Concern / Complaint',    desc: 'Safeguarding or programme concerns' },
  ]

  const socials = [
    { name: 'Facebook',   handle: '@BupeFoundationZambia', icon: '📘', color: '#1877F2', url: '#', followers: '4.2K' },
    { name: 'Instagram',  handle: '@bupefoundation',       icon: '📷', color: '#E1306C', url: '#', followers: '2.8K' },
    { name: 'Twitter/X',  handle: '@BupeFoundation',       icon: '🐦', color: '#000000', url: '#', followers: '1.1K' },
    { name: 'YouTube',    handle: 'Bupe Foundation',        icon: '▶️', color: '#FF0000', url: '#', followers: '890' },
    { name: 'WhatsApp',   handle: '+260 97X XXX XXX',       icon: '💬', color: '#25D366', url: '#', followers: 'Chat now' },
    { name: 'LinkedIn',   handle: 'Bupe Foundation',        icon: '💼', color: '#0077B5', url: '#', followers: '620' },
  ]

  const faqs = [
    { q: 'How do I make a donation?',
      a: 'You can donate via our Donate page using Airtel Money, MTN MoMo, bank transfer, Visa/Mastercard, PayPal, or Western Union. All payments are secure and you will receive an instant receipt.' },
    { q: 'Can I sponsor a specific child?',
      a: 'Yes! Our Child Guardian membership tier (K300/month) allows you to sponsor a specific child\'s full needs — education, nutrition, care and emotional support. You receive progress reports and letters.' },
    { q: 'How do I volunteer?',
      a: 'Visit our Get Involved page and fill in the volunteer application form. We have opportunities in teaching, health, counselling, cooking, media, construction, IT and arts. We respond within 48 hours.' },
    { q: 'Are donations tax-deductible?',
      a: 'Yes. Bupe Foundation is a registered NGO in Zambia. We issue official receipts and tax certificates for all donations. For international donors, deductibility depends on your country\'s laws.' },
    { q: 'Where does my donation go?',
      a: 'We maintain a strict 75/25 allocation: 75% goes directly to programme delivery and 25% to operations and administration. Our finances are independently audited annually — full reports are on the Impact page.' },
    { q: 'Can my church or company partner with you?',
      a: 'Absolutely. We have formal partnership structures for churches, corporates, schools and NGOs. Visit Get Involved → Partner With Us, or contact partnerships@bupefoundation.org directly.' },
    { q: 'I have a safeguarding concern — who do I contact?',
      a: 'Please contact our designated safeguarding officer immediately at safeguarding@bupefoundation.org or call +260 97X XXX XXX. All concerns are treated confidentially and investigated urgently.' },
    { q: 'Can I visit your programmes in person?',
      a: 'We welcome visits! Please contact us at least one week in advance so we can arrange a proper visit that is safe and respectful for the children. Email info@bupefoundation.org to arrange.' },
  ]

  const botReplies = {
    donate:       '💛 To donate, visit our Donate page at /donate. We accept Airtel Money, MTN, bank transfer, Visa/Mastercard and PayPal!',
    volunteer:    '🙋 We\'d love your help! Visit /get-involved and fill in the volunteer application. We\'ll reply within 48 hours.',
    partner:      '🤝 We have great partnership opportunities for churches, companies and NGOs. Visit /get-involved or email partnerships@bupefoundation.org.',
    report:       '📊 Our annual reports and impact data are all on the Impact & Reports page at /impact.',
    child:        '👶 We care for over 250 children across 18 communities. You can sponsor a child via our membership programme at /get-involved.',
    location:     '📍 Our head office is at 14 Kafue Road, Mtendere East, Lusaka. We also have field offices in Ndola and Livingstone.',
    phone:        '📞 You can call us on +260 97X XXX XXX (Lusaka Head Office), Mon–Fri 8am–5pm.',
    email:        '📧 Our main email is info@bupefoundation.org. We reply within 24 hours.',
    whatsapp:     '💬 You can WhatsApp us on +260 97X XXX XXX — look for the floating chat button on the website!',
    event:        '📅 Our next event is the Community Volunteer Day on March 8, 2026. Register at /get-involved.',
    gala:         '🎉 Our Annual Fundraising Gala is on April 15, 2026 at the Lusaka Intercontinental Hotel. Tables available at /get-involved.',
    default:      '😊 Thanks for your message! Our team will get back to you shortly. You can also email info@bupefoundation.org for a faster response.',
  }

  const getBotReply = (input) => {
    const low = input.toLowerCase()
    if (low.includes('donat') || low.includes('pay') || low.includes('money') || low.includes('kwacha')) return botReplies.donate
    if (low.includes('volunteer') || low.includes('help') || low.includes('serve')) return botReplies.volunteer
    if (low.includes('partner') || low.includes('church') || low.includes('company') || low.includes('corporate')) return botReplies.partner
    if (low.includes('report') || low.includes('impact') || low.includes('annual')) return botReplies.report
    if (low.includes('child') || low.includes('sponsor') || low.includes('kid') || low.includes('orphan')) return botReplies.child
    if (low.includes('locat') || low.includes('address') || low.includes('where') || low.includes('office')) return botReplies.location
    if (low.includes('phone') || low.includes('call') || low.includes('number')) return botReplies.phone
    if (low.includes('email') || low.includes('mail')) return botReplies.email
    if (low.includes('whatsapp') || low.includes('chat') || low.includes('message')) return botReplies.whatsapp
    if (low.includes('event') || low.includes('walk') || low.includes('breakfast')) return botReplies.event
    if (low.includes('gala') || low.includes('fundrais')) return botReplies.gala
    return botReplies.default
  }

  const sendChat = () => {
    if (!chatInput.trim()) return
    const userMsg = { from: 'user', text: chatInput }
    setChatMessages(p => [...p, userMsg])
    setChatInput('')
    setTimeout(() => {
      const reply = { from: 'bot', text: getBotReply(chatInput) }
      setChatMessages(p => [...p, reply])
    }, 800)
  }

  // Office hours check
  useEffect(() => {
    const now = new Date()
    const day = now.getDay() // 0=Sun, 6=Sat
    const hour = now.getHours()
    if (day === 0) { setOfficeHours({ open: false, label: 'Closed today — Sunday' }) }
    else if (day === 6) {
      setOfficeHours({ open: hour >= 9 && hour < 13, label: hour >= 9 && hour < 13 ? 'Open now — Sat 09:00–13:00' : 'Closed — Saturday hours: 09:00–13:00' })
    } else {
      setOfficeHours({ open: hour >= 8 && hour < 17, label: hour >= 8 && hour < 17 ? 'Open now — Mon–Fri 08:00–17:00' : 'Closed — Opens Mon–Fri at 08:00' })
    }
  }, [])

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message || !form.category) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1400)
  }

  const copyToClipboard = (text, label) => {
    if (navigator.clipboard) navigator.clipboard.writeText(text)
    setCopyToast(label)
    setTimeout(() => setCopyToast(''), 2000)
  }

  const inp = {
    width: '100%', padding: '13px 16px', borderRadius: '10px',
    border: '2px solid rgba(107,45,139,0.15)', fontSize: '14px',
    fontFamily: "'Lato', sans-serif", outline: 'none',
    backgroundColor: 'var(--white)', color: 'var(--text)',
    boxSizing: 'border-box', marginBottom: '16px', display: 'block',
  }
  const lbl = {
    display: 'block', fontSize: '12px', fontWeight: '700',
    color: 'var(--purple)', fontFamily: "'Lato', sans-serif",
    marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px',
  }

  // ── SUCCESS STATE ──
  if (submitted) {
    const cat = categories.find(c => c.id === form.category)
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '560px', width: '100%', backgroundColor: 'var(--white)', borderRadius: '32px', padding: '60px 40px', textAlign: 'center', boxShadow: '0 20px 60px rgba(107,45,139,0.12)' }}>
          <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple), var(--green))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', margin: '0 auto 24px' }}>✅</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '30px', marginBottom: '12px' }}>Message Sent!</h2>
          <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '16px', lineHeight: 1.8, marginBottom: '16px' }}>
            Thank you, <strong style={{ color: 'var(--purple)' }}>{form.name}</strong>. We have received your{' '}
            <strong style={{ color: 'var(--purple)' }}>{cat?.label.replace(/[^\w\s]/g,'').trim()}</strong>{' '}and will reply to{' '}
            <strong style={{ color: 'var(--purple)' }}>{form.email}</strong> within 24 hours.
          </p>
          {form.urgent && (
            <div style={{ backgroundColor: '#FFF8E1', borderRadius: '12px', padding: '12px 16px', marginBottom: '20px', border: '2px solid var(--gold)' }}>
              <p style={{ margin: 0, fontSize: '13px', fontFamily: "'Lato', sans-serif", color: 'var(--gold-dark)', fontWeight: '700' }}>
                ⚡ Urgent — our team has been notified and will respond within 2 hours.
              </p>
            </div>
          )}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ backgroundColor: 'var(--purple)', color: 'white', padding: '12px 24px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px' }}>Back to Home</Link>
            <button onClick={() => { setSubmitted(false); setForm({ name:'', email:'', phone:'', subject:'', category:'', message:'', urgent:false }) }} style={{ backgroundColor: 'transparent', color: 'var(--purple)', padding: '12px 24px', borderRadius: '50px', border: '2px solid var(--purple)', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', cursor: 'pointer' }}>Send Another</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>

      {/* ════ COPY TOAST ════ */}
      {copyToast && (
        <div style={{ position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--dark)', color: 'white', padding: '12px 24px', borderRadius: '50px', fontSize: '14px', fontFamily: "'Lato', sans-serif", fontWeight: '700', zIndex: 9999, whiteSpace: 'nowrap', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          ✅ {copyToast} copied!
        </div>
      )}

      {/* ════ LIVE CHAT WIDGET ════ */}
      <div style={{ position: 'fixed', bottom: '90px', right: '28px', zIndex: 9000 }}>
        {chatOpen && (
          <div style={{ width: '320px', backgroundColor: 'var(--white)', borderRadius: '20px', boxShadow: '0 20px 60px rgba(107,45,139,0.25)', overflow: 'hidden', marginBottom: '12px', border: '2px solid rgba(107,45,139,0.1)' }}>
            {/* Chat header */}
            <div style={{ background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>🤖</div>
                <div>
                  <p style={{ margin: 0, color: 'white', fontWeight: '700', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>Bupe Assistant</p>
                  <p style={{ margin: 0, color: 'rgba(255,255,255,0.65)', fontSize: '11px', fontFamily: "'Lato', sans-serif" }}>Instant answers · 24/7</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.7)', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>

            {/* Messages */}
            <div style={{ height: '260px', overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: msg.from === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{ maxWidth: '82%', padding: '10px 14px', borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px', backgroundColor: msg.from === 'user' ? 'var(--purple)' : 'var(--cream)', color: msg.from === 'user' ? 'white' : 'var(--text)', fontSize: '13px', fontFamily: "'Lato', sans-serif", lineHeight: 1.55 }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick reply chips */}
            <div style={{ padding: '0 12px 8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {['Donate', 'Volunteer', 'Location', 'Gala 2026'].map(q => (
                <button key={q} onClick={() => { setChatInput(q); setTimeout(() => { setChatMessages(p => [...p, { from:'user', text:q }, { from:'bot', text: getBotReply(q) }]); setChatInput('') }, 100) }} style={{ padding: '4px 10px', borderRadius: '20px', border: '1px solid rgba(107,45,139,0.2)', backgroundColor: 'var(--cream)', color: 'var(--purple)', fontSize: '11px', fontWeight: '700', fontFamily: "'Lato', sans-serif", cursor: 'pointer' }}>
                  {q}
                </button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(107,45,139,0.08)', display: 'flex', gap: '8px' }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && sendChat()} placeholder="Ask anything..." style={{ flex: 1, padding: '9px 14px', borderRadius: '50px', border: '2px solid rgba(107,45,139,0.15)', fontSize: '13px', fontFamily: "'Lato', sans-serif", outline: 'none', backgroundColor: 'var(--cream)', color: 'var(--text)' }} />
              <button onClick={sendChat} style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: 'var(--purple)', border: 'none', color: 'white', fontSize: '16px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>→</button>
            </div>
          </div>
        )}

        <button onClick={() => setChatOpen(c => !c)} style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple), var(--purple-dark))', border: 'none', color: 'white', fontSize: '24px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(107,45,139,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {chatOpen ? '✕' : '💬'}
          {!chatOpen && <span style={{ position: 'absolute', top: '-2px', right: '-2px', width: '14px', height: '14px', backgroundColor: '#4CAF50', borderRadius: '50%', border: '2px solid white' }} />}
        </button>
      </div>

      {/* ════ HERO ════ */}
      <section style={{ background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 55%, #9C3ABB 100%)', padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '450px', height: '450px', borderRadius: '50%', background: 'rgba(244,196,48,0.06)', top: '-160px', right: '-120px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '320px', height: '320px', borderRadius: '50%', background: 'rgba(76,175,80,0.06)', bottom: '-100px', left: '-60px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.18)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '8px 22px', borderRadius: '50px', marginBottom: '24px', fontFamily: "'Lato', sans-serif" }}>
            ✦ We'd Love to Hear From You
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px,6vw,64px)', color: 'var(--white)', lineHeight: 1.08, marginBottom: '20px' }}>
            Get in <span style={{ color: 'var(--gold)' }}>Touch</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', fontFamily: "'Lato', sans-serif", lineHeight: 1.85, marginBottom: '32px' }}>
            Whether you want to donate, volunteer, partner or simply pray with us — our team is here and we would love to connect with you.
          </p>

          {/* Office hours badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: `1px solid ${officeHours.open ? 'rgba(76,175,80,0.6)' : 'rgba(255,255,255,0.2)'}`, borderRadius: '50px', padding: '10px 20px', marginBottom: '28px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: officeHours.open ? '#4CAF50' : '#F44336' }} />
            <span style={{ color: 'white', fontSize: '13px', fontFamily: "'Lato', sans-serif", fontWeight: '700' }}>{officeHours.label}</span>
          </div>

          {/* Quick contact pills */}
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: '📞 Call Us', action: () => copyToClipboard('+260 97X XXX XXX', 'Phone number') },
              { label: '📧 Email Us', action: () => copyToClipboard('info@bupefoundation.org', 'Email address') },
              { label: '💬 WhatsApp', action: () => window.open('https://wa.me/260970000000', '_blank') },
              { label: '🤖 Chat Bot', action: () => setChatOpen(true) },
            ].map(btn => (
              <button key={btn.label} onClick={btn.action} style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '10px 20px', borderRadius: '50px', fontWeight: '700', fontSize: '13px', fontFamily: "'Lato', sans-serif", cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
              >
                {btn.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center', marginTop: '28px' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: 'var(--gold)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>Contact</span>
          </div>
        </div>
      </section>

      {/* ════ RESPONSE TIME STRIP ════ */}
      <div style={{ backgroundColor: 'var(--purple)', padding: '14px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '24px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {[
            { icon: '⚡', label: 'Urgent enquiries', time: '< 2 hours' },
            { icon: '📧', label: 'General email',    time: '< 24 hours' },
            { icon: '📞', label: 'Phone calls',      time: 'Mon–Fri 08:00–17:00' },
            { icon: '💬', label: 'WhatsApp',         time: 'Mon–Sat 08:00–20:00' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '16px' }}>{item.icon}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px', fontFamily: "'Lato', sans-serif" }}>{item.label}:</span>
              <span style={{ color: 'var(--gold)', fontSize: '12px', fontWeight: '700', fontFamily: "'Lato', sans-serif" }}>{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ════ MAIN CONTENT GRID ════ */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 420px', gap: '40px', alignItems: 'start' }}>

          {/* LEFT — Contact Form */}
          <div>
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '24px', padding: '40px', boxShadow: '0 8px 40px rgba(107,45,139,0.08)' }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '28px', marginBottom: '8px' }}>Send Us a Message</h2>
              <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '14px', marginBottom: '32px' }}>Fill in the form below and we will get back to you promptly.</p>

              {/* Category Picker */}
              <div style={{ marginBottom: '24px' }}>
                <label style={lbl}>What is your enquiry about? *</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {categories.map(cat => (
                    <div key={cat.id} onClick={() => setForm({ ...form, category: cat.id })} style={{ padding: '12px 14px', borderRadius: '12px', border: '2px solid', borderColor: form.category === cat.id ? 'var(--purple)' : 'rgba(107,45,139,0.12)', backgroundColor: form.category === cat.id ? '#F3E5F5' : 'var(--cream)', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                      <p style={{ margin: '0 0 2px', fontWeight: '700', fontSize: '13px', color: 'var(--purple)', fontFamily: "'Lato', sans-serif" }}>{cat.label}</p>
                      <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>{cat.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Personal Info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <div>
                  <label style={lbl}>Full Name *</label>
                  <input style={inp} placeholder="Your full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Email Address *</label>
                  <input style={inp} type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                <div>
                  <label style={lbl}>Phone Number</label>
                  <input style={inp} placeholder="+260 XXX XXX XXX" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                </div>
                <div>
                  <label style={lbl}>Subject</label>
                  <input style={inp} placeholder="Brief subject line" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })} />
                </div>
              </div>

              {/* Message */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label style={{ ...lbl, marginBottom: 0 }}>Message *</label>
                  <span style={{ fontSize: '11px', color: charCount > MAX_CHARS * 0.9 ? '#C62828' : 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>{charCount}/{MAX_CHARS}</span>
                </div>
                <textarea placeholder="Tell us how we can help you..." rows={5} value={form.message} onChange={e => { setForm({ ...form, message: e.target.value }); setCharCount(e.target.value.length) }} maxLength={MAX_CHARS} style={{ ...inp, resize: 'none', marginBottom: '8px' }} />
              </div>

              {/* Urgent toggle */}
              <div onClick={() => setForm({ ...form, urgent: !form.urgent })} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px 16px', borderRadius: '12px', border: `2px solid ${form.urgent ? '#D4A017' : 'rgba(107,45,139,0.12)'}`, backgroundColor: form.urgent ? '#FFF8E1' : 'var(--cream)', cursor: 'pointer', marginBottom: '24px', transition: 'all 0.2s ease' }}>
                <div style={{ width: '20px', height: '20px', borderRadius: '4px', border: `2px solid ${form.urgent ? '#D4A017' : 'rgba(107,45,139,0.3)'}`, backgroundColor: form.urgent ? '#D4A017' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s ease' }}>
                  {form.urgent && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                </div>
                <div>
                  <p style={{ margin: 0, fontWeight: '700', fontSize: '13px', color: form.urgent ? '#D4A017' : 'var(--text)', fontFamily: "'Lato', sans-serif" }}>⚡ This is urgent — please reply within 2 hours</p>
                  <p style={{ margin: 0, fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>For safeguarding concerns, emergencies or time-sensitive matters</p>
                </div>
              </div>

              {/* Submit */}
              <button onClick={handleSubmit} disabled={submitting || !form.name || !form.email || !form.message || !form.category} style={{ width: '100%', backgroundColor: (!form.name || !form.email || !form.message || !form.category) ? 'var(--grey)' : 'var(--purple)', color: (!form.name || !form.email || !form.message || !form.category) ? 'var(--text-light)' : 'white', padding: '17px', borderRadius: '50px', border: 'none', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", cursor: (!form.name || !form.email || !form.message || !form.category) ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease', boxShadow: (!form.name || !form.email || !form.message || !form.category) ? 'none' : '0 8px 24px rgba(107,45,139,0.3)' }}>
                {submitting ? '⏳ Sending...' : '📨 Send Message'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", marginTop: '12px' }}>
                🔒 Your information is private and will never be shared.
              </p>
            </div>
          </div>

          {/* RIGHT — Info Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {/* Office selector */}
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 24px rgba(107,45,139,0.07)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '20px', marginBottom: '16px' }}>📍 Our Offices</h3>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                {offices.map((o, i) => (
                  <button key={i} onClick={() => setActiveOffice(i)} style={{ flex: 1, padding: '8px 6px', borderRadius: '10px', border: '2px solid', borderColor: activeOffice === i ? o.border : 'rgba(107,45,139,0.12)', backgroundColor: activeOffice === i ? o.color : 'var(--cream)', fontSize: '11px', fontWeight: '700', color: activeOffice === i ? o.border : 'var(--text-light)', fontFamily: "'Lato', sans-serif", cursor: 'pointer', transition: 'all 0.2s ease', textAlign: 'center' }}>
                    {o.icon}<br />{o.name.split('—')[0].trim()}
                  </button>
                ))}
              </div>

              <div style={{ backgroundColor: offices[activeOffice].color, borderRadius: '14px', padding: '20px', borderLeft: `4px solid ${offices[activeOffice].border}` }}>
                <h4 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '17px', marginBottom: '14px' }}>{offices[activeOffice].name}</h4>
                {[
                  { icon: '📍', text: offices[activeOffice].address, copy: offices[activeOffice].address, copyLabel: 'Address' },
                  { icon: '📞', text: offices[activeOffice].phone,   copy: offices[activeOffice].phone,   copyLabel: 'Phone' },
                  { icon: '📧', text: offices[activeOffice].email,   copy: offices[activeOffice].email,   copyLabel: 'Email' },
                  { icon: '🕐', text: offices[activeOffice].hours,   copy: null },
                ].map((item, i) => (
                  <div key={i} onClick={() => item.copy && copyToClipboard(item.copy, item.copyLabel)} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start', cursor: item.copy ? 'pointer' : 'default', padding: '6px', borderRadius: '8px', transition: 'background 0.2s ease' }}
                    onMouseEnter={e => item.copy && (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.5)')}
                    onMouseLeave={e => item.copy && (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    <span style={{ fontSize: '14px', flexShrink: 0, marginTop: '1px' }}>{item.icon}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", lineHeight: 1.55 }}>{item.text}</span>
                    {item.copy && <span style={{ marginLeft: 'auto', fontSize: '11px', color: offices[activeOffice].border, fontFamily: "'Lato', sans-serif", fontWeight: '700', flexShrink: 0 }}>Copy</span>}
                  </div>
                ))}
              </div>

              {offices[activeOffice].primary && (
                <a href={`https://www.google.com/maps/search/Bupe+Foundation+Lusaka+Zambia`} target="_blank" rel="noreferrer" style={{ display: 'block', textAlign: 'center', marginTop: '14px', backgroundColor: '#4285F4', color: 'white', padding: '10px', borderRadius: '10px', textDecoration: 'none', fontWeight: '700', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>
                  🗺️ Open in Google Maps →
                </a>
              )}
            </div>

            {/* Social Media */}
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 24px rgba(107,45,139,0.07)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '20px', marginBottom: '16px' }}>🌐 Follow Us</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {socials.map(s => (
                  <a key={s.name} href={s.url} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', borderRadius: '12px', textDecoration: 'none', backgroundColor: 'var(--cream)', transition: 'all 0.2s ease', border: '2px solid transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.backgroundColor = `${s.color}15`; e.currentTarget.style.borderColor = s.color }}
                    onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--cream)'; e.currentTarget.style.borderColor = 'transparent' }}
                  >
                    <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: 'var(--text)', fontFamily: "'Lato', sans-serif" }}>{s.name}</p>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>{s.handle}</p>
                    </div>
                    <span style={{ fontSize: '12px', fontWeight: '700', color: s.color, fontFamily: "'Lato', sans-serif", flexShrink: 0 }}>{s.followers}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 24px rgba(107,45,139,0.07)' }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '18px', marginBottom: '14px' }}>Quick Actions</h3>
              {[
                { label: '❤️ Make a Donation',   href: '/donate',       bg: '#FFF8E1', color: '#D4A017' },
                { label: '🙋 Volunteer With Us', href: '/get-involved', bg: '#F3E5F5', color: '#6B2D8B' },
                { label: '📊 View Our Reports',  href: '/impact',       bg: '#E8F5E9', color: '#2E7D32' },
                { label: '📰 Read Our Stories',  href: '/news',         bg: '#E3F2FD', color: '#1A4B8C' },
              ].map(a => (
                <Link key={a.label} href={a.href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 14px', borderRadius: '10px', marginBottom: '8px', backgroundColor: a.bg, textDecoration: 'none', transition: 'opacity 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                  onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  <span style={{ fontWeight: '700', fontSize: '13px', color: a.color, fontFamily: "'Lato', sans-serif" }}>{a.label}</span>
                  <span style={{ color: a.color, fontSize: '16px' }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ FAQ ════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: '12px' }}>Before You Write</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4vw,40px)', color: 'var(--purple)', marginBottom: 0 }}>Frequently Asked Questions</h2>
            <div className="divider" style={{ margin: '12px auto 0' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ backgroundColor: activeFaq === i ? '#F3E5F5' : 'var(--cream)', borderRadius: '16px', overflow: 'hidden', border: `2px solid ${activeFaq === i ? 'var(--purple)' : 'transparent'}`, transition: 'all 0.3s ease' }}>
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} style={{ width: '100%', padding: '18px 22px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '12px' }}>
                  <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: '700', fontSize: '15px', color: activeFaq === i ? 'var(--purple)' : 'var(--text)', lineHeight: 1.4 }}>{faq.q}</span>
                  <span style={{ color: 'var(--purple)', fontSize: '20px', fontWeight: '900', flexShrink: 0, transform: activeFaq === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform 0.3s ease' }}>+</span>
                </button>
                <div style={{ maxHeight: activeFaq === i ? '300px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease', padding: activeFaq === i ? '0 22px 20px' : '0 22px' }}>
                  <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", lineHeight: 1.75 }}>{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px' }}>
              Still have questions? <button onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); setTimeout(() => document.getElementById('contact-form'), 300) }} style={{ background: 'none', border: 'none', color: 'var(--purple)', fontWeight: '700', fontSize: '15px', fontFamily: "'Lato', sans-serif", cursor: 'pointer', borderBottom: '2px solid var(--gold)', paddingBottom: '2px' }}>Send us a message →</button>
            </p>
          </div>
        </div>
      </section>

      {/* ════ MAP BANNER ════ */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '0' }}>
        <div style={{ height: '280px', background: 'linear-gradient(135deg, #E8F5E9, #E3F2FD)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', fontSize: '120px', opacity: 0.06 }}>🗺️</div>
          <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: 'var(--purple)', marginBottom: '8px' }}>
              📍 Head Office — 14 Kafue Road, Mtendere East, Lusaka
            </p>
            <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '14px', marginBottom: '20px' }}>
              Field offices also in Ndola and Livingstone
            </p>
            <a href="https://www.google.com/maps/search/Mtendere+East+Lusaka+Zambia" target="_blank" rel="noreferrer" style={{ backgroundColor: '#4285F4', color: 'white', padding: '12px 28px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontSize: '14px', fontFamily: "'Lato', sans-serif", boxShadow: '0 6px 20px rgba(66,133,244,0.3)' }}>
              🗺️ Open in Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* ════ CTA SCRIPTURE ════ */}
      <div className="scripture-band">
        <h2>"Come to me, all you who are weary, <span>and I will give you rest."</span></h2>
        <p>Matthew 11:28 — Our door is always open</p>
      </div>

    </div>
  )
}