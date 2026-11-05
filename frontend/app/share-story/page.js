'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ShareStoryPage() {

  const [step, setStep]             = useState(1)
  const [submitted, setSubmitted]   = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [charCount, setCharCount]   = useState(0)

  const [form, setForm] = useState({
    // Step 1 — Who are you?
    role:        '',   // 'child' | 'guardian' | 'volunteer' | 'donor' | 'partner' | 'other'
    name:        '',
    age:         '',
    location:    '',
    anonymous:   false,

    // Step 2 — Your story
    program:     '',
    year:        '',
    headline:    '',
    story:       '',
    before:      '',
    after:       '',

    // Step 3 — Contact & consent
    email:       '',
    phone:       '',
    consentPublish: false,
    consentPhoto:   false,
    consentName:    false,
  })

  const MAX = 2000

  const roles = [
    { id: 'child',     icon: '👶', label: 'A Child We Served',       desc: 'You received support from Bupe Foundation' },
    { id: 'guardian',  icon: '👩‍👧', label: 'A Guardian / Parent',     desc: 'Your child or family was supported' },
    { id: 'volunteer', icon: '🙋', label: 'A Volunteer',              desc: 'You gave your time to serve with us' },
    { id: 'donor',     icon: '💛', label: 'A Donor / Supporter',      desc: 'You donated or fundraised for us' },
    { id: 'partner',   icon: '🤝', label: 'A Partner Organisation',   desc: 'Your organisation worked with us' },
    { id: 'other',     icon: '💬', label: 'Something Else',           desc: 'Another connection to our work' },
  ]

  const programs = [
    'Child Care & Protection',
    'Education Support',
    'Emotional Healing & Counselling',
    'Community Empowerment',
    'Spiritual Development',
    'Nutrition & Health',
    'Not sure / General',
  ]

  const years = ['2024', '2023', '2022', '2021', '2020', 'Before 2020']

  const featuredStories = [
    { name: 'Chisomo M.',   role: 'Sponsored Child',   quote: 'They believed in me when nobody else did.', icon: '👧🏾', color: '#F3E5F5', border: '#6B2D8B' },
    { name: 'Mrs. Banda',   role: 'Guardian',          quote: 'I am not just surviving — I am providing.', icon: '👵🏾', color: '#E8F5E9', border: '#2E7D32' },
    { name: 'Dr. Emmanuel', role: 'Volunteer',         quote: 'The children here are known by name.',      icon: '👨🏿‍⚕️', color: '#E3F2FD', border: '#1A4B8C' },
    { name: 'Thandiwe C.',  role: 'Former Beneficiary', quote: 'I am living proof that it works.',        icon: '👩🏽',  color: '#FFF8E1', border: '#D4A017' },
  ]

  const f = (key, val) => setForm(p => ({ ...p, [key]: val }))

  const handleSubmit = () => {
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1500)
  }

  const canProceed1 = form.role && form.name
  const canProceed2 = form.story.trim().length >= 50
  const canSubmit   = form.consentPublish && (form.anonymous || form.consentName)

  const inp = {
    width: '100%', padding: '13px 16px', borderRadius: '10px',
    border: '2px solid rgba(107,45,139,0.15)', fontSize: '14px',
    fontFamily: "'Lato', sans-serif", outline: 'none',
    backgroundColor: 'var(--white)', color: 'var(--text)',
    boxSizing: 'border-box', marginBottom: '16px', display: 'block',
    transition: 'border-color 0.2s ease',
  }
  const lbl = {
    display: 'block', fontSize: '12px', fontWeight: '700',
    color: 'var(--purple)', fontFamily: "'Lato', sans-serif",
    marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px',
  }

  // ── SUCCESS ──
  if (submitted) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--cream)', padding: '40px 24px' }}>
        <div style={{ maxWidth: '580px', width: '100%', backgroundColor: 'var(--white)', borderRadius: '32px', padding: '60px 40px', textAlign: 'center', boxShadow: '0 20px 60px rgba(107,45,139,0.12)' }}>
          <div style={{ width: '96px', height: '96px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--purple), var(--gold))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px', margin: '0 auto 28px' }}>🙏</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '32px', marginBottom: '14px' }}>
            Thank You, {form.anonymous ? 'Friend' : form.name.split(' ')[0]}!
          </h2>
          <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '16px', lineHeight: 1.85, marginBottom: '24px' }}>
            Your story has been received. Our communications team will review it carefully and may reach out to you at <strong style={{ color: 'var(--purple)' }}>{form.email || 'the contact provided'}</strong>.
          </p>
          <div style={{ backgroundColor: '#F3E5F5', borderRadius: '16px', padding: '20px', marginBottom: '28px', border: '2px solid var(--purple)' }}>
            <p style={{ margin: 0, fontSize: '15px', fontFamily: "'Lato', sans-serif", color: 'var(--text)', lineHeight: 1.7 }}>
              💛 Stories like yours inspire donors, encourage volunteers and remind us <em>why</em> we do what we do every day. Thank you for trusting us with it.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ backgroundColor: 'var(--purple)', color: 'white', padding: '13px 26px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px' }}>Back to Home</Link>
            <Link href="/news" style={{ backgroundColor: 'transparent', color: 'var(--purple)', padding: '13px 26px', borderRadius: '50px', textDecoration: 'none', fontWeight: '700', fontFamily: "'Lato', sans-serif", fontSize: '14px', border: '2px solid var(--purple)' }}>Read Other Stories</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>

      {/* ════ HERO ════ */}
      <section style={{ background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 55%, #9C3ABB 100%)', padding: '80px 24px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '420px', height: '420px', borderRadius: '50%', background: 'rgba(244,196,48,0.07)', top: '-150px', right: '-100px', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(76,175,80,0.06)', bottom: '-100px', left: '-60px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: '700px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.18)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '8px 22px', borderRadius: '50px', marginBottom: '24px', fontFamily: "'Lato', sans-serif" }}>
            💛 Your Voice Matters
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(34px,6vw,62px)', color: 'white', lineHeight: 1.08, marginBottom: '20px' }}>
            Share Your <span style={{ color: 'var(--gold)' }}>Story</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', fontFamily: "'Lato', sans-serif", lineHeight: 1.85, marginBottom: '32px', maxWidth: '580px', margin: '0 auto 32px' }}>
            Have you or someone you know been impacted by Bupe Foundation? Your story could inspire a donation, encourage a volunteer, or give hope to another family walking the same road.
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <Link href="/programs" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Programs</Link>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color: 'var(--gold)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>Share Your Story</span>
          </div>
        </div>
      </section>

      {/* ════ STORY EXAMPLES STRIP ════ */}
      <div style={{ backgroundColor: 'var(--purple)', padding: '20px 24px', overflowX: 'auto' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {featuredStories.map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50px', padding: '8px 16px 8px 10px', border: '1px solid rgba(255,255,255,0.15)', flexShrink: 0 }}>
              <span style={{ fontSize: '22px' }}>{s.icon}</span>
              <div>
                <p style={{ margin: 0, fontSize: '12px', fontWeight: '700', color: 'var(--gold)', fontFamily: "'Lato', sans-serif" }}>{s.name} · {s.role}</p>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(255,255,255,0.7)', fontFamily: "'Lato', sans-serif", fontStyle: 'italic' }}>"{s.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ════ MAIN FORM ════ */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '820px', margin: '0 auto' }}>

          {/* Step Indicator */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '48px' }}>
            {['About You', 'Your Story', 'Consent'].map((label, i) => (
              <div key={label} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: step > i + 1 ? 'var(--green)' : step === i + 1 ? 'var(--purple)' : 'var(--grey)', color: step >= i + 1 ? 'white' : 'var(--text-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", transition: 'all 0.3s ease', boxShadow: step === i + 1 ? '0 4px 16px rgba(107,45,139,0.35)' : 'none' }}>
                    {step > i + 1 ? '✓' : i + 1}
                  </div>
                  <span style={{ fontSize: '12px', color: step === i + 1 ? 'var(--purple)' : 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontWeight: '700', marginTop: '8px', textTransform: 'uppercase', letterSpacing: '0.5px', textAlign: 'center' }}>{label}</span>
                </div>
                {i < 2 && <div style={{ height: '2px', flex: 1, backgroundColor: step > i + 1 ? 'var(--green)' : 'var(--grey)', marginBottom: '28px', transition: 'all 0.3s ease' }} />}
              </div>
            ))}
          </div>

          <div style={{ backgroundColor: 'var(--white)', borderRadius: '28px', padding: '44px', boxShadow: '0 8px 40px rgba(107,45,139,0.09)' }}>

            {/* ══ STEP 1 — About You ══ */}
            {step === 1 && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '28px', marginBottom: '8px' }}>First, tell us about yourself</h2>
                <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '14px', marginBottom: '32px' }}>We want to understand your connection to Bupe Foundation before you tell us your story.</p>

                {/* Role picker */}
                <div style={{ marginBottom: '28px' }}>
                  <label style={lbl}>How are you connected to us? *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
                    {roles.map(role => (
                      <div key={role.id} onClick={() => f('role', role.id)} style={{ padding: '14px 16px', borderRadius: '14px', border: '2px solid', borderColor: form.role === role.id ? 'var(--purple)' : 'rgba(107,45,139,0.12)', backgroundColor: form.role === role.id ? '#F3E5F5' : 'var(--cream)', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                          <span style={{ fontSize: '24px' }}>{role.icon}</span>
                          <div>
                            <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: 'var(--purple)', fontFamily: "'Lato', sans-serif" }}>{role.label}</p>
                            <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>{role.desc}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Name & Location */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <div>
                    <label style={lbl}>Your Name *</label>
                    <input style={inp} placeholder="Your full name" value={form.name} onChange={e => f('name', e.target.value)} />
                  </div>
                  <div>
                    <label style={lbl}>Location</label>
                    <input style={inp} placeholder="City, Province" value={form.location} onChange={e => f('location', e.target.value)} />
                  </div>
                </div>

                {/* Age (optional, for children/youth) */}
                {(form.role === 'child' || form.role === 'guardian') && (
                  <div>
                    <label style={lbl}>Age (if you'd like to share)</label>
                    <input style={{ ...inp, maxWidth: '160px' }} placeholder="e.g. 14" type="number" min="5" max="99" value={form.age} onChange={e => f('age', e.target.value)} />
                  </div>
                )}

                {/* Anonymous option */}
                <div onClick={() => f('anonymous', !form.anonymous)} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '14px 16px', borderRadius: '12px', border: `2px solid ${form.anonymous ? 'var(--purple)' : 'rgba(107,45,139,0.12)'}`, backgroundColor: form.anonymous ? '#F3E5F5' : 'var(--cream)', cursor: 'pointer', marginBottom: '32px', transition: 'all 0.2s ease' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: `2px solid ${form.anonymous ? 'var(--purple)' : 'rgba(107,45,139,0.3)'}`, backgroundColor: form.anonymous ? 'var(--purple)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.2s ease' }}>
                    {form.anonymous && <span style={{ color: 'white', fontSize: '13px' }}>✓</span>}
                  </div>
                  <div>
                    <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: form.anonymous ? 'var(--purple)' : 'var(--text)', fontFamily: "'Lato', sans-serif" }}>🎭 Keep my name anonymous</p>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>Your story may still be published, but with a pseudonym (e.g. "A mother from Ndola")</p>
                  </div>
                </div>

                <button onClick={() => setStep(2)} disabled={!canProceed1} style={{ width: '100%', backgroundColor: canProceed1 ? 'var(--purple)' : 'var(--grey)', color: canProceed1 ? 'white' : 'var(--text-light)', padding: '17px', borderRadius: '50px', border: 'none', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", cursor: canProceed1 ? 'pointer' : 'not-allowed', transition: 'all 0.3s ease', boxShadow: canProceed1 ? '0 6px 24px rgba(107,45,139,0.3)' : 'none' }}>
                  Continue → Tell Your Story
                </button>
              </div>
            )}

            {/* ══ STEP 2 — The Story ══ */}
            {step === 2 && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '28px', marginBottom: '8px' }}>Now — tell us your story</h2>
                <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '14px', marginBottom: '32px' }}>
                  Write in your own words. There is no wrong way to tell it. Be as detailed or as brief as you like.
                </p>

                {/* Program & Year */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <div>
                    <label style={lbl}>Which Programme? (optional)</label>
                    <select value={form.program} onChange={e => f('program', e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select a programme…</option>
                      {programs.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={lbl}>Approximate Year</label>
                    <select value={form.year} onChange={e => f('year', e.target.value)} style={{ ...inp, appearance: 'none', cursor: 'pointer' }}>
                      <option value="">Select year…</option>
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                {/* Headline */}
                <div>
                  <label style={lbl}>Story Headline (optional)</label>
                  <input style={inp} placeholder='e.g. "How Bupe Foundation helped me go back to school"' value={form.headline} onChange={e => f('headline', e.target.value)} maxLength={100} />
                  <p style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", marginTop: '-10px', marginBottom: '16px' }}>A short title to describe your story in one line.</p>
                </div>

                {/* Before & After */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <div>
                    <label style={lbl}>Your Situation Before (optional)</label>
                    <textarea rows={3} style={{ ...inp, resize: 'none' }} placeholder="What was life like before Bupe Foundation?" value={form.before} onChange={e => f('before', e.target.value)} />
                  </div>
                  <div>
                    <label style={lbl}>How Things Changed (optional)</label>
                    <textarea rows={3} style={{ ...inp, resize: 'none' }} placeholder="What changed? What is different now?" value={form.after} onChange={e => f('after', e.target.value)} />
                  </div>
                </div>

                {/* Main story */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ ...lbl, marginBottom: 0 }}>Your Full Story * <span style={{ color: 'var(--text-light)', fontWeight: '400', textTransform: 'none', letterSpacing: 0 }}>(minimum 50 characters)</span></label>
                    <span style={{ fontSize: '11px', color: charCount > MAX * 0.9 ? '#C62828' : 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>{charCount}/{MAX}</span>
                  </div>
                  <textarea
                    rows={8}
                    maxLength={MAX}
                    placeholder="Tell us the full story in your own words. What happened? Who was involved? What did Bupe Foundation do? How did it make you feel? What is your life like now?

There is no wrong way to share this — just be honest and write from the heart."
                    value={form.story}
                    onChange={e => { f('story', e.target.value); setCharCount(e.target.value.length) }}
                    style={{ ...inp, resize: 'vertical', minHeight: '180px' }}
                  />
                </div>

                {/* Helper prompt */}
                <div style={{ backgroundColor: '#F3E5F5', borderRadius: '14px', padding: '18px 20px', marginBottom: '28px', borderLeft: '4px solid var(--purple)' }}>
                  <p style={{ margin: '0 0 8px', fontWeight: '700', fontSize: '13px', color: 'var(--purple)', fontFamily: "'Lato', sans-serif" }}>💡 Not sure what to write? Try answering these:</p>
                  <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", lineHeight: 1.8 }}>
                    <li>How did you first come to Bupe Foundation?</li>
                    <li>What was the most meaningful moment?</li>
                    <li>What would you say to someone thinking about supporting the Foundation?</li>
                    <li>Is there a person at Bupe Foundation who made a difference for you?</li>
                  </ul>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, backgroundColor: 'transparent', color: 'var(--purple)', padding: '16px', borderRadius: '50px', border: '2px solid var(--purple)', fontWeight: '700', fontSize: '15px', fontFamily: "'Lato', sans-serif", cursor: 'pointer' }}>← Back</button>
                  <button onClick={() => setStep(3)} disabled={!canProceed2} style={{ flex: 2, backgroundColor: canProceed2 ? 'var(--purple)' : 'var(--grey)', color: canProceed2 ? 'white' : 'var(--text-light)', padding: '16px', borderRadius: '50px', border: 'none', fontWeight: '700', fontSize: '15px', fontFamily: "'Lato', sans-serif", cursor: canProceed2 ? 'pointer' : 'not-allowed', transition: 'all 0.3s ease', boxShadow: canProceed2 ? '0 6px 24px rgba(107,45,139,0.3)' : 'none' }}>
                    Continue → Consent & Submit
                  </button>
                </div>
              </div>
            )}

            {/* ══ STEP 3 — Consent ══ */}
            {step === 3 && (
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '28px', marginBottom: '8px' }}>Almost there — just one last step</h2>
                <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '14px', marginBottom: '32px' }}>
                  Before we receive your story, we need your contact details and your permission to use your story. Please read carefully.
                </p>

                {/* Contact */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                  <div>
                    <label style={lbl}>Email Address</label>
                    <input style={inp} type="email" placeholder="your@email.com" value={form.email} onChange={e => f('email', e.target.value)} />
                  </div>
                  <div>
                    <label style={lbl}>Phone Number</label>
                    <input style={inp} placeholder="+260 XXX XXX XXX" value={form.phone} onChange={e => f('phone', e.target.value)} />
                  </div>
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", marginTop: '-8px', marginBottom: '24px' }}>
                  We need at least one way to reach you to confirm details before publication. Your contact info is never published.
                </p>

                {/* Consent checkboxes */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {[
                    {
                      key: 'consentPublish',
                      label: '📖 I give Bupe Foundation permission to share my story *',
                      desc: 'Your story may be published on the website, in newsletters, social media and fundraising materials to inspire others. Required to submit.',
                      required: true,
                    },
                    {
                      key: 'consentName',
                      label: '👤 I am happy to be identified by my real name',
                      desc: 'If you checked "anonymous" in Step 1, this will be ignored. Otherwise, your name may appear with the story.',
                      required: false,
                    },
                    {
                      key: 'consentPhoto',
                      label: '📷 I am willing to share a photo to go with my story',
                      desc: 'Optional. If selected, our team may contact you to request a photo. You can decline at that stage.',
                      required: false,
                    },
                  ].map(item => (
                    <div key={item.key} onClick={() => f(item.key, !form[item.key])} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start', padding: '16px 18px', borderRadius: '14px', border: `2px solid ${form[item.key] ? 'var(--purple)' : 'rgba(107,45,139,0.12)'}`, backgroundColor: form[item.key] ? '#F3E5F5' : 'var(--cream)', cursor: 'pointer', transition: 'all 0.2s ease' }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: `2px solid ${form[item.key] ? 'var(--purple)' : 'rgba(107,45,139,0.3)'}`, backgroundColor: form[item.key] ? 'var(--purple)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px', transition: 'all 0.2s ease' }}>
                        {form[item.key] && <span style={{ color: 'white', fontSize: '13px' }}>✓</span>}
                      </div>
                      <div>
                        <p style={{ margin: '0 0 4px', fontWeight: '700', fontSize: '14px', color: form[item.key] ? 'var(--purple)' : 'var(--text)', fontFamily: "'Lato', sans-serif" }}>{item.label}</p>
                        <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", lineHeight: 1.6 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Story preview card */}
                <div style={{ backgroundColor: 'var(--cream)', borderRadius: '16px', padding: '22px 24px', marginBottom: '28px', borderLeft: '4px solid var(--gold)' }}>
                  <p style={{ margin: '0 0 6px', fontWeight: '700', fontSize: '13px', color: '#D4A017', fontFamily: "'Lato', sans-serif", textTransform: 'uppercase', letterSpacing: '1px' }}>📋 Your Submission Summary</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                    {[
                      { label: 'Name', value: form.anonymous ? 'Anonymous' : form.name },
                      { label: 'Role', value: roles.find(r => r.id === form.role)?.label || '—' },
                      { label: 'Programme', value: form.program || 'Not specified' },
                      { label: 'Year', value: form.year || 'Not specified' },
                    ].map(row => (
                      <div key={row.label} style={{ padding: '6px 0', borderBottom: '1px solid rgba(107,45,139,0.06)' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", textTransform: 'uppercase', letterSpacing: '0.5px' }}>{row.label}: </span>
                        <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text)', fontFamily: "'Lato', sans-serif" }}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ margin: '10px 0 0', fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>
                    Story length: <strong style={{ color: 'var(--purple)' }}>{form.story.length} characters</strong>
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, backgroundColor: 'transparent', color: 'var(--purple)', padding: '16px', borderRadius: '50px', border: '2px solid var(--purple)', fontWeight: '700', fontSize: '15px', fontFamily: "'Lato', sans-serif", cursor: 'pointer' }}>← Back</button>
                  <button onClick={handleSubmit} disabled={!canSubmit || submitting} style={{ flex: 2, backgroundColor: canSubmit ? 'var(--gold)' : 'var(--grey)', color: canSubmit ? 'var(--dark)' : 'var(--text-light)', padding: '16px', borderRadius: '50px', border: 'none', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", cursor: canSubmit ? 'pointer' : 'not-allowed', transition: 'all 0.3s ease', boxShadow: canSubmit ? '0 6px 24px rgba(244,196,48,0.4)' : 'none' }}>
                    {submitting ? '⏳ Submitting…' : '💛 Submit My Story'}
                  </button>
                </div>

                <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", marginTop: '14px' }}>
                  🔒 Your story will be reviewed by our team before any publication. You can withdraw consent at any time by emailing <strong>stories@bupefoundation.org</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ════ WHY SHARE SECTION ════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <div style={{ color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '4px', textTransform: 'uppercase', fontFamily: "'Lato', sans-serif", marginBottom: '12px' }}>Why It Matters</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px,4vw,40px)', color: 'var(--purple)', marginBottom: 0 }}>Your Story Has Power</h2>
            <div className="divider" style={{ margin: '12px auto 0' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
            {[
              { icon: '💛', title: 'Inspires Donors', desc: 'Real stories move people to give. One story can generate thousands in donations for the children we serve.', color: '#FFF8E1', border: '#D4A017' },
              { icon: '🙋', title: 'Recruits Volunteers', desc: 'People join causes they connect with emotionally. Your story could bring the next volunteer through our doors.', color: '#E8F5E9', border: '#2E7D32' },
              { icon: '🕊️', title: 'Gives Others Hope', desc: 'Another guardian, child or family walking the same road needs to know they are not alone and things can change.', color: '#F3E5F5', border: '#6B2D8B' },
              { icon: '📢', title: 'Changes the Narrative', desc: 'Every story of transformation challenges stereotypes and shows what is possible when a community cares.', color: '#E3F2FD', border: '#1A4B8C' },
            ].map((item, i) => (
              <div key={i} style={{ backgroundColor: item.color, borderRadius: '18px', padding: '28px', borderLeft: `4px solid ${item.border}`, transition: 'transform 0.25s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <span style={{ fontSize: '36px', display: 'block', marginBottom: '12px' }}>{item.icon}</span>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '19px', marginBottom: '8px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ SCRIPTURE BAND ════ */}
      <div className="scripture-band">
        <h2>"Let your light shine before others, <span>that they may see your good deeds."</span></h2>
        <p>Matthew 5:16 — Your story is a light someone else needs today</p>
      </div>

    </div>
  )
}