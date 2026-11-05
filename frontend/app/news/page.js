'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'

import { POSTS, EVENTS } from '../data/news'

export default function NewsPage() {
  const [activeTab, setActiveTab]             = useState('all')
  const [searchQuery, setSearchQuery]         = useState('')
  const [selectedPost, setSelectedPost]       = useState(null)
  const [email, setEmail]                     = useState('')
  const [subscribed, setSubscribed]           = useState(false)
  const [activeEvent, setActiveEvent]         = useState(0)
  const [readingProgress, setReadingProgress] = useState(0)
  const [bookmarks, setBookmarks]             = useState([])
  const [shareToast, setShareToast]           = useState('')
  const [countdown, setCountdown]             = useState({ days:0, hours:0, mins:0, secs:0 })
  const [likedPosts, setLikedPosts]           = useState({})
  const [commentText, setCommentText]         = useState('')
  const [commentName, setCommentName]         = useState('')
  const [commentSubmitted, setCommentSubmitted] = useState(false)
  const [posts, setPosts]                     = useState(POSTS)
  const [events, setEvents]                   = useState(EVENTS)
  const articleRef = useRef(null)

  const categories = [
    { id: 'all',        label: 'All Posts',  icon: '📰' },
    { id: 'story',      label: 'Stories',    icon: '💛' },
    { id: 'news',       label: 'News',       icon: '📢' },
    { id: 'press',      label: 'Press',      icon: '🗞️' },
    { id: 'devotional', label: 'Devotional', icon: '🙏' },
  ]

  const allTags = [...new Set(posts.flatMap(p => p.tags))]
  const [activeTag, setActiveTag] = useState('')

  const filtered = posts.filter(p => {
    const matchTab    = activeTab === 'all' || p.type === activeTab
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchTag    = !activeTag || p.tags.includes(activeTag)
    return matchTab && matchSearch && matchTag
  })

  const featured = posts.filter(p => p.featured)

  // Reading progress
  useEffect(() => {
    if (!selectedPost) return
    const handler = () => {
      const el = articleRef.current
      if (!el) return
      const { scrollTop, clientHeight } = document.documentElement
      const elTop    = el.offsetTop
      const elHeight = el.offsetHeight
      const progress = Math.min(100, Math.max(0, ((scrollTop - elTop) / (elHeight - clientHeight)) * 100))
      setReadingProgress(progress)
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [selectedPost])

  // Countdown to next event
  useEffect(() => {
    const nextEvent = events.find(e => e.eventDate > new Date()) || events[0]
    if (!nextEvent) return
    const t = setInterval(() => {
      const diff = nextEvent.eventDate - new Date()
      if (diff <= 0) { clearInterval(t); return }
      setCountdown({
        days:  Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins:  Math.floor((diff % 3600000)  / 60000),
        secs:  Math.floor((diff % 60000)    / 1000),
      })
    }, 1000)
    return () => clearInterval(t)
  }, [events])

  // Auto-rotate events
  useEffect(() => {
    if (events.length < 2) return
    const t = setInterval(() => setActiveEvent(p => (p + 1) % events.length), 5000)
    return () => clearInterval(t)
  }, [events.length])

  const toggleBookmark = (id) => setBookmarks(b => b.includes(id) ? b.filter(x => x !== id) : [...b, id])
  const toggleLike     = (id) => setLikedPosts(p => ({ ...p, [id]: !p[id] }))
  const handleShare    = (title) => {
    if (navigator.clipboard) navigator.clipboard.writeText(window.location.href)
    setShareToast(title)
    setTimeout(() => setShareToast(''), 2500)
  }
  const openPost = (post) => {
    setSelectedPost(post)
    setReadingProgress(0)
    setCommentSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const base = { fontFamily: "'Lato', sans-serif" }

  // ════ ARTICLE VIEW ════════════════════════════════════════════════════════
  if (selectedPost) {
    const post = selectedPost
    return (
      <div>
        <div style={{ position:'fixed', top:0, left:0, right:0, height:'3px', backgroundColor:'var(--grey)', zIndex:9999 }}>
          <div style={{ height:'100%', width:`${readingProgress}%`, background:'linear-gradient(90deg, var(--purple), var(--gold))', transition:'width 0.1s linear' }} />
        </div>

        <div style={{ backgroundColor:'var(--white)', borderBottom:'1px solid rgba(107,45,139,0.08)', padding:'16px 24px', position:'sticky', top:0, zIndex:100 }}>
          <div style={{ maxWidth:'820px', margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <button onClick={() => setSelectedPost(null)} style={{ display:'flex', alignItems:'center', gap:'8px', backgroundColor:'transparent', border:'none', color:'var(--purple)', fontWeight:'700', fontSize:'14px', fontFamily:"'Lato', sans-serif", cursor:'pointer' }}>
              ← Back to News
            </button>
            <div style={{ display:'flex', gap:'10px' }}>
              <button onClick={() => toggleBookmark(post.id)} style={{ backgroundColor: bookmarks.includes(post.id) ? 'var(--gold)' : 'var(--cream)', border:'none', borderRadius:'50px', padding:'8px 14px', fontSize:'13px', cursor:'pointer', fontFamily:"'Lato', sans-serif", fontWeight:'700', color:'var(--dark)' }}>
                {bookmarks.includes(post.id) ? '🔖 Saved' : '🔖 Save'}
              </button>
              <button onClick={() => handleShare(post.title)} style={{ backgroundColor:'var(--purple)', border:'none', borderRadius:'50px', padding:'8px 14px', fontSize:'13px', cursor:'pointer', fontFamily:"'Lato', sans-serif", fontWeight:'700', color:'white' }}>
                🔗 Share
              </button>
            </div>
          </div>
        </div>

        <article ref={articleRef} style={{ maxWidth:'820px', margin:'0 auto', padding:'60px 24px 80px' }}>
          <div style={{ display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap', marginBottom:'20px' }}>
            <span style={{ backgroundColor:post.border, color:'white', fontSize:'11px', fontWeight:'700', padding:'4px 12px', borderRadius:'20px', fontFamily:"'Lato', sans-serif" }}>{post.category}</span>
            <span style={{ fontSize:'13px', color:'var(--text-light)', ...base }}>📅 {post.date}</span>
            <span style={{ fontSize:'13px', color:'var(--text-light)', ...base }}>⏱️ {post.readTime}</span>
            <span style={{ fontSize:'13px', color:'var(--text-light)', ...base }}>✍️ {post.author}</span>
          </div>

          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(28px,5vw,46px)', color:'var(--purple)', lineHeight:1.15, marginBottom:'24px' }}>{post.title}</h1>

          {/* Cover image or emoji */}
          <div style={{ backgroundColor:post.color, borderRadius:'20px', height:'200px', display:'flex', alignItems:'center', justifyContent:'center', marginBottom:'40px', borderLeft:`6px solid ${post.border}`, overflow:'hidden' }}>
            {post.imageUrl
              ? <img src={post.imageUrl} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
              : <span style={{ fontSize:'80px' }}>{post.image}</span>
            }
          </div>

          <div style={{ ...base, fontSize:'17px', color:'var(--text)', lineHeight:1.95 }}>
            {typeof post.body === 'string'
              ? post.body.split('\n\n').map((para, i) => para.trim() ? <p key={i} style={{ marginBottom:'22px' }}>{para.trim()}</p> : null)
              : <p>{post.excerpt}</p>
            }
          </div>

          {post.tags.length > 0 && (
            <div style={{ display:'flex', gap:'8px', flexWrap:'wrap', marginTop:'32px', paddingTop:'24px', borderTop:'2px solid var(--grey)' }}>
              {post.tags.map(tag => (
                <span key={tag} style={{ backgroundColor:'var(--cream)', color:'var(--purple)', fontSize:'12px', fontWeight:'700', padding:'4px 12px', borderRadius:'20px', ...base }}>#{tag}</span>
              ))}
            </div>
          )}

          <div style={{ display:'flex', gap:'12px', marginTop:'28px', paddingTop:'24px', borderTop:'1px solid var(--grey)', flexWrap:'wrap', alignItems:'center' }}>
            <button onClick={() => toggleLike(post.id)} style={{ display:'flex', alignItems:'center', gap:'8px', backgroundColor: likedPosts[post.id] ? '#FCE4EC' : 'var(--cream)', border:'none', borderRadius:'50px', padding:'10px 20px', fontSize:'14px', cursor:'pointer', fontFamily:"'Lato', sans-serif", fontWeight:'700', color: likedPosts[post.id] ? '#C62828' : 'var(--text)' }}>
              ❤️ {(post.likes + (likedPosts[post.id] ? 1 : 0)).toLocaleString()} Likes
            </button>
            <button onClick={() => handleShare(post.title)} style={{ display:'flex', alignItems:'center', gap:'8px', backgroundColor:'var(--cream)', border:'none', borderRadius:'50px', padding:'10px 20px', fontSize:'14px', cursor:'pointer', fontFamily:"'Lato', sans-serif", fontWeight:'700', color:'var(--text)' }}>
              🔗 Share Article
            </button>
          </div>

          {/* Comment Form */}
          <div style={{ marginTop:'48px', backgroundColor:'var(--cream)', borderRadius:'20px', padding:'32px', border:'2px solid rgba(107,45,139,0.1)' }}>
            <h3 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'22px', marginBottom:'6px' }}>Leave a Comment</h3>
            <p style={{ ...base, color:'var(--text-light)', fontSize:'14px', marginBottom:'24px' }}>Share your thoughts or reaction to this story.</p>
            {!commentSubmitted ? (
              <>
                <input placeholder="Your name" value={commentName} onChange={e => setCommentName(e.target.value)} style={{ width:'100%', padding:'12px 16px', borderRadius:'10px', border:'2px solid rgba(107,45,139,0.15)', fontSize:'14px', ...base, outline:'none', marginBottom:'12px', boxSizing:'border-box', backgroundColor:'var(--white)', color:'var(--text)' }} />
                <textarea placeholder="Write your comment..." value={commentText} onChange={e => setCommentText(e.target.value)} rows={4} style={{ width:'100%', padding:'12px 16px', borderRadius:'10px', border:'2px solid rgba(107,45,139,0.15)', fontSize:'14px', ...base, outline:'none', marginBottom:'16px', resize:'none', boxSizing:'border-box', backgroundColor:'var(--white)', color:'var(--text)' }} />
                <button onClick={() => { if (commentName && commentText) setCommentSubmitted(true) }} style={{ backgroundColor:'var(--purple)', color:'white', padding:'12px 28px', borderRadius:'50px', border:'none', fontWeight:'700', fontSize:'14px', ...base, cursor:'pointer' }}>
                  💬 Post Comment
                </button>
              </>
            ) : (
              <div style={{ textAlign:'center', padding:'24px' }}>
                <div style={{ fontSize:'40px', marginBottom:'10px' }}>💬</div>
                <p style={{ ...base, fontWeight:'700', color:'var(--green)', fontSize:'16px', margin:0 }}>Thank you, {commentName}! Your comment has been submitted for review.</p>
              </div>
            )}
          </div>

          {/* Related posts */}
          <div style={{ marginTop:'48px' }}>
            <h3 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'22px', marginBottom:'20px' }}>More Stories</h3>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))', gap:'16px' }}>
              {posts.filter(p => p.id !== post.id).slice(0,3).map(p => (
                <div key={p.id} onClick={() => openPost(p)} style={{ backgroundColor:p.color, borderRadius:'14px', padding:'20px', cursor:'pointer', borderLeft:`4px solid ${p.border}`, transition:'transform 0.2s ease' }}
                  onMouseEnter={e => e.currentTarget.style.transform='translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
                >
                  <span style={{ fontSize:'28px', display:'block', marginBottom:'8px' }}>{p.imageUrl ? '📰' : p.image}</span>
                  <span style={{ fontSize:'11px', fontWeight:'700', color:p.border, ...base, textTransform:'uppercase', letterSpacing:'1px' }}>{p.category}</span>
                  <p style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'15px', margin:'6px 0 0', lineHeight:1.4 }}>{p.title}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        {shareToast && (
          <div style={{ position:'fixed', bottom:'32px', left:'50%', transform:'translateX(-50%)', backgroundColor:'var(--dark)', color:'white', padding:'12px 24px', borderRadius:'50px', fontSize:'14px', ...base, fontWeight:'700', zIndex:9999, whiteSpace:'nowrap' }}>
            ✅ Link copied!
          </div>
        )}
      </div>
    )
  }

  // ════ MAIN LIST VIEW ══════════════════════════════════════════════════════
  return (
    <div>
      {shareToast && (
        <div style={{ position:'fixed', bottom:'32px', left:'50%', transform:'translateX(-50%)', backgroundColor:'var(--dark)', color:'white', padding:'12px 24px', borderRadius:'50px', fontSize:'14px', ...base, fontWeight:'700', zIndex:9999, whiteSpace:'nowrap' }}>
          ✅ Link copied to clipboard!
        </div>
      )}

      {/* HERO */}
      <section style={{ background:'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 55%, #9C3ABB 100%)', padding:'80px 24px 60px', textAlign:'center', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', width:'450px', height:'450px', borderRadius:'50%', background:'rgba(244,196,48,0.06)', top:'-160px', right:'-120px', pointerEvents:'none' }} />
        <div style={{ position:'absolute', width:'320px', height:'320px', borderRadius:'50%', background:'rgba(76,175,80,0.06)', bottom:'-100px', left:'-60px', pointerEvents:'none' }} />
        <div style={{ maxWidth:'760px', margin:'0 auto', position:'relative', zIndex:1 }}>
          <div style={{ display:'inline-block', background:'rgba(244,196,48,0.18)', border:'1px solid var(--gold)', color:'var(--gold)', fontSize:'11px', fontWeight:'700', letterSpacing:'3px', textTransform:'uppercase', padding:'8px 22px', borderRadius:'50px', marginBottom:'26px', ...base }}>
            ✦ Stories, News & Updates
          </div>
          <h1 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(34px,6vw,64px)', color:'var(--white)', lineHeight:1.08, marginBottom:'20px' }}>
            News & <span style={{ color:'var(--gold)' }}>Updates</span>
          </h1>
          <p style={{ fontSize:'18px', color:'rgba(255,255,255,0.82)', ...base, lineHeight:1.85, marginBottom:'36px', maxWidth:'580px', margin:'0 auto 36px' }}>
            Impact stories, press releases, devotionals and event news — everything happening at Bupe Foundation.
          </p>
          <div style={{ display:'flex', gap:'8px', justifyContent:'center', alignItems:'center' }}>
            <Link href="/" style={{ color:'rgba(255,255,255,0.5)', fontSize:'13px', ...base, textDecoration:'none' }}>Home</Link>
            <span style={{ color:'rgba(255,255,255,0.3)' }}>›</span>
            <span style={{ color:'var(--gold)', fontSize:'13px', ...base }}>News</span>
          </div>
        </div>
      </section>

      {/* FEATURED POSTS */}
      {featured.length > 0 && (
        <section style={{ backgroundColor:'var(--white)', padding:'60px 24px' }}>
          <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
            <div style={{ textAlign:'center', marginBottom:'36px' }}>
              <div style={{ color:'var(--gold)', fontSize:'11px', fontWeight:'700', letterSpacing:'4px', textTransform:'uppercase', ...base, marginBottom:'10px' }}>Editor's Picks</div>
              <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(26px,4vw,40px)', color:'var(--purple)', margin:0 }}>Featured Stories</h2>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(340px, 1fr))', gap:'24px' }}>
              {featured.map(post => (
                <div key={post.id} onClick={() => openPost(post)} style={{ backgroundColor:post.color, borderRadius:'22px', overflow:'hidden', cursor:'pointer', transition:'transform 0.3s ease, box-shadow 0.3s ease', border:'2px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-8px)'; e.currentTarget.style.boxShadow=`0 24px 56px rgba(0,0,0,0.12)`; e.currentTarget.style.borderColor=post.border }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='transparent' }}
                >
                  <div style={{ height:'160px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'72px', borderBottom:`3px solid ${post.border}`, overflow:'hidden', background:`linear-gradient(135deg, ${post.border}22, ${post.border}44)` }}>
                    {post.imageUrl
                      ? <img src={post.imageUrl} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      : post.image
                    }
                  </div>
                  <div style={{ padding:'24px' }}>
                    <div style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'10px' }}>
                      <span style={{ backgroundColor:post.border, color:'white', fontSize:'10px', fontWeight:'700', padding:'3px 10px', borderRadius:'20px', ...base }}>⭐ FEATURED</span>
                      <span style={{ backgroundColor:'rgba(255,255,255,0.7)', color:post.border, fontSize:'10px', fontWeight:'700', padding:'3px 10px', borderRadius:'20px', ...base }}>{post.category}</span>
                    </div>
                    <h3 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'20px', marginBottom:'10px', lineHeight:1.3 }}>{post.title}</h3>
                    <p style={{ fontSize:'14px', color:'var(--text-light)', ...base, lineHeight:1.65, marginBottom:'16px' }}>{post.excerpt}</p>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                      <div style={{ fontSize:'12px', color:'var(--text-light)', ...base }}>📅 {post.date} · ⏱️ {post.readTime}</div>
                      <button onClick={e => { e.stopPropagation(); toggleLike(post.id) }} style={{ backgroundColor: likedPosts[post.id] ? '#FCE4EC' : 'rgba(255,255,255,0.6)', border:'none', borderRadius:'50px', padding:'5px 10px', fontSize:'12px', cursor:'pointer', ...base, fontWeight:'700', color: likedPosts[post.id] ? '#C62828' : 'var(--text)' }}>
                        ❤️ {post.likes + (likedPosts[post.id] ? 1 : 0)}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEARCH & FILTER */}
      <div style={{ backgroundColor:'var(--cream)', padding:'32px 24px', borderTop:'1px solid rgba(107,45,139,0.08)', borderBottom:'1px solid rgba(107,45,139,0.08)' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ position:'relative', maxWidth:'480px', margin:'0 auto 20px' }}>
            <span style={{ position:'absolute', left:'16px', top:'50%', transform:'translateY(-50%)', fontSize:'16px' }}>🔍</span>
            <input type="text" placeholder="Search stories, news, topics..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width:'100%', padding:'13px 16px 13px 44px', borderRadius:'50px', border:'2px solid rgba(107,45,139,0.2)', fontSize:'14px', ...base, outline:'none', backgroundColor:'var(--white)', color:'var(--text)', boxSizing:'border-box' }} />
          </div>
          <div style={{ display:'flex', gap:'8px', justifyContent:'center', flexWrap:'wrap', marginBottom:'16px' }}>
            {categories.map(cat => (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)} style={{ padding:'9px 20px', borderRadius:'50px', border:'2px solid var(--purple)', backgroundColor: activeTab===cat.id ? 'var(--purple)' : 'transparent', color: activeTab===cat.id ? 'white' : 'var(--purple)', fontWeight:'700', fontSize:'13px', ...base, cursor:'pointer', transition:'all 0.2s ease' }}>
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
          {allTags.length > 0 && (
            <div style={{ display:'flex', gap:'6px', justifyContent:'center', flexWrap:'wrap' }}>
              {activeTag && (
                <button onClick={() => setActiveTag('')} style={{ padding:'5px 12px', borderRadius:'20px', border:'none', backgroundColor:'var(--purple)', color:'white', fontSize:'11px', fontWeight:'700', ...base, cursor:'pointer' }}>✕ Clear</button>
              )}
              {allTags.map(tag => (
                <button key={tag} onClick={() => setActiveTag(activeTag===tag ? '' : tag)} style={{ padding:'5px 12px', borderRadius:'20px', border:'none', backgroundColor: activeTag===tag ? 'var(--gold)' : 'rgba(107,45,139,0.1)', color: activeTag===tag ? 'var(--dark)' : 'var(--text-light)', fontSize:'11px', fontWeight:'700', ...base, cursor:'pointer' }}>
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* POSTS GRID */}
      <section style={{ backgroundColor:'var(--white)', padding:'60px 24px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'28px', flexWrap:'wrap', gap:'12px' }}>
            <h2 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'26px', margin:0 }}>
              {filtered.length} {activeTab==='all' ? 'Posts' : categories.find(c=>c.id===activeTab)?.label}
            </h2>
            {bookmarks.length > 0 && (
              <div style={{ backgroundColor:'#FFF8E1', borderRadius:'50px', padding:'8px 16px', fontSize:'13px', fontWeight:'700', color:'#D4A017', ...base }}>
                🔖 {bookmarks.length} saved
              </div>
            )}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign:'center', padding:'80px 24px', color:'var(--text-light)' }}>
              <div style={{ fontSize:'56px', marginBottom:'16px' }}>🔍</div>
              <p style={{ fontSize:'18px', ...base }}>No posts match your search.</p>
              <button onClick={() => { setSearchQuery(''); setActiveTab('all'); setActiveTag('') }} style={{ marginTop:'16px', backgroundColor:'var(--purple)', color:'white', padding:'12px 24px', borderRadius:'50px', border:'none', fontWeight:'700', ...base, cursor:'pointer' }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px, 1fr))', gap:'24px' }}>
              {filtered.map(post => (
                <div key={post.id} style={{ backgroundColor:'var(--cream)', borderRadius:'20px', overflow:'hidden', transition:'transform 0.3s ease, box-shadow 0.3s ease', display:'flex', flexDirection:'column', border:'2px solid transparent' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(107,45,139,0.12)'; e.currentTarget.style.borderColor=post.border }}
                  onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.borderColor='transparent' }}
                >
                  <div onClick={() => openPost(post)} style={{ height:'120px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'56px', cursor:'pointer', borderBottom:`3px solid ${post.border}`, overflow:'hidden', background:`linear-gradient(135deg, ${post.color}, ${post.border}22)` }}>
                    {post.imageUrl
                      ? <img src={post.imageUrl} alt={post.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                      : post.image
                    }
                  </div>
                  <div style={{ padding:'20px', flex:1, display:'flex', flexDirection:'column' }}>
                    <div style={{ display:'flex', gap:'8px', alignItems:'center', marginBottom:'10px', flexWrap:'wrap' }}>
                      <span style={{ backgroundColor:post.border, color:'white', fontSize:'10px', fontWeight:'700', padding:'3px 9px', borderRadius:'20px', ...base }}>{post.category}</span>
                      <span style={{ fontSize:'11px', color:'var(--text-light)', ...base }}>⏱️ {post.readTime}</span>
                    </div>
                    <h3 onClick={() => openPost(post)} style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'18px', marginBottom:'8px', lineHeight:1.35, cursor:'pointer' }}>{post.title}</h3>
                    <p style={{ fontSize:'13px', color:'var(--text-light)', ...base, lineHeight:1.65, marginBottom:'14px', flex:1 }}>{post.excerpt}</p>
                    {post.tags.length > 0 && (
                      <div style={{ display:'flex', gap:'5px', flexWrap:'wrap', marginBottom:'14px' }}>
                        {post.tags.slice(0,3).map(tag => (
                          <span key={tag} onClick={e => { e.stopPropagation(); setActiveTag(tag) }} style={{ backgroundColor:'rgba(107,45,139,0.08)', color:'var(--purple)', fontSize:'10px', fontWeight:'700', padding:'3px 8px', borderRadius:'20px', ...base, cursor:'pointer' }}>#{tag}</span>
                        ))}
                      </div>
                    )}
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:'12px', borderTop:'1px solid rgba(107,45,139,0.08)' }}>
                      <span style={{ fontSize:'11px', color:'var(--text-light)', ...base }}>📅 {post.date}</span>
                      <div style={{ display:'flex', gap:'6px' }}>
                        <button onClick={e => { e.stopPropagation(); toggleLike(post.id) }} style={{ backgroundColor: likedPosts[post.id] ? '#FCE4EC' : 'white', border:'none', borderRadius:'50px', padding:'5px 10px', fontSize:'12px', cursor:'pointer', ...base, fontWeight:'700', color: likedPosts[post.id] ? '#C62828' : 'var(--text-light)' }}>
                          ❤️ {post.likes + (likedPosts[post.id] ? 1 : 0)}
                        </button>
                        <button onClick={e => { e.stopPropagation(); toggleBookmark(post.id) }} style={{ backgroundColor: bookmarks.includes(post.id) ? '#FFF8E1' : 'white', border:'none', borderRadius:'50px', padding:'5px 10px', fontSize:'12px', cursor:'pointer' }}>🔖</button>
                        <button onClick={e => { e.stopPropagation(); handleShare(post.title) }} style={{ backgroundColor:'white', border:'none', borderRadius:'50px', padding:'5px 10px', fontSize:'12px', cursor:'pointer' }}>🔗</button>
                      </div>
                    </div>
                    <button onClick={() => openPost(post)} style={{ marginTop:'14px', width:'100%', backgroundColor:'transparent', color:post.border, border:`2px solid ${post.border}`, borderRadius:'50px', padding:'10px', fontWeight:'700', fontSize:'13px', ...base, cursor:'pointer', transition:'all 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor=post.border; e.currentTarget.style.color='white' }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor='transparent'; e.currentTarget.style.color=post.border }}
                    >
                      Read Full Story →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section style={{ backgroundColor:'var(--cream)', padding:'80px 24px' }}>
        <div style={{ maxWidth:'1100px', margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:'48px' }}>
            <div style={{ color:'var(--gold)', fontSize:'11px', fontWeight:'700', letterSpacing:'4px', textTransform:'uppercase', ...base, marginBottom:'12px' }}>Don't Miss Out</div>
            <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:'clamp(26px,4vw,42px)', color:'var(--purple)', marginBottom:0 }}>Upcoming Events</h2>
          </div>

          {/* Countdown */}
          <div style={{ background:'linear-gradient(135deg, var(--purple-dark), var(--purple))', borderRadius:'24px', padding:'36px', textAlign:'center', marginBottom:'40px' }}>
            <div style={{ color:'var(--gold)', fontSize:'11px', fontWeight:'700', letterSpacing:'4px', textTransform:'uppercase', ...base, marginBottom:'8px' }}>⏰ Next Event Countdown</div>
            <h3 style={{ fontFamily:"'Playfair Display', serif", color:'var(--white)', fontSize:'22px', marginBottom:'28px' }}>
              {events[0]?.title || 'Coming Soon'}
            </h3>
            <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap' }}>
              {[{ v:countdown.days,l:'Days'},{v:countdown.hours,l:'Hours'},{v:countdown.mins,l:'Mins'},{v:countdown.secs,l:'Secs'}].map(item => (
                <div key={item.l} style={{ backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'14px', padding:'18px 22px', minWidth:'76px', border:'1px solid rgba(255,255,255,0.15)' }}>
                  <div style={{ fontFamily:"'Playfair Display', serif", fontSize:'36px', fontWeight:'900', color:'var(--gold)', lineHeight:1 }}>{String(item.v).padStart(2,'0')}</div>
                  <div style={{ fontSize:'11px', color:'rgba(255,255,255,0.55)', textTransform:'uppercase', letterSpacing:'2px', ...base, marginTop:'4px' }}>{item.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Event Cards */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:'20px' }}>
            {events.map((ev, i) => (
              <div key={i} onClick={() => setActiveEvent(i)} style={{ backgroundColor:'var(--white)', borderRadius:'20px', overflow:'hidden', boxShadow:'0 4px 20px rgba(107,45,139,0.07)', transition:'transform 0.3s ease', border: activeEvent===i ? `2px solid ${ev.border}` : '2px solid transparent', cursor:'pointer' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-5px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}
              >
                <div style={{ backgroundColor:ev.color, padding:'22px', borderBottom:`3px solid ${ev.border}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px' }}>
                    <span style={{ fontSize:'36px' }}>{ev.icon}</span>
                    <span style={{ backgroundColor:ev.border, color:'white', fontSize:'10px', fontWeight:'700', padding:'3px 10px', borderRadius:'20px', ...base }}>{ev.type}</span>
                  </div>
                  <h3 style={{ fontFamily:"'Playfair Display', serif", color:'var(--purple)', fontSize:'17px', marginBottom:'8px', lineHeight:1.3 }}>{ev.title}</h3>
                  <p style={{ fontSize:'12px', color:'var(--text-light)', ...base, margin:0 }}>📅 {ev.date} · {ev.time}</p>
                  <p style={{ fontSize:'12px', color:'var(--text-light)', ...base, margin:'3px 0 0' }}>📍 {ev.location}</p>
                </div>
                <div style={{ padding:'18px' }}>
                  <p style={{ fontSize:'13px', color:'var(--text-light)', ...base, lineHeight:1.65, marginBottom:'14px' }}>{ev.desc}</p>
                  <div style={{ marginBottom:'12px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'5px' }}>
                      <span style={{ fontSize:'11px', color:'var(--text-light)', ...base }}>{ev.registered} registered</span>
                      <span style={{ fontSize:'11px', fontWeight:'700', color:ev.border, ...base }}>{ev.spots - ev.registered} spots left</span>
                    </div>
                    <div style={{ backgroundColor:'var(--grey)', borderRadius:'50px', height:'7px', overflow:'hidden' }}>
                      <div style={{ width:`${(ev.registered/ev.spots)*100}%`, height:'100%', backgroundColor:ev.border, borderRadius:'50px' }} />
                    </div>
                  </div>
                  <Link href="/get-involved" style={{ display:'block', textAlign:'center', backgroundColor:ev.border, color:'white', padding:'10px', borderRadius:'50px', textDecoration:'none', fontWeight:'700', fontSize:'13px', ...base }}>
                    Register Now →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ background:'linear-gradient(135deg, var(--purple-dark), var(--purple))', padding:'80px 24px' }}>
        <div style={{ maxWidth:'620px', margin:'0 auto', textAlign:'center' }}>
          <div style={{ fontSize:'48px', marginBottom:'16px' }}>📬</div>
          <h2 style={{ fontFamily:"'Playfair Display', serif", color:'var(--white)', fontSize:'clamp(26px,4vw,42px)', marginBottom:'14px' }}>
            Never Miss a <span style={{ color:'var(--gold)' }}>Story</span>
          </h2>
          <p style={{ color:'rgba(255,255,255,0.8)', ...base, fontSize:'16px', lineHeight:1.8, marginBottom:'36px' }}>
            Subscribe to our newsletter and receive impact stories, event invitations and programme updates — straight to your inbox.
          </p>
          {!subscribed ? (
            <div style={{ display:'flex', gap:'10px', flexWrap:'wrap', justifyContent:'center' }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} style={{ flex:1, minWidth:'240px', padding:'14px 20px', borderRadius:'50px', border:'2px solid rgba(255,255,255,0.2)', fontSize:'15px', ...base, outline:'none', backgroundColor:'rgba(255,255,255,0.1)', color:'var(--white)' }} />
              <button onClick={() => { if (email && email.includes('@')) setSubscribed(true) }} style={{ backgroundColor:'var(--gold)', color:'var(--dark)', padding:'14px 28px', borderRadius:'50px', border:'none', fontWeight:'700', fontSize:'15px', ...base, cursor:'pointer', whiteSpace:'nowrap' }}>
                Subscribe 💛
              </button>
            </div>
          ) : (
            <div style={{ backgroundColor:'rgba(255,255,255,0.1)', borderRadius:'20px', padding:'32px', border:'2px solid var(--gold)' }}>
              <div style={{ fontSize:'48px', marginBottom:'12px' }}>🎉</div>
              <p style={{ color:'var(--gold)', fontFamily:"'Playfair Display', serif", fontSize:'22px', margin:'0 0 8px' }}>You're subscribed!</p>
              <p style={{ color:'rgba(255,255,255,0.8)', ...base, fontSize:'14px', margin:0 }}>Welcome to the Bupe Foundation family.</p>
            </div>
          )}
        </div>
      </section>

      <div className="scripture-band">
        <h2>"Let your light shine before others, <span>that they may see your good deeds."</span></h2>
        <p>Matthew 5:16 — We share our stories to inspire others to act</p>
      </div>
    </div>
  )
}