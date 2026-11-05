'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

const testimonials = [
  { name:'Chisomo M.', role:'Sponsored child, age 13', location:'Lusaka', avatar:'👧🏾', program:'Education', year:'2023', quote:'Before Bupe Foundation I thought school was a dream I would never have. Now I am top of my class and I want to be a doctor. They did not just pay my fees — they believed in me when nobody else did.', outcome:'Top of class — aiming for medicine', color:'#F3E5F5', border:'#6B2D8B' },
  { name:'Mrs. Charity Banda', role:'Guardian of 6 grandchildren', location:'Ndola', avatar:'👵🏾', program:'Community', year:'2022', quote:'When my children passed away I was left with six grandchildren and no income. Bupe Foundation trained me in business, gave me seeds to start a garden, and now we are feeding ourselves. God used them to save us.', outcome:'Self-sustaining vegetable business', color:'#E8F5E9', border:'#2E7D32' },
  { name:'Dr. Emmanuel K.', role:'Medical volunteer', location:'Kitwe', avatar:'👨🏿‍⚕️', program:'Health', year:'2023', quote:'I have volunteered with many organisations but none with the heart of Bupe Foundation. The children here are not just statistics — they are known by name, loved deeply, and genuinely cared for every single day.', outcome:'Volunteers monthly for 2+ years', color:'#E3F2FD', border:'#1A4B8C' },
  { name:'Thandiwe C.', role:'Former beneficiary, now staff', location:'Lusaka', avatar:'👩🏽', program:'Education', year:'2023', quote:'I was one of the first children supported by Bupe Foundation. Today I work here as a programme officer. This organisation literally changed the trajectory of my life. I am living proof that it works.', outcome:'Programme Officer at Bupe Foundation', color:'#FFF8E1', border:'#D4A017' },
  { name:'Pastor James Nkanza', role:'Church partner — 3 years', location:'Lusaka', avatar:'👨🏾', program:'Partnership', year:'2022', quote:'The accountability, the love for children and the Christ-centred approach give our congregation full confidence. Every penny donated is used with integrity. We are proud partners of Bupe Foundation.', outcome:'Mobilised K28,000 in church donations', color:'#FCE4EC', border:'#C62828' },
]

const impactStories = [
  { name:'Mwansa, 9',      program:'Nutrition',  location:'Kafue',       avatar:'👦🏿', before:'Severely malnourished, unable to attend school',      after:'Healthy, in Grade 4, loves maths',                     color:'#E8F5E9', border:'#2E7D32', icon:'🍽️' },
  { name:'Chanda Sisters', program:'Education',  location:'Lusaka',      avatar:'👧🏾', before:'Orphaned at 6 & 8 — no school fees',                 after:'Both passing with distinction',                        color:'#F3E5F5', border:'#6B2D8B', icon:'📚' },
  { name:'Mr. Phiri',      program:'Community',  location:'Chipata',     avatar:'👨🏾', before:'Struggling to care for 4 nieces and nephews',         after:'Running a poultry business, all 4 children in school', color:'#E3F2FD', border:'#1A4B8C', icon:'🏘️' },
  { name:'Naomi, 14',      program:'Healing',    location:'Livingstone', avatar:'👩🏽', before:'Trauma from abuse — withdrawn and fearful',           after:'Completed therapy, mentoring younger children',        color:'#FFF8E1', border:'#D4A017', icon:'💆' },
]

export default function ImpactPage() {
  const [activeYear, setActiveYear]               = useState('2023')
  const [activeTab, setActiveTab]                 = useState('metrics')
  const [activeStory, setActiveStory]             = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [countersStarted, setCountersStarted]     = useState(false)
  const [counts, setCounts]                       = useState({ children:0, meals:0, schools:0, communities:0, volunteers:0, hours:0 })
  const [chartHover, setChartHover]               = useState(null)
  const [liveRaised, setLiveRaised]               = useState(127450)
  const [liveDonors, setLiveDonors]               = useState(342)
  const [filterProgram, setFilterProgram]         = useState('All')
  const [shareToast, setShareToast]               = useState(false)
  const countersRef = useRef(null)

  const reports = {
    '2023': { year:'2023', theme:'Growing Together',       tagline:'Our most impactful year yet',         children:250, meals:12000, schools:18, communities:18, volunteers:85, hours:5000, raised:127450, passRate:94, healthRate:89, wellbeing:82, stability:76, color:'#6B2D8B', highlights:['Expanded to 3 new communities in Copperbelt Province','Launched digital literacy program reaching 45 children','Partnered with 5 new international organisations','Achieved 94% school pass rate among sponsored children','Opened second community kitchen in Kafue District','Graduated first cohort of vocational training graduates'] },
    '2022': { year:'2022', theme:'Seeds of Hope',          tagline:'Building foundations for the future', children:180, meals:8500,  schools:12, communities:14, volunteers:60, hours:3200, raised:94200,  passRate:88, healthRate:81, wellbeing:74, stability:68, color:'#2E7D32', highlights:['Launched emotional healing programme for 60 children','Established first community savings group (VSLA)','Trained 30 new volunteer counsellors across three sites','Distributed 500 complete school uniform sets','Hosted inaugural Annual Fundraising Gala in Lusaka'] },
    '2021': { year:'2021', theme:'Resilience Rising',      tagline:'Overcoming challenges with faith',    children:130, meals:5200,  schools:8,  communities:10, volunteers:40, hours:1800, raised:62000,  passRate:82, healthRate:74, wellbeing:68, stability:60, color:'#1A4B8C', highlights:['Maintained full operations through COVID-19 restrictions','Launched online learning support for 45 children','Distributed emergency food packages to 200 families','Expanded to Livingstone and Southern Province','Received first international grant from UK partner church'] },
    '2020': { year:'2020', theme:'Faithful Through Storms', tagline:'Serving through a global pandemic',  children:95,  meals:3800,  schools:6,  communities:7,  volunteers:28, hours:1200, raised:38500,  passRate:76, healthRate:65, wellbeing:58, stability:50, color:'#D4A017', highlights:['Adapted all programmes to COVID-19 safety protocols','Distributed PPE and hygiene kits to 150 families','Launched nutrition programme for malnourished children','Set up community kitchen feeding 80 children daily','Officially registered with NGO Board of Zambia'] },
  }

  const r = reports[activeYear]
  const growthData = Object.values(reports)
  const maxChildren = Math.max(...growthData.map(d => d.children))
  const programFilters = ['All', 'Education', 'Nutrition', 'Community', 'Health', 'Healing', 'Partnership']

  const metrics = [
    { label:'School Pass Rate',      value:`${r.passRate}%`,   progress:r.passRate,   icon:'🎓', color:'#6B2D8B', bg:'#F3E5F5', desc:'Among all sponsored children' },
    { label:'Nutrition Improvement', value:`${r.healthRate}%`, progress:r.healthRate, icon:'🍽️', color:'#2E7D32', bg:'#E8F5E9', desc:'Children showing healthy weight gain' },
    { label:'Emotional Wellbeing',   value:`${r.wellbeing}%`,  progress:r.wellbeing,  icon:'💛', color:'#D4A017', bg:'#FFF8E1', desc:'Reported improved mental health' },
    { label:'Family Stability',      value:`${r.stability}%`,  progress:r.stability,  icon:'🏘️', color:'#1A4B8C', bg:'#E3F2FD', desc:'Guardian households financially stable' },
    { label:'Volunteer Retention',   value:'78%',              progress:78,           icon:'🙋', color:'#C62828', bg:'#FCE4EC', desc:'Volunteers who returned the following year' },
    { label:'Donor Retention',       value:'71%',              progress:71,           icon:'💳', color:'#F57C00', bg:'#FFF3E0', desc:'Donors who gave again the following year' },
  ]

  const docs = [
    { title:'Annual Report 2023',          size:'PDF • 2.4 MB', icon:'📊', color:'#F3E5F5', border:'#6B2D8B', desc:'Full 2023 report — programmes, financials and impact stories.' },
    { title:'Financial Audit 2023',        size:'PDF • 1.1 MB', icon:'💰', color:'#E8F5E9', border:'#2E7D32', desc:'Independent third-party audit of all funds received and disbursed.' },
    { title:'Child Protection Policy',     size:'PDF • 420 KB', icon:'🛡️', color:'#E3F2FD', border:'#1A4B8C', desc:'Our comprehensive safeguarding policy for all children in our care.' },
    { title:'Certificate of Registration', size:'PDF • 245 KB', icon:'📜', color:'#FFF8E1', border:'#D4A017', desc:'Official NGO registration from the NGO Board of Zambia.' },
    { title:'Board Constitution',          size:'PDF • 560 KB', icon:'⚖️', color:'#FCE4EC', border:'#C62828', desc:'Our founding constitution and board governance framework.' },
    { title:'Strategic Plan 2024–2026',    size:'PDF • 890 KB', icon:'🗺️', color:'#F3E5F5', border:'#6B2D8B', desc:'Three-year strategic plan for scaling impact across Zambia.' },
  ]

  const sdgs = [
    { goal:'SDG 1',  title:'No Poverty',          icon:'🏠', color:'#E8253B', value:'250 families',   desc:'lifted from extreme poverty' },
    { goal:'SDG 2',  title:'Zero Hunger',          icon:'🌾', color:'#DDA838', value:'12,000+',        desc:'meals served in 2023' },
    { goal:'SDG 3',  title:'Good Health',          icon:'❤️', color:'#4C9F38', value:'220 children',   desc:'under health monitoring' },
    { goal:'SDG 4',  title:'Quality Education',    icon:'📚', color:'#C31E33', value:'94%',            desc:'school pass rate' },
    { goal:'SDG 10', title:'Reduced Inequalities', icon:'⚖️', color:'#DD1367', value:'18 communities', desc:'reached across Zambia' },
    { goal:'SDG 16', title:'Peace & Justice',      icon:'🕊️', color:'#01689D', value:'100%',           desc:'child protection compliance' },
  ]

  const statCards = [
    { key:'children',    icon:'👶', label:'Children Supported',  color:'#6B2D8B' },
    { key:'meals',       icon:'🍽️', label:'Meals Provided',      color:'#F57C00' },
    { key:'schools',     icon:'🏫', label:'Schools Supported',   color:'#2E7D32' },
    { key:'communities', icon:'🏘️', label:'Communities Reached', color:'#1A4B8C' },
    { key:'volunteers',  icon:'🙋', label:'Active Volunteers',   color:'#C62828' },
    { key:'hours',       icon:'⏰', label:'Volunteer Hours',     color:'#D4A017' },
  ]

  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p+1) % testimonials.length), 6000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setActiveStory(p => (p+1) % impactStories.length), 5000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.6) { setLiveRaised(p => p + Math.floor(Math.random()*400+100)); setLiveDonors(p => p + 1) }
    }, 9000)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !countersStarted) {
        setCountersStarted(true)
        const animate = (key, target) => {
          let start = 0; const step = target / 80
          const t = setInterval(() => {
            start += step
            if (start >= target) { setCounts(p => ({...p, [key]: target})); clearInterval(t) }
            else setCounts(p => ({...p, [key]: Math.floor(start)}))
          }, 25)
        }
        animate('children', r.children); animate('meals', r.meals)
        animate('schools', r.schools);   animate('communities', r.communities)
        animate('volunteers', r.volunteers); animate('hours', r.hours)
      }
    }, { threshold: 0.2 })
    if (countersRef.current) observer.observe(countersRef.current)
    return () => observer.disconnect()
  }, [countersStarted, activeYear])

  useEffect(() => {
    setCountersStarted(false)
    setCounts({ children:0, meals:0, schools:0, communities:0, volunteers:0, hours:0 })
  }, [activeYear])

  const sl = { color:'var(--gold)', fontSize:'11px', fontWeight:'700', letterSpacing:'4px', textTransform:'uppercase', fontFamily:"'Lato', sans-serif", marginBottom:'12px' }
  const st = { fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,4vw,44px)', color:'var(--purple)', marginBottom:'0', lineHeight:1.15 }

  return (
    <div>
      {shareToast && (
        <div style={{ position:'fixed', bottom:'32px', left:'50%', transform:'translateX(-50%)', backgroundColor:'var(--dark)', color:'white', padding:'12px 24px', borderRadius:'50px', fontSize:'14px', fontFamily:"'Lato', sans-serif", fontWeight:'700', zIndex:9999, whiteSpace:'nowrap' }}>✅ Link copied!</div>
      )}

      {/* HERO */}
      <section style={{ background:'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 55%, #9C3ABB 100%)', padding:'80px 24px 60px', textAlign:'center', position:'relative', overflow:'hidden', minHeight:'420px', display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ position:'absolute', width:'500px', height:'500px', borderRadius:'50%', background:'rgba(244,196,48,0.06)', top:'-180px', right:'-150px', pointerEvents:'none' }} />
        <div style={{ maxWidth:'780px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-block', background:'rgba(244,196,48,0.18)', border:'1px solid var(--gold)', color:'var(--gold)', fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', padding:'8px 22px', borderRadius:'50px', marginBottom:'28px', fontFamily:"'Lato', sans-serif" }}>✦ Transparency & Accountability</div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(34px,6vw,66px)', color:'var(--white)', lineHeight:1.08, marginBottom:'22px' }}>Impact & <span style={{ color:'var(--gold)' }}>Reports</span></h1>
          <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.82)', fontFamily:"'Lato', sans-serif", lineHeight:1.85, maxWidth:'600px', margin:'0 auto 36px' }}>Every number is a name. Every percentage is a life changed. We publish full audited reports because our donors deserve to see exactly what their generosity achieves.</p>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap', marginBottom:'36px' }}>
            {[{ value:`K${liveRaised.toLocaleString()}`, label:'Raised This Year', live:true },{ value:`${liveDonors}+`, label:'Donors Worldwide', live:true },{ value:'75%', label:'Direct to Programmes' }].map(stat => (
              <div key={stat.label} style={{ backgroundColor:'rgba(255,255,255,0.1)', border:'1px solid rgba(255,255,255,0.18)', borderRadius:'16px', padding:'16px 24px', textAlign:'center', position:'relative', minWidth:'140px' }}>
                {stat.live && <span style={{ position:'absolute', top:'8px', right:'10px', width:'7px', height:'7px', borderRadius:'50%', backgroundColor:'#4CAF50', display:'block' }} />}
                <div style={{ fontFamily:"'Playfair Display', serif", fontSize:'26px', fontWeight:'900', color:'var(--gold)', lineHeight:1 }}>{stat.value}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.68)', fontFamily:"'Lato', sans-serif", textTransform:'uppercase', letterSpacing:'1px', marginTop:'5px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'10px', justifyContent:'center', flexWrap:'wrap' }}>
            <a href="#reports" style={{ backgroundColor:'var(--gold)', color:'var(--dark)', padding:'12px 24px', borderRadius:'50px', fontWeight:'700', fontSize:'14px', fontFamily:"'Lato', sans-serif", textDecoration:'none' }}>View Reports ↓</a>
            <button onClick={() => { if (navigator.clipboard) navigator.clipboard.writeText(window.location.href); setShareToast(true); setTimeout(() => setShareToast(false), 2500) }} style={{ backgroundColor:'rgba(255,255,255,0.15)', color:'var(--white)', padding:'12px 24px', borderRadius:'50px', fontWeight:'700', fontSize:'14px', fontFamily:"'Lato', sans-serif", border:'1px solid rgba(255,255,255,0.3)', cursor:'pointer' }}>🔗 Share This Page</button>
          </div>
          <div style={{ display:'flex', gap:'8px', justifyContent:'center', alignItems:'center', marginTop:'28px' }}>
            <Link href="/" style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px', fontFamily:"'Lato', sans-serif", textDecoration:'none' }}>Home</Link>
            <span style={{ color:'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color:'var(--gold)', fontSize:'13px', fontFamily:"'Lato', sans-serif" }}>Impact & Reports</span>
          </div>
        </div>
      </section>

      {/* YEAR SELECTOR */}
      <section id="reports" style={{ backgroundColor:'var(--white)', padding:'60px 24px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'36px' }}>
            <div style={sl}>Annual Reports</div>
            <h2 style={st}>Select a Year to Explore</h2>
            <div className="divider" style={{ margin:'12px auto 0' }} />
          </div>
          <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
            {Object.values(reports).reverse().map(rep => (
              <div key={rep.year} onClick={() => setActiveYear(rep.year)} style={{ cursor:'pointer', borderRadius:'20px', padding:'24px 32px', border:'3px solid', borderColor: activeYear===rep.year ? rep.color : 'rgba(107,45,139,0.1)', backgroundColor: activeYear===rep.year ? `${rep.color}12` : 'var(--cream)', textAlign:'center', transition:'all 0.3s ease', minWidth:'155px', transform: activeYear===rep.year ? 'translateY(-6px)' : 'none', boxShadow: activeYear===rep.year ? `0 16px 40px ${rep.color}25` : 'none' }}>
                <div style={{ fontFamily:"'Playfair Display', serif", fontSize:'38px', fontWeight:'900', color: activeYear===rep.year ? rep.color : 'var(--text-light)', lineHeight:1 }}>{rep.year}</div>
                <div style={{ fontSize:'13px', fontWeight:'700', color: activeYear===rep.year ? rep.color : 'var(--text-light)', fontFamily:"'Lato', sans-serif", marginTop:'6px' }}>{rep.theme}</div>
                <div style={{ fontSize:'11px', color:'var(--text-light)', fontFamily:"'Lato', sans-serif", marginTop:'4px' }}>{rep.children} children reached</div>
                {activeYear===rep.year && <div style={{ marginTop:'10px', backgroundColor:rep.color, color:'white', fontSize:'10px', fontWeight:'700', padding:'3px 10px', borderRadius:'20px', fontFamily:"'Lato', sans-serif", display:'inline-block' }}>✓ VIEWING</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COUNTERS */}
      <section ref={countersRef} style={{ background:'linear-gradient(135deg, var(--purple-dark), var(--purple))', padding:'70px 24px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'40px' }}>
            <h2 style={{ fontFamily:"'Playfair Display', serif", color:'var(--white)', fontSize:'clamp(24px,4vw,40px)', marginBottom:'6px' }}>{r.year} — <span style={{ color:'var(--gold)' }}>{r.theme}</span></h2>
            <p style={{ color:'rgba(255,255,255,0.65)', fontFamily:"'Lato', sans-serif", fontSize:'16px', margin:0 }}>{r.tagline}</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(155px, 1fr))', gap:'16px', marginBottom:'32px' }}>
            {statCards.map(stat => (
              <div key={stat.key} style={{ padding:'22px 14px', borderRadius:'16px', background:'rgba(255,255,255,0.07)', border:'1px solid rgba(255,255,255,0.12)', textAlign:'center' }}
                onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
                onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
              >
                <div style={{ fontSize:'26px', marginBottom:'8px' }}>{stat.icon}</div>
                <div style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,4vw,40px)', fontWeight:'900', color:'var(--gold)', lineHeight:1, marginBottom:'6px' }}>{counts[stat.key].toLocaleString()}</div>
                <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.65)', textTransform:'uppercase', letterSpacing:'1px', fontFamily:"'Lato', sans-serif" }}>{stat.label}</div>
              </div>
            ))}
          </div>
          <div style={{ backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'16px', padding:'28px 32px', textAlign:'center', border:'1px solid rgba(255,255,255,0.14)', display:'flex', gap:'32px', justifyContent:'center', alignItems:'center', flexWrap:'wrap' }}>
            <div>
              <p style={{ color:'rgba(255,255,255,0.6)', fontFamily:"'Lato', sans-serif", fontSize:'13px', margin:'0 0 6px', textTransform:'uppercase', letterSpacing:'2px' }}>Total Funds Raised {r.year}</p>
              <div style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(36px,6vw,60px)', fontWeight:'900', color:'var(--gold)', lineHeight:1 }}>K{r.raised.toLocaleString()}</div>
            </div>
            <div style={{ width:'1px', height:'60px', backgroundColor:'rgba(255,255,255,0.15)' }} />
            <div style={{ textAlign:'left' }}>
              <p style={{ color:'rgba(255,255,255,0.6)', fontFamily:"'Lato', sans-serif", fontSize:'12px', margin:'0 0 6px' }}>📜 Independently audited</p>
              <p style={{ color:'rgba(255,255,255,0.6)', fontFamily:"'Lato', sans-serif", fontSize:'12px', margin:'0 0 6px' }}>✅ 75% direct to programmes</p>
              <p style={{ color:'rgba(255,255,255,0.6)', fontFamily:"'Lato', sans-serif", fontSize:'12px', margin:0 }}>📊 Full breakdown below</p>
            </div>
          </div>
        </div>
      </section>

      {/* TABS */}
      <section style={{ backgroundColor:'var(--cream)', padding:'80px 24px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', marginBottom:'50px' }}>
            {[{ id:'metrics', label:'📊 Success Metrics' },{ id:'highlights', label:'✨ Year Highlights' },{ id:'stories', label:'💛 Impact Stories' },{ id:'downloads', label:'📁 Downloads' }].map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding:'13px 26px', borderRadius:'50px', border:'2px solid var(--purple)', backgroundColor: activeTab===tab.id ? 'var(--purple)' : 'transparent', color: activeTab===tab.id ? 'white' : 'var(--purple)', fontWeight:'700', fontSize:'14px', fontFamily:"'Lato', sans-serif", cursor:'pointer', transition:'all 0.3s ease' }}>{tab.label}</button>
            ))}
          </div>

          {activeTab === 'metrics' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(290px, 1fr))', gap:'20px', marginBottom:'50px' }}>
                {metrics.map((m, i) => (
                  <div key={i} style={{ backgroundColor:'var(--white)', borderRadius:'18px', padding:'26px', boxShadow:'0 4px 20px rgba(107,45,139,0.07)', transition:'transform 0.2s ease' }}
                    onMouseEnter={e => e.currentTarget.style.transform='translateY(-4px)'}
                    onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
                  >
                    <div style={{ display:'flex', gap:'14px', alignItems:'center', marginBottom:'18px' }}>
                      <div style={{ width:'50px', height:'50px', borderRadius:'14px', backgroundColor:m.bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'26px', flexShrink:0 }}>{m.icon}</div>
                      <div>
                        <p style={{ margin:0, fontSize:'12px', color:'var(--text-light)', fontFamily:"'Lato', sans-serif", textTransform:'uppercase', letterSpacing:'1px', fontWeight:'700' }}>{m.label}</p>
                        <div style={{ fontFamily:"'Playfair Display', serif", fontSize:'34px', fontWeight:'900', color:m.color, lineHeight:1 }}>{m.value}</div>
                      </div>
                    </div>
                    <div style={{ backgroundColor:'var(--grey)', borderRadius:'50px', height:'9px', overflow:'hidden', marginBottom:'8px' }}>
                      <div style={{ width:`${m.progress}%`, height:'100%', backgroundColor:m.color, borderRadius:'50px', transition:'width 1.4s ease' }} />
                    </div>
                    <p style={{ margin:0, fontSize:'12px', color:'var(--text-light)', fontFamily:"'Lato', sans-serif" }}>{m.desc}</p>
                  </div>
                ))}
              </div>
              <div style={{ backgroundColor:'var(--white)', borderRadius:'24px', padding:'40px', boxShadow:'0 4px 24px rgba(107,45,139,0.08)', marginBottom:'32px' }}>
                <h3 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'24px', marginBottom:'8px' }}>Where Your Money Goes</h3>
                <p style={{ color:'var(--text-light)', fontFamily:"'Lato', sans-serif", fontSize:'14px', marginBottom:'32px' }}>Every kwacha is accounted for. Breakdown for {r.year}.</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(220px, 1fr))', gap:'20px' }}>
                  {[{ pct:75, label:'Direct Programme Costs', color:'#6B2D8B', desc:'Education, nutrition, care and healing' },{ pct:15, label:'Staff & Operations', color:'#2E7D32', desc:'Salaries, travel, field costs' },{ pct:7, label:'Administration', color:'#1A4B8C', desc:'Finance, legal, governance' },{ pct:3, label:'Fundraising', color:'#D4A017', desc:'Events, marketing, campaigns' }].map((item, i) => (
                    <div key={i} style={{ textAlign:'center' }}>
                      <div style={{ position:'relative', width:'90px', height:'90px', margin:'0 auto 16px' }}>
                        <svg viewBox="0 0 36 36" style={{ transform:'rotate(-90deg)', width:'90px', height:'90px' }}>
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--grey)" strokeWidth="3" />
                          <circle cx="18" cy="18" r="15.9" fill="none" stroke={item.color} strokeWidth="3" strokeDasharray={`${item.pct} ${100-item.pct}`} strokeLinecap="round" />
                        </svg>
                        <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', fontFamily:"'Playfair Display', serif", fontSize:'18px', fontWeight:'900', color:item.color }}>{item.pct}%</div>
                      </div>
                      <p style={{ margin:'0 0 4px', fontWeight:'700', fontSize:'14px', color:'var(--text)', fontFamily:"'Lato', sans-serif" }}>{item.label}</p>
                      <p style={{ margin:0, fontSize:'12px', color:'var(--text-light)', fontFamily:"'Lato', sans-serif" }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ backgroundColor:'var(--white)', borderRadius:'24px', padding:'40px', boxShadow:'0 4px 24px rgba(107,45,139,0.08)' }}>
                <h3 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'24px', marginBottom:'6px' }}>Year-on-Year Growth</h3>
                <p style={{ color:'var(--text-light)', fontFamily:"'Lato', sans-serif", fontSize:'14px', marginBottom:'32px' }}>Click a bar to jump to that year's full report.</p>
                <div style={{ display:'flex', gap:'16px', alignItems:'flex-end', height:'200px', padding:'0 8px' }}>
                  {growthData.map((d, i) => {
                    const h = Math.round((d.children / maxChildren) * 170)
                    const isActive = activeYear === d.year
                    const isHovered = chartHover === d.year
                    return (
                      <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:'8px', height:'100%', justifyContent:'flex-end' }}>
                        {(isHovered || isActive) && <div style={{ backgroundColor:'var(--dark)', color:'white', fontSize:'11px', padding:'4px 8px', borderRadius:'6px', fontFamily:"'Lato', sans-serif", whiteSpace:'nowrap' }}>{d.children} children · K{d.raised.toLocaleString()}</div>}
                        <div onClick={() => setActiveYear(d.year)} onMouseEnter={() => setChartHover(d.year)} onMouseLeave={() => setChartHover(null)} style={{ width:'100%', height:`${h}px`, borderRadius:'8px 8px 0 0', background: isActive ? `linear-gradient(180deg, ${d.color}, ${d.color}bb)` : 'var(--grey)', cursor:'pointer', transition:'all 0.4s ease', boxShadow: isActive ? `0 -4px 16px ${d.color}40` : 'none' }} />
                        <div style={{ fontSize:'13px', fontWeight:'700', color: isActive ? d.color : 'var(--text-light)', fontFamily:"'Lato', sans-serif" }}>{d.year}</div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'highlights' && (
            <div style={{ maxWidth:'820px', margin:'0 auto' }}>
              <div style={{ textAlign:'center', marginBottom:'40px' }}>
                <h3 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'32px', marginBottom:'6px' }}>{r.year} Highlights</h3>
                <p style={{ color:'var(--text-light)', fontFamily:"'Lato', sans-serif", fontSize:'16px' }}>{r.tagline}</p>
              </div>
              <div style={{ position:'relative', paddingLeft:'40px' }}>
                <div style={{ position:'absolute', left:'16px', top:0, bottom:0, width:'2px', backgroundColor:r.color, opacity:0.25 }} />
                {r.highlights.map((h, i) => (
                  <div key={i} style={{ position:'relative', marginBottom:'24px' }}>
                    <div style={{ position:'absolute', left:'-32px', top:'18px', width:'14px', height:'14px', borderRadius:'50%', backgroundColor:r.color, border:'3px solid white', boxShadow:`0 0 0 3px ${r.color}30` }} />
                    <div style={{ backgroundColor:'var(--white)', borderRadius:'16px', padding:'20px 24px', boxShadow:'0 4px 16px rgba(107,45,139,0.06)', borderLeft:`4px solid ${r.color}` }}>
                      <div style={{ display:'flex', gap:'14px', alignItems:'flex-start' }}>
                        <div style={{ width:'32px', height:'32px', borderRadius:'50%', backgroundColor:r.color, color:'white', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'900', fontFamily:"'Lato', sans-serif", fontSize:'14px', flexShrink:0 }}>{i+1}</div>
                        <p style={{ margin:0, fontSize:'16px', color:'var(--text)', fontFamily:"'Lato', sans-serif", lineHeight:1.65 }}>{h}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop:'40px', padding:'36px', background:'linear-gradient(135deg, var(--purple-dark), var(--purple))', borderRadius:'20px', textAlign:'center' }}>
                <p style={{ color:'var(--gold)', fontFamily:"'Playfair Display', serif", fontSize:'22px', marginBottom:'10px' }}>🙏 Thank You to Our {r.year} Donors & Partners</p>
                <p style={{ color:'rgba(255,255,255,0.8)', fontFamily:"'Lato', sans-serif", fontSize:'15px', margin:'0 0 20px', lineHeight:1.7 }}>These results are yours. Every contribution — however large or small — made this possible.</p>
                <Link href="/donate" style={{ backgroundColor:'var(--gold)', color:'var(--dark)', padding:'12px 28px', borderRadius:'50px', fontWeight:'700', fontSize:'14px', fontFamily:"'Lato', sans-serif", textDecoration:'none' }}>Support Our {new Date().getFullYear()} Work →</Link>
              </div>
            </div>
          )}

          {activeTab === 'stories' && (
            <div>
              <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', marginBottom:'40px' }}>
                {programFilters.map(f => (
                  <button key={f} onClick={() => setFilterProgram(f)} style={{ padding:'8px 18px', borderRadius:'50px', border:'2px solid var(--purple)', backgroundColor: filterProgram===f ? 'var(--purple)' : 'transparent', color: filterProgram===f ? 'white' : 'var(--purple)', fontWeight:'700', fontSize:'13px', fontFamily:"'Lato', sans-serif", cursor:'pointer', transition:'all 0.2s ease' }}>{f}</button>
                ))}
              </div>
              <div style={{ maxWidth:'820px', margin:'0 auto 40px' }}>
                <div style={{ backgroundColor:impactStories[activeStory].color, borderRadius:'24px', padding:'36px', borderLeft:`5px solid ${impactStories[activeStory].border}` }}>
                  <div style={{ display:'flex', gap:'16px', alignItems:'center', marginBottom:'20px' }}>
                    <div style={{ width:'60px', height:'60px', borderRadius:'50%', background:`linear-gradient(135deg, ${impactStories[activeStory].border}, var(--purple-light))`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'30px', flexShrink:0 }}>{impactStories[activeStory].avatar}</div>
                    <div>
                      <h3 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'22px', margin:0 }}>{impactStories[activeStory].name}</h3>
                      <div style={{ display:'flex', gap:'8px', marginTop:'4px' }}>
                        <span style={{ backgroundColor:impactStories[activeStory].border, color:'white', fontSize:'11px', fontWeight:'700', padding:'2px 8px', borderRadius:'20px', fontFamily:"'Lato', sans-serif" }}>{impactStories[activeStory].program}</span>
                        <span style={{ fontSize:'12px', color:'var(--text-light)', fontFamily:"'Lato', sans-serif" }}>📍 {impactStories[activeStory].location}</span>
                      </div>
                    </div>
                    <span style={{ fontSize:'36px', marginLeft:'auto' }}>{impactStories[activeStory].icon}</span>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px' }}>
                    <div style={{ backgroundColor:'rgba(255,255,255,0.5)', borderRadius:'14px', padding:'16px', borderLeft:'3px solid #C62828' }}>
                      <p style={{ margin:'0 0 6px', fontSize:'11px', fontWeight:'700', color:'#C62828', fontFamily:"'Lato', sans-serif", textTransform:'uppercase', letterSpacing:'1px' }}>Before</p>
                      <p style={{ margin:0, fontSize:'14px', color:'var(--text)', fontFamily:"'Lato', sans-serif", lineHeight:1.6 }}>{impactStories[activeStory].before}</p>
                    </div>
                    <div style={{ backgroundColor:'rgba(255,255,255,0.5)', borderRadius:'14px', padding:'16px', borderLeft:`3px solid ${impactStories[activeStory].border}` }}>
                      <p style={{ margin:'0 0 6px', fontSize:'11px', fontWeight:'700', color:impactStories[activeStory].border, fontFamily:"'Lato', sans-serif", textTransform:'uppercase', letterSpacing:'1px' }}>After</p>
                      <p style={{ margin:0, fontSize:'14px', color:'var(--text)', fontFamily:"'Lato', sans-serif", lineHeight:1.6 }}>{impactStories[activeStory].after}</p>
                    </div>
                  </div>
                </div>
                <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginTop:'16px' }}>
                  {impactStories.map((_, i) => (
                    <button key={i} onClick={() => setActiveStory(i)} style={{ width: activeStory===i ? '28px' : '10px', height:'10px', borderRadius:'5px', backgroundColor: activeStory===i ? 'var(--purple)' : 'rgba(107,45,139,0.2)', border:'none', cursor:'pointer', transition:'all 0.3s ease', padding:0 }} />
                  ))}
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'20px' }}>
                {impactStories.filter(s => filterProgram==='All' || s.program===filterProgram).map((story, i) => (
                  <div key={i} onClick={() => setActiveStory(impactStories.indexOf(story))} style={{ backgroundColor:story.color, borderRadius:'18px', padding:'24px', borderLeft:`4px solid ${story.border}`, cursor:'pointer', transition:'transform 0.2s ease' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(0,0,0,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
                  >
                    <div style={{ display:'flex', gap:'10px', alignItems:'center', marginBottom:'16px' }}>
                      <span style={{ fontSize:'32px' }}>{story.avatar}</span>
                      <div>
                        <h4 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'18px', margin:0 }}>{story.name}</h4>
                        <span style={{ fontSize:'11px', fontWeight:'700', color:story.border, fontFamily:"'Lato', sans-serif", textTransform:'uppercase' }}>{story.program} · {story.location}</span>
                      </div>
                    </div>
                    <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                      <div style={{ fontSize:'13px', color:'var(--text)', fontFamily:"'Lato', sans-serif", lineHeight:1.6, backgroundColor:'rgba(255,255,255,0.5)', padding:'10px 12px', borderRadius:'10px' }}><span style={{ fontWeight:'700', color:'#C62828' }}>Before: </span>{story.before}</div>
                      <div style={{ fontSize:'13px', color:'var(--text)', fontFamily:"'Lato', sans-serif", lineHeight:1.6, backgroundColor:'rgba(255,255,255,0.5)', padding:'10px 12px', borderRadius:'10px' }}><span style={{ fontWeight:'700', color:story.border }}>After: </span>{story.after}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'downloads' && (
            <div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(310px, 1fr))', gap:'20px' }}>
                {docs.map((doc, i) => (
                  <a key={i} href="#" style={{ display:'flex', gap:'16px', backgroundColor:doc.color, borderRadius:'16px', padding:'22px', textDecoration:'none', transition:'all 0.25s ease', border:'2px solid transparent' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=doc.border }}
                    onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='transparent' }}
                  >
                    <div style={{ width:'54px', height:'54px', borderRadius:'14px', backgroundColor:'white', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', flexShrink:0 }}>{doc.icon}</div>
                    <div style={{ flex:1 }}>
                      <p style={{ margin:'0 0 3px', fontWeight:'700', fontSize:'15px', color:'var(--text)', fontFamily:"'Lato', sans-serif" }}>{doc.title}</p>
                      <p style={{ margin:'0 0 8px', fontSize:'12px', color:doc.border, fontFamily:"'Lato', sans-serif", fontWeight:'700' }}>{doc.size}</p>
                      <p style={{ margin:0, fontSize:'12px', color:'var(--text-light)', fontFamily:"'Lato', sans-serif", lineHeight:1.55 }}>{doc.desc}</p>
                    </div>
                    <div style={{ fontSize:'22px', color:doc.border, flexShrink:0, alignSelf:'center' }}>⬇</div>
                  </a>
                ))}
              </div>
              <div style={{ textAlign:'center', marginTop:'28px', padding:'20px', backgroundColor:'var(--white)', borderRadius:'14px', border:'1px solid rgba(107,45,139,0.08)' }}>
                <p style={{ color:'var(--text-light)', fontFamily:"'Lato', sans-serif", fontSize:'14px', margin:0 }}>
                  🔒 All documents are publicly available and independently verified. Need a specific document?{' '}
                  <Link href="/contact" style={{ color:'var(--purple)', fontWeight:'700', textDecoration:'none' }}>Contact us →</Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ backgroundColor:'var(--white)', padding:'80px 24px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <div style={sl}>Voices of Impact</div>
            <h2 style={st}>What They Say</h2>
            <div className="divider" style={{ margin:'12px auto 16px' }} />
          </div>
          <div style={{ maxWidth:'820px', margin:'0 auto 40px' }}>
            <div style={{ backgroundColor:testimonials[activeTestimonial].color, borderRadius:'24px', padding:'40px', borderLeft:`5px solid ${testimonials[activeTestimonial].border}`, position:'relative', minHeight:'220px' }}>
              <div style={{ fontFamily:"'Playfair Display', serif", fontSize:'100px', color:testimonials[activeTestimonial].border, opacity:0.08, position:'absolute', top:'-15px', left:'18px', lineHeight:1, userSelect:'none' }}>"</div>
              <div style={{ display:'flex', gap:'14px', alignItems:'center', marginBottom:'20px' }}>
                <div style={{ width:'58px', height:'58px', borderRadius:'50%', background:`linear-gradient(135deg, ${testimonials[activeTestimonial].border}, var(--purple-light))`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'28px', flexShrink:0 }}>{testimonials[activeTestimonial].avatar}</div>
                <div style={{ flex:1 }}>
                  <p style={{ margin:0, fontFamily:"'Playfair Display', serif", fontWeight:'700', fontSize:'18px', color:'var(--purple)' }}>{testimonials[activeTestimonial].name}</p>
                  <p style={{ margin:0, fontSize:'13px', color:testimonials[activeTestimonial].border, fontFamily:"'Lato', sans-serif", fontWeight:'700' }}>{testimonials[activeTestimonial].role}</p>
                  <p style={{ margin:0, fontSize:'12px', color:'var(--text-light)', fontFamily:"'Lato', sans-serif" }}>📍 {testimonials[activeTestimonial].location} · {testimonials[activeTestimonial].program}</p>
                </div>
                <span style={{ backgroundColor:testimonials[activeTestimonial].border, color:'white', fontSize:'11px', fontWeight:'700', padding:'4px 12px', borderRadius:'20px', fontFamily:"'Lato', sans-serif", flexShrink:0 }}>{testimonials[activeTestimonial].year}</span>
              </div>
              <p style={{ fontSize:'17px', lineHeight:1.9, color:'var(--text)', fontStyle:'italic', margin:'0 0 20px', position:'relative', zIndex:1 }}>"{testimonials[activeTestimonial].quote}"</p>
              <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                <span style={{ fontSize:'14px' }}>✅</span>
                <span style={{ fontSize:'13px', fontWeight:'700', color:testimonials[activeTestimonial].border, fontFamily:"'Lato', sans-serif" }}>{testimonials[activeTestimonial].outcome}</span>
              </div>
            </div>
            <div style={{ display:'flex', gap:'8px', justifyContent:'center', marginTop:'20px' }}>
              {testimonials.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)} style={{ width: activeTestimonial===i ? '28px' : '10px', height:'10px', borderRadius:'5px', backgroundColor: activeTestimonial===i ? 'var(--purple)' : 'rgba(107,45,139,0.2)', border:'none', cursor:'pointer', transition:'all 0.3s ease', padding:0 }} />
              ))}
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(200px, 1fr))', gap:'12px' }}>
            {testimonials.map((t, i) => (
              <div key={i} onClick={() => setActiveTestimonial(i)} style={{ backgroundColor:t.color, borderRadius:'14px', padding:'16px', cursor:'pointer', border:`2px solid ${activeTestimonial===i ? t.border : 'transparent'}`, transition:'all 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >
                <div style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'8px' }}>
                  <span style={{ fontSize:'22px' }}>{t.avatar}</span>
                  <div>
                    <p style={{ margin:0, fontSize:'13px', fontWeight:'700', color:'var(--purple)', fontFamily:"'Lato', sans-serif" }}>{t.name}</p>
                    <p style={{ margin:0, fontSize:'11px', color:t.border, fontFamily:"'Lato', sans-serif", fontWeight:'600' }}>{t.program}</p>
                  </div>
                </div>
                <p style={{ margin:0, fontSize:'12px', color:'var(--text-light)', fontFamily:"'Lato', sans-serif", lineHeight:1.55, display:'-webkit-box', WebkitLineClamp:2, WebkitBoxOrient:'vertical', overflow:'hidden' }}>"{t.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SDGs */}
      <section style={{ backgroundColor:'var(--cream)', padding:'80px 24px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <div style={sl}>Global Goals</div>
            <h2 style={st}>UN SDG Alignment</h2>
            <div className="divider" style={{ margin:'12px auto 16px' }} />
            <p style={{ color:'var(--text-light)', fontSize:'16px', fontFamily:"'Lato', sans-serif", maxWidth:'540px', margin:'0 auto' }}>Our work directly contributes to 6 of the 17 UN Sustainable Development Goals.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(290px, 1fr))', gap:'18px' }}>
            {sdgs.map((sdg, i) => (
              <div key={i} style={{ backgroundColor:'var(--white)', borderRadius:'16px', padding:'22px', display:'flex', gap:'16px', alignItems:'center', boxShadow:'0 4px 16px rgba(107,45,139,0.06)', transition:'transform 0.2s ease' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >
                <div style={{ width:'62px', height:'62px', borderRadius:'14px', backgroundColor:sdg.color, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', flexShrink:0, gap:'2px' }}>
                  <span style={{ fontSize:'24px' }}>{sdg.icon}</span>
                  <span style={{ fontSize:'9px', color:'rgba(255,255,255,0.9)', fontWeight:'700', fontFamily:"'Lato', sans-serif" }}>{sdg.goal}</span>
                </div>
                <div>
                  <p style={{ margin:'0 0 2px', fontSize:'11px', color:'var(--text-light)', textTransform:'uppercase', letterSpacing:'1px', fontFamily:"'Lato', sans-serif", fontWeight:'700' }}>{sdg.title}</p>
                  <p style={{ margin:'0 0 4px', fontFamily:"'Playfair Display', serif", fontSize:'22px', fontWeight:'900', color:sdg.color, lineHeight:1 }}>{sdg.value}</p>
                  <p style={{ margin:0, fontSize:'13px', color:'var(--text-light)', fontFamily:"'Lato', sans-serif" }}>{sdg.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLEDGE */}
      <section style={{ background:'linear-gradient(135deg, var(--purple-dark), var(--purple))', padding:'80px 24px' }}>
        <div style={{ maxWidth:'900px', margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:'52px', marginBottom:'16px' }}>🔒</div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", color:'var(--white)', fontSize:'clamp(28px,4vw,44px)', marginBottom:'16px' }}>Our Transparency <span style={{ color:'var(--gold)' }}>Pledge</span></h2>
          <p style={{ color:'rgba(255,255,255,0.8)', fontFamily:"'Lato', sans-serif", fontSize:'17px', lineHeight:1.85, maxWidth:'640px', margin:'0 auto 40px' }}>We commit to publishing audited financials annually, reporting honestly on both successes and setbacks, and ensuring every donor can see exactly how their generosity is used.</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(185px, 1fr))', gap:'14px', marginBottom:'40px' }}>
            {[{ icon:'📊', text:'Annual audited financial reports' },{ icon:'📸', text:'Photo & video impact documentation' },{ icon:'📧', text:'Quarterly donor newsletters' },{ icon:'🏛️', text:'Independent board oversight' }].map((item, i) => (
              <div key={i} style={{ backgroundColor:'rgba(255,255,255,0.08)', borderRadius:'14px', padding:'20px 16px', border:'1px solid rgba(255,255,255,0.12)', textAlign:'center' }}>
                <div style={{ fontSize:'28px', marginBottom:'8px' }}>{item.icon}</div>
                <p style={{ margin:0, fontSize:'13px', color:'rgba(255,255,255,0.8)', fontFamily:"'Lato', sans-serif", lineHeight:1.55 }}>{item.text}</p>
              </div>
            ))}
          </div>
          <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
            <Link href="/donate" style={{ backgroundColor:'var(--gold)', color:'var(--dark)', padding:'16px 36px', borderRadius:'50px', fontWeight:'700', fontSize:'16px', fontFamily:"'Lato', sans-serif", textDecoration:'none' }}>❤️ Donate With Confidence</Link>
            <Link href="/contact" style={{ backgroundColor:'transparent', color:'var(--white)', padding:'16px 36px', borderRadius:'50px', fontWeight:'700', fontSize:'16px', fontFamily:"'Lato', sans-serif", textDecoration:'none', border:'2px solid rgba(255,255,255,0.4)' }}>💬 Ask Us Anything</Link>
          </div>
        </div>
      </section>

      <div className="scripture-band">
        <h2>"By their fruits <span>you shall know them."</span></h2>
        <p>Matthew 7:16 — We let our impact speak for itself</p>
      </div>
    </div>
  )
}
