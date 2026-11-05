'use client'
import NewsletterBar from './NewsletterBar'
import Link from 'next/link'

export default function Footer() {

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Programs', href: '/programs' },
    { name: 'Get Involved', href: '/get-involved' },
    { name: 'Impact & Reports', href: '/impact' },
    { name: 'News & Updates', href: '/news' },
    { name: 'Contact Us', href: '/contact' },
  ]

  const programs = [
    '🤝 Child Care & Protection',
    '📚 Education Support',
    '❤️‍🩹 Emotional Healing',
    '🏘️ Community Empowerment',
    '🙏 Spiritual Development',
    '🍽️ Nutrition & Health',
  ]

  const contacts = [
    { icon: '📍', text: 'Lusaka, Zambia' },
    { icon: '📞', text: '+260973229312' },
    { icon: '✉️', text: 'thebupefoundation@gmail.com' },
    { icon: '🕐', text: 'Mon – Fri: 8:00 – 17:00' },
  ]

  const socials = [
    { icon: 'f', label: 'Facebook', bg: '#1877F2', href: 'https://www.facebook.com/share/17FNeJM4qK/' },
    { icon: '📸', label: 'Instagram', bg: '#E1306C', href: 'https://www.instagram.com/bupefoundation?igsh=aWRmeGprem45M2xx' },
    { icon: '𝕏', label: 'X', bg: '#000000', href: 'https://x.com/bupefoundation' },
    { icon: '▶', label: 'YouTube', bg: '#FF0000', href: 'https://www.youtube.com/channel/UCmT_2MsBT3f_6uko3Bw2Z5A' },
  ]

  const legal = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Use',   href: '/terms' },
  { label: 'Cookie Policy',  href: '/cookie-policy' },
]

  return (
    <footer style={{ background: 'linear-gradient(135deg, var(--dark), var(--purple-dark))', color: 'var(--white)', paddingTop: '0' }}>

      {/* Newsletter Bar */}
      <NewsletterBar />

      {/* Main Grid */}
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '60px 24px 40px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '40px',
      }}>

        {/* Column 1 - Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              background: 'conic-gradient(var(--green), var(--gold), var(--orange), var(--red), var(--purple), var(--blue), var(--green))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--white)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}>
                ✝️
              </div>
            </div>
            <div>
              <p style={{ color: 'var(--white)', fontFamily: "'Playfair Display', serif", fontWeight: '900', fontSize: '18px', margin: 0 }}>
                Bupe Foundation
              </p>
              <p style={{ color: 'var(--gold)', fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', margin: 0, fontFamily: "'Lato', sans-serif" }}>
                He Left 99 To Find Me
              </p>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', lineHeight: '1.8', marginBottom: '20px' }}>
            Restoring hope, dignity and a future to orphaned and vulnerable children in Zambia through faith, love and community.
          </p>
          <div style={{ display: 'flex', gap: '10px' }}>
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" title={s.label} style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                backgroundColor: s.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '14px',
                textDecoration: 'none',
              }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h4 style={{ color: 'var(--gold)', fontFamily: "'Playfair Display', serif", fontSize: '16px', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            Quick Links
          </h4>
          {quickLinks.map((link) => (
            <Link key={link.name} href={link.href} style={{
              display: 'block',
              color: 'rgba(255,255,255,0.65)',
              fontSize: '14px',
              fontFamily: "'Lato', sans-serif",
              textDecoration: 'none',
              padding: '5px 0',
            }}>
              › {link.name}
            </Link>
          ))}
        </div>

        {/* Column 3 - Programs */}
        <div>
          <h4 style={{ color: 'var(--gold)', fontFamily: "'Playfair Display', serif", fontSize: '16px', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            Our Programs
          </h4>
          {programs.map((program) => (
            <p key={program} style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: "'Lato', sans-serif", padding: '5px 0', margin: 0 }}>
              {program}
            </p>
          ))}
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h4 style={{ color: 'var(--gold)', fontFamily: "'Playfair Display', serif", fontSize: '16px', marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            Contact Us
          </h4>
          {contacts.map((item) => (
            <div key={item.text} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '16px', flexShrink: 0 }}>{item.icon}</span>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px', fontFamily: "'Lato', sans-serif", margin: 0, lineHeight: '1.5' }}>
                {item.text}
              </p>
            </div>
          ))}
          <Link href="/donate" style={{
            display: 'block',
            textAlign: 'center',
            backgroundColor: 'var(--gold)',
            color: 'var(--dark)',
            padding: '12px 20px',
            borderRadius: '50px',
            fontWeight: '700',
            fontFamily: "'Lato', sans-serif",
            fontSize: '14px',
            textDecoration: 'none',
            marginTop: '20px',
          }}>
            ❤️ Donate Now
          </Link>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        borderTop: '1px solid rgba(255,255,255,0.1)',
        padding: '20px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '12px',
      }}>
        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px', fontFamily: "'Lato', sans-serif", margin: 0 }}>
          © {new Date().getFullYear()} Bupe Foundation. All rights reserved.
        </p>
        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
       
          {legal.map((item) => (
            <Link key={item.label} href={item.href} style={{
              color: 'rgba(255,255,255,0.5)',
              fontSize: '13px',
              fontFamily: "'Lato', sans-serif",
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

    </footer>
  )
}