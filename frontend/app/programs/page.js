'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ProgramsPage() {

  const [activeProgram, setActiveProgram] = useState(0)
  const [activeStory, setActiveStory] = useState(0)
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [hoveredArea, setHoveredArea] = useState(null)

  const programs = [
    {
      id: 1,
      icon: '🤝',
      title: 'Child Care & Protection',
      category: 'Care',
      color: '#E8F5E9',
      border: '#2E7D32',
      accent: 'var(--green)',
      tagline: 'Every child deserves to feel safe and loved',
      description: 'Our Child Care & Protection program is the cornerstone of everything we do. We provide a safe, nurturing environment where orphaned and vulnerable children receive daily care, emotional support and unconditional love.',
      beneficiaries: 120,
      communities: 8,
      started: '2018',
      activities: [
        'Daily care and supervision for children in need',
        'Safe house accommodation for at-risk children',
        'Foster family placement and support',
        'Child abuse prevention and awareness',
        'Legal protection and advocacy',
        'Regular health check-ups and medical care',
      ],
      impact: '120 children currently in active care programs across 8 communities',
      sdg: 'SDG 16 — Peace, Justice & Strong Institutions',
    },
    {
      id: 2,
      icon: '📚',
      title: 'Education Support',
      category: 'Education',
      color: '#F3E5F5',
      border: '#6B2D8B',
      accent: 'var(--purple)',
      tagline: 'No child left behind due to school fees',
      description: 'Education is the most powerful tool we can give a child. Our Education Support program ensures every child in our care has access to quality schooling, learning materials, tutoring and mentorship.',
      beneficiaries: 180,
      communities: 12,
      started: '2019',
      activities: [
        'Full school fee sponsorship for orphaned children',
        'Provision of uniforms, books and stationery',
        'After-school tutoring and homework support',
        'Mentorship and career guidance',
        'Scholarship programs for secondary & tertiary',
        'Digital literacy and computer skills training',
      ],
      impact: '180 children sponsored through school with 94% pass rate',
      sdg: 'SDG 4 — Quality Education',
    },
    {
      id: 3,
      icon: '💛',
      title: 'Emotional Healing',
      category: 'Wellbeing',
      color: '#FFF8E1',
      border: '#D4A017',
      accent: 'var(--gold-dark)',
      tagline: 'Restoring identity, joy and inner peace',
      description: 'Many of our children carry deep emotional wounds from loss, trauma and neglect. Our Emotional Healing program provides professional counseling, trauma therapy and faith-based healing to restore joy and purpose.',
      beneficiaries: 95,
      communities: 6,
      started: '2020',
      activities: [
        'Professional trauma counseling sessions',
        'Group therapy and peer support circles',
        'Art, music and drama therapy',
        'Faith-based healing and prayer sessions',
        'Identity and self-worth workshops',
        'Family reconciliation and reunification support',
      ],
      impact: '95 children completed healing programs with measurable improvement in wellbeing',
      sdg: 'SDG 3 — Good Health & Wellbeing',
    },
    {
      id: 4,
      icon: '🏘️',
      title: 'Community Empowerment',
      category: 'Community',
      color: '#E3F2FD',
      border: '#1A4B8C',
      accent: 'var(--blue)',
      tagline: 'Stronger families, stronger futures',
      description: 'Sustainable change happens at the community level. We work with families, guardians and local leaders to build resilient communities that can protect and nurture vulnerable children for generations.',
      beneficiaries: 250,
      communities: 18,
      started: '2020',
      activities: [
        'Guardian empowerment and parenting skills',
        'Small business and income-generation training',
        'Community savings groups (VSLAs)',
        'Leadership development for local volunteers',
        'Community child protection committees',
        'Agricultural support and food security',
      ],
      impact: '250 families empowered across 18 communities with improved livelihoods',
      sdg: 'SDG 1 — No Poverty',
    },
    {
      id: 5,
      icon: '🙏',
      title: 'Spiritual Development',
      category: 'Faith',
      color: '#FCE4EC',
      border: '#C62828',
      accent: 'var(--red)',
      tagline: 'Grounded in faith, purpose and love',
      description: 'At the heart of Bupe Foundation is a deep Christian faith. Our Spiritual Development program nurtures children\'s faith, moral values and sense of divine purpose through Bible study, worship and discipleship.',
      beneficiaries: 200,
      communities: 15,
      started: '2018',
      activities: [
        'Weekly Bible study and devotion groups',
        'Sunday worship and church attendance',
        'Christian values and character formation',
        'Youth discipleship programs',
        'Prayer groups and spiritual mentorship',
        'Faith-based camp and retreat experiences',
      ],
      impact: '200 children actively participating in spiritual development programs',
      sdg: 'SDG 10 — Reduced Inequalities',
    },
    {
      id: 6,
      icon: '🍽️',
      title: 'Nutrition & Health',
      category: 'Health',
      color: '#E8F5E9',
      border: '#F57C00',
      accent: 'var(--orange)',
      tagline: 'Every child deserves to be healthy',
      description: 'Good nutrition and health are foundational to a child\'s development. Our program provides daily nutritious meals, health screenings, medical care and health education to ensure every child thrives.',
      beneficiaries: 220,
      communities: 14,
      started: '2020',
      activities: [
        'Daily nutritious meals at community kitchens',
        'Regular health screenings and checkups',
        'Medical care and medication for sick children',
        'HIV/AIDS awareness and prevention',
        'Hygiene and sanitation education',
        'Maternal health and early childhood support',
      ],
      impact: '12,000+ meals served and 220 children receiving regular health monitoring',
      sdg: 'SDG 2 — Zero Hunger',
    },
  ]

  const impactStories = [
    {
      name: 'Chisomo, Age 12',
      program: 'Education Support',
      location: 'Lusaka',
      avatar: '👧🏾',
      color: '#F3E5F5',
      border: '#6B2D8B',
      story: 'Chisomo lost both her parents at age 7. With no one to pay her school fees, she was forced to drop out. Bupe Foundation stepped in, sponsored her education and provided a mentor. Today she is top of her class and dreams of becoming a doctor.',
      quote: 'Bupe Foundation gave me back my future. I will never stop being grateful.',
      outcome: 'Top of class, full scholarship secured',
    },
    {
      name: 'Mwansa, Age 9',
      program: 'Nutrition & Health',
      location: 'Kafue',
      avatar: '👦🏿',
      color: '#E8F5E9',
      border: '#F57C00',
      story: 'When we first met Mwansa, he was severely malnourished and unable to attend school. Through our community kitchen program and regular health monitoring, Mwansa regained his health. He now attends school daily and loves mathematics.',
      quote: 'I used to be sick all the time. Now I run and play like any other child!',
      outcome: 'Healthy weight restored, enrolled in Grade 4',
    },
    {
      name: 'Thandiwe, Age 14',
      program: 'Emotional Healing',
      location: 'Livingstone',
      avatar: '👧🏽',
      color: '#FFF8E1',
      border: '#D4A017',
      story: 'Thandiwe witnessed violence in her home before being taken into care. She was withdrawn, anxious and unable to trust. Through 18 months of trauma counseling and our art therapy program, Thandiwe rediscovered her voice and her joy.',
      quote: 'I drew my pain and then I drew my hope. Art saved me.',
      outcome: 'Completed trauma therapy, now mentors younger children',
    },
    {
      name: 'The Banda Family',
      program: 'Community Empowerment',
      location: 'Ndola',
      avatar: '👨‍👩‍👧🏾',
      color: '#E3F2FD',
      border: '#1A4B8C',
      story: 'The Banda family were taking care of 6 orphaned grandchildren on a minimal pension. Through our guardian empowerment program they received business training and a small grant. They started a vegetable garden that now feeds the family and generates income.',
      quote: 'We thought we were too old to change. Bupe Foundation showed us otherwise.',
      outcome: 'Self-sustaining vegetable business, all 6 grandchildren in school',
    },
  ]

  const geographicAreas = [
    { name: 'Lusaka', region: 'Lusaka Province', children: 95, programs: 6, coordinates: { top: '58%', left: '52%' }, color: '#6B2D8B' },
    { name: 'Kafue', region: 'Lusaka Province', children: 42, programs: 4, coordinates: { top: '65%', left: '48%' }, color: '#2E7D32' },
    { name: 'Ndola', region: 'Copperbelt Province', children: 38, programs: 4, coordinates: { top: '28%', left: '48%' }, color: '#1A4B8C' },
    { name: 'Kitwe', region: 'Copperbelt Province', children: 31, programs: 3, coordinates: { top: '24%', left: '44%' }, color: '#F57C00' },
    { name: 'Livingstone', region: 'Southern Province', children: 28, programs: 3, coordinates: { top: '80%', left: '44%' }, color: '#C62828' },
    { name: 'Chipata', region: 'Eastern Province', children: 16, programs: 2, coordinates: { top: '50%', left: '78%' }, color: '#D4A017' },
  ]

  const categories = ['All', 'Care', 'Education', 'Wellbeing', 'Community', 'Faith', 'Health']

  const filteredPrograms = programs.filter(p => {
    const matchesFilter = activeFilter === 'All' || p.category === activeFilter
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const totalBeneficiaries = programs.reduce((sum, p) => sum + p.beneficiaries, 0)
  const totalCommunities = 18
  const totalPrograms = programs.length

  useEffect(() => {
    const t = setInterval(() => setActiveStory(p => (p + 1) % impactStories.length), 6000)
    return () => clearInterval(t)
  }, [])

  return (
    <div>

      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 60%, #9C3ABB 100%)',
        padding: '80px 24px 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(244,196,48,0.06)', top: '-150px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(76,175,80,0.06)', bottom: '-100px', left: '-50px' }} />
        <div style={{ maxWidth: '750px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(244,196,48,0.2)', border: '1px solid var(--gold)', color: 'var(--gold)', fontSize: '11px', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', padding: '8px 20px', borderRadius: '50px', marginBottom: '24px', fontFamily: "'Lato', sans-serif" }}>
            ✦ What We Do
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 60px)', color: 'var(--white)', lineHeight: '1.1', marginBottom: '20px' }}>
            Our <span style={{ color: 'var(--gold)' }}>Programs</span> & Initiatives
          </h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', fontFamily: "'Lato', sans-serif", lineHeight: '1.8', marginBottom: '32px' }}>
            Six comprehensive programs designed to restore hope, dignity and a future to every child we serve.
          </p>

          {/* Quick Stats */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
            {[
              { value: totalPrograms, label: 'Programs' },
              { value: totalBeneficiaries + '+', label: 'Beneficiaries' },
              { value: totalCommunities, label: 'Communities' },
            ].map(stat => (
              <div key={stat.label} style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '16px', padding: '16px 28px', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: '900', color: 'var(--gold)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontFamily: "'Lato', sans-serif", textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', alignItems: 'center' }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.4)' }}>›</span>
            <span style={{ color: 'var(--gold)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}>Programs</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          SEARCH & FILTER
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '40px 24px', borderBottom: '1px solid rgba(107,45,139,0.08)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* Search */}
            <div style={{ position: 'relative', flex: '1', minWidth: '240px', maxWidth: '360px' }}>
              <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
              <input
                type="text"
                placeholder="Search programs..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '12px 16px 12px 42px', borderRadius: '50px', border: '2px solid rgba(107,45,139,0.2)', fontSize: '14px', fontFamily: "'Lato', sans-serif", outline: 'none', backgroundColor: 'var(--cream)', color: 'var(--text)', boxSizing: 'border-box' }}
              />
            </div>
            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveFilter(cat)} style={{ padding: '8px 18px', borderRadius: '50px', border: '2px solid var(--purple)', backgroundColor: activeFilter === cat ? 'var(--purple)' : 'transparent', color: activeFilter === cat ? 'var(--white)' : 'var(--purple)', fontWeight: '700', fontSize: '13px', fontFamily: "'Lato', sans-serif", cursor: 'pointer', transition: 'all 0.2s ease' }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROGRAMS GRID
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">Our Initiatives</div>
            <h2 className="section-title">Program Breakdown</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </div>

          {filteredPrograms.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔍</div>
              <p style={{ fontSize: '18px' }}>No programs found matching your search.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
              {filteredPrograms.map((program, i) => (
                <div
                  key={program.id}
                  onClick={() => setActiveProgram(activeProgram === i ? null : i)}
                  style={{
                    backgroundColor: 'var(--white)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(107,45,139,0.08)',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    border: activeProgram === i ? `2px solid ${program.border}` : '2px solid transparent',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 48px rgba(107,45,139,0.15)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(107,45,139,0.08)' }}
                >
                  {/* Card Header */}
                  <div style={{ backgroundColor: program.color, padding: '28px', borderBottom: `3px solid ${program.border}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <span style={{ fontSize: '48px' }}>{program.icon}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
                        <span style={{ backgroundColor: program.border, color: 'white', fontSize: '11px', fontWeight: '700', padding: '3px 10px', borderRadius: '20px', fontFamily: "'Lato', sans-serif" }}>{program.category}</span>
                        <span style={{ color: 'var(--text-light)', fontSize: '11px', fontFamily: "'Lato', sans-serif" }}>Since {program.started}</span>
                      </div>
                    </div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '22px', marginBottom: '6px' }}>{program.title}</h3>
                    <p style={{ fontSize: '13px', color: program.border, fontWeight: '700', fontFamily: "'Lato', sans-serif", fontStyle: 'italic', margin: 0 }}>{program.tagline}</p>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '24px' }}>
                    <p style={{ fontSize: '14px', color: 'var(--text-light)', lineHeight: '1.7', marginBottom: '20px' }}>
                      {program.description}
                    </p>

                    {/* Stats Row */}
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                      <div style={{ flex: 1, textAlign: 'center', backgroundColor: program.color, borderRadius: '12px', padding: '12px 8px' }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '900', color: program.border }}>{program.beneficiaries}+</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>Beneficiaries</div>
                      </div>
                      <div style={{ flex: 1, textAlign: 'center', backgroundColor: program.color, borderRadius: '12px', padding: '12px 8px' }}>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: '900', color: program.border }}>{program.communities}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>Communities</div>
                      </div>
                    </div>

                    {/* Expandable Activities */}
                    <div style={{ maxHeight: activeProgram === i ? '400px' : '0', overflow: 'hidden', transition: 'max-height 0.4s ease' }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '16px', marginBottom: '12px' }}>Key Activities</h4>
                      {program.activities.map((activity, j) => (
                        <div key={j} style={{ display: 'flex', gap: '8px', marginBottom: '8px', alignItems: 'flex-start' }}>
                          <span style={{ color: program.border, fontSize: '14px', flexShrink: 0, marginTop: '2px' }}>✓</span>
                          <span style={{ fontSize: '13px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", lineHeight: '1.5' }}>{activity}</span>
                        </div>
                      ))}
                      <div style={{ backgroundColor: program.color, borderRadius: '10px', padding: '12px', marginTop: '16px', borderLeft: `3px solid ${program.border}` }}>
                        <p style={{ fontSize: '12px', color: 'var(--text)', fontFamily: "'Lato', sans-serif", margin: '0 0 4px', fontWeight: '700' }}>📊 Impact</p>
                        <p style={{ fontSize: '13px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", margin: 0 }}>{program.impact}</p>
                      </div>
                      <div style={{ marginTop: '12px' }}>
                        <span style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", backgroundColor: 'var(--grey)', padding: '4px 10px', borderRadius: '20px' }}>🌐 {program.sdg}</span>
                      </div>
                    </div>

                    <button style={{ marginTop: '16px', width: '100%', padding: '10px', borderRadius: '8px', border: `2px solid ${program.border}`, backgroundColor: 'transparent', color: program.border, fontWeight: '700', fontSize: '13px', fontFamily: "'Lato', sans-serif", cursor: 'pointer', transition: 'all 0.2s ease' }}>
                      {activeProgram === i ? '↑ Show Less' : '↓ Learn More'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ════════════════════════════════
          IMPACT STORIES
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">Real Lives Changed</div>
            <h2 className="section-title">Impact Stories</h2>
            <div className="divider" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", maxWidth: '500px', margin: '0 auto' }}>
              Behind every number is a name, a face and a story of transformation.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {impactStories.map((story, i) => (
              <div
                key={i}
                onClick={() => setActiveStory(i)}
                style={{
                  backgroundColor: story.color,
                  borderRadius: '20px',
                  padding: '28px',
                  borderLeft: `4px solid ${story.border}`,
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  border: activeStory === i ? `2px solid ${story.border}` : `2px solid transparent`,
                  boxShadow: activeStory === i ? `0 12px 32px rgba(0,0,0,0.12)` : 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: `linear-gradient(135deg, ${story.border}, var(--purple-light))`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', flexShrink: 0 }}>
                    {story.avatar}
                  </div>
                  <div>
                    <h4 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '18px', margin: 0 }}>{story.name}</h4>
                    <p style={{ fontSize: '12px', color: story.border, fontWeight: '700', fontFamily: "'Lato', sans-serif", margin: 0, textTransform: 'uppercase', letterSpacing: '1px' }}>{story.program}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", margin: 0 }}>📍 {story.location}</p>
                  </div>
                </div>

                <p style={{ fontSize: '14px', color: 'var(--text)', lineHeight: '1.7', marginBottom: '16px', fontFamily: "'Lato', sans-serif" }}>
                  {story.story}
                </p>

                <div style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '10px', padding: '12px', marginBottom: '12px', borderLeft: `3px solid ${story.border}` }}>
                  <p style={{ fontSize: '14px', fontStyle: 'italic', color: 'var(--text)', margin: 0, fontFamily: "'Lato', sans-serif" }}>
                    "{story.quote}"
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '14px' }}>✅</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: story.border, fontFamily: "'Lato', sans-serif" }}>{story.outcome}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Share Your Story CTA */}
          <div style={{ textAlign: 'center', marginTop: '50px', padding: '40px', backgroundColor: 'var(--cream)', borderRadius: '20px', border: '2px dashed rgba(107,45,139,0.2)' }}>
            <div style={{ fontSize: '36px', marginBottom: '12px' }}>💌</div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '24px', marginBottom: '8px' }}>Do You Have a Story to Share?</h3>
            <p style={{ color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", fontSize: '15px', marginBottom: '20px', maxWidth: '400px', margin: '0 auto 20px' }}>
              Have you or someone you know been impacted by Bupe Foundation? Share your story with us.
            </p>
            <Link href="/share-story" style={{ backgroundColor: 'var(--purple)', color: 'var(--white)', padding: '14px 32px', borderRadius: '50px', fontWeight: '700', fontSize: '14px', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>
              Share Your Story →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          GEOGRAPHIC FOCUS
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">Where We Work</div>
            <h2 className="section-title">Geographic Focus Areas</h2>
            <div className="divider" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif', maxWidth: '500px', margin: '0 auto" }}>
              We currently operate across 6 major cities and 18 communities in Zambia.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>

            {/* Map Visual */}
            <div style={{ position: 'relative', backgroundColor: 'var(--white)', borderRadius: '20px', padding: '32px', boxShadow: '0 8px 32px rgba(107,45,139,0.08)', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ position: 'relative', width: '280px', height: '320px', backgroundColor: '#E8F5E9', borderRadius: '40% 60% 55% 45% / 50% 45% 55% 50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '48px', opacity: 0.3 }}>🇿🇲</span>
                {geographicAreas.map((area, i) => (
                  <div
                    key={i}
                    onMouseEnter={() => setHoveredArea(i)}
                    onMouseLeave={() => setHoveredArea(null)}
                    style={{
                      position: 'absolute',
                      top: area.coordinates.top,
                      left: area.coordinates.left,
                      width: hoveredArea === i ? '20px' : '14px',
                      height: hoveredArea === i ? '20px' : '14px',
                      borderRadius: '50%',
                      backgroundColor: area.color,
                      border: '3px solid white',
                      boxShadow: `0 2px 8px rgba(0,0,0,0.3)`,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      zIndex: hoveredArea === i ? 10 : 1,
                      transform: 'translate(-50%, -50%)',
                    }}
                  />
                ))}
                {hoveredArea !== null && (
                  <div style={{
                    position: 'absolute',
                    top: geographicAreas[hoveredArea].coordinates.top,
                    left: geographicAreas[hoveredArea].coordinates.left,
                    transform: 'translate(-50%, -130%)',
                    backgroundColor: 'var(--dark)',
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    fontFamily: "'Lato', sans-serif",
                    whiteSpace: 'nowrap',
                    zIndex: 20,
                    pointerEvents: 'none',
                  }}>
                    <strong>{geographicAreas[hoveredArea].name}</strong><br />
                    {geographicAreas[hoveredArea].children} children
                  </div>
                )}
              </div>
              <p style={{ color: 'var(--text-light)', fontSize: '13px', fontFamily: "'Lato', sans-serif", marginTop: '16px', textAlign: 'center' }}>
                🗺️ Hover over dots to see area details
              </p>
            </div>

            {/* Area Cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {geographicAreas.map((area, i) => (
                <div
                  key={i}
                  onMouseEnter={() => setHoveredArea(i)}
                  onMouseLeave={() => setHoveredArea(null)}
                  style={{
                    backgroundColor: hoveredArea === i ? 'var(--white)' : 'var(--white)',
                    borderRadius: '14px',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    border: hoveredArea === i ? `2px solid ${area.color}` : '2px solid transparent',
                    boxShadow: hoveredArea === i ? '0 8px 24px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
                    transform: hoveredArea === i ? 'translateX(6px)' : 'translateX(0)',
                  }}
                >
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: area.color, flexShrink: 0, boxShadow: `0 0 0 4px ${area.color}22` }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--purple)', fontSize: '17px', margin: 0 }}>{area.name}</h4>
                      <span style={{ fontSize: '12px', color: area.color, fontWeight: '700', fontFamily: "'Lato', sans-serif" }}>{area.children} children</span>
                    </div>
                    <p style={{ fontSize: '12px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif", margin: '2px 0 0' }}>{area.region} • {area.programs} programs active</p>
                  </div>
                </div>
              ))}

              <div style={{ backgroundColor: 'linear-gradient(135deg, var(--purple), var(--purple-light))', borderRadius: '14px', padding: '20px', background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', marginTop: '8px' }}>
                <p style={{ color: 'var(--gold)', fontFamily: "'Playfair Display', serif", fontSize: '16px', margin: '0 0 6px', fontWeight: '700' }}>🌍 Expanding Our Reach</p>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '13px', fontFamily: "'Lato', sans-serif", margin: '0 0 12px', lineHeight: '1.6' }}>
                  We plan to expand to 3 new provinces by 2027. Partner with us to make this possible.
                </p>
                <Link href="/get-involved" style={{ color: 'var(--gold)', fontSize: '13px', fontWeight: '700', fontFamily: "'Lato', sans-serif", textDecoration: 'none' }}>
                  Become a Partner →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          SDG ALIGNMENT
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--white)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">Global Alignment</div>
            <h2 className="section-title">UN Sustainable Development Goals</h2>
            <div className="divider" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: 'var(--text-light)', fontSize: '16px', fontFamily: "'Lato', sans-serif", maxWidth: '550px', margin: '0 auto' }}>
              Our programs are aligned with the United Nations SDGs, ensuring our work contributes to global development targets.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
            {[
              { number: '1', title: 'No Poverty', icon: '🏠', color: '#E8253B' },
              { number: '2', title: 'Zero Hunger', icon: '🌾', color: '#DDA838' },
              { number: '3', title: 'Good Health', icon: '❤️', color: '#4C9F38' },
              { number: '4', title: 'Quality Education', icon: '📚', color: '#C31E33' },
              { number: '10', title: 'Reduced Inequalities', icon: '⚖️', color: '#DD1367' },
              { number: '16', title: 'Peace & Justice', icon: '🕊️', color: '#01689D' },
            ].map(sdg => (
              <div key={sdg.number}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                style={{ backgroundColor: sdg.color, borderRadius: '16px', padding: '24px', textAlign: 'center', color: 'white', transition: 'transform 0.2s ease', cursor: 'pointer' }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{sdg.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: '900', marginBottom: '4px' }}>#{sdg.number}</div>
                <div style={{ fontSize: '13px', fontFamily: "'Lato', sans-serif", fontWeight: '700', opacity: 0.9 }}>{sdg.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          PROGRAM PROGRESS TRACKER
      ════════════════════════════════ */}
      <section style={{ backgroundColor: 'var(--cream)', padding: '80px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <div className="section-label">2026 Targets</div>
            <h2 className="section-title">Program Progress</h2>
            <div className="divider" style={{ margin: '0 auto' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { label: 'Children in Active Care', current: 120, target: 200, color: 'var(--green)', icon: '🤝' },
              { label: 'School Sponsorships', current: 180, target: 250, color: 'var(--purple)', icon: '📚' },
              { label: 'Meals Served Monthly', current: 1200, target: 2000, color: 'var(--orange)', icon: '🍽️' },
              { label: 'Communities Reached', current: 18, target: 30, color: 'var(--blue)', icon: '🏘️' },
              { label: 'Counseling Sessions', current: 95, target: 150, color: 'var(--gold-dark)', icon: '💛' },
            ].map((item, i) => {
              const pct = Math.round((item.current / item.target) * 100)
              return (
                <div key={i} style={{ backgroundColor: 'var(--white)', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(107,45,139,0.06)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '24px' }}>{item.icon}</span>
                      <span style={{ fontFamily: "'Lato', sans-serif", fontWeight: '700', color: 'var(--text)', fontSize: '15px' }}>{item.label}</span>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", color: item.color, fontSize: '20px', fontWeight: '900' }}>{item.current.toLocaleString()}</span>
                      <span style={{ color: 'var(--text-light)', fontSize: '13px', fontFamily: "'Lato', sans-serif" }}> / {item.target.toLocaleString()}</span>
                    </div>
                  </div>
                  <div style={{ backgroundColor: 'var(--grey)', borderRadius: '50px', height: '10px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: item.color, borderRadius: '50px', transition: 'width 1s ease' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>Progress: {pct}%</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-light)', fontFamily: "'Lato', sans-serif" }}>Target: {item.target.toLocaleString()}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          VOLUNTEER FOR A PROGRAM
      ════════════════════════════════ */}
      <section style={{ background: 'linear-gradient(135deg, var(--purple-dark), var(--purple))', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🙌</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--white)', fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: '16px' }}>
            Join a Program as a Volunteer
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', fontFamily: "'Lato', sans-serif", lineHeight: '1.8', marginBottom: '40px' }}>
            Whether you are a teacher, doctor, counselor or just someone with a heart to serve — there is a place for you in one of our programs.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/get-involved" style={{ backgroundColor: 'var(--gold)', color: 'var(--dark)', padding: '16px 36px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', boxShadow: '0 8px 24px rgba(244,196,48,0.4)' }}>
              💛 Volunteer Now
            </Link>
            <Link href="/donate" style={{ backgroundColor: 'transparent', color: 'var(--white)', padding: '16px 36px', borderRadius: '50px', fontWeight: '700', fontSize: '16px', fontFamily: "'Lato', sans-serif", textDecoration: 'none', border: '2px solid rgba(255,255,255,0.5)' }}>
              ❤️ Sponsor a Program
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}