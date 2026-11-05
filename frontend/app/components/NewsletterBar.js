'use client'
import { useState } from 'react'

export default function NewsletterBar() {
  const [email, setEmail]         = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [error, setError]         = useState('')

  const handleSubscribe = () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubscribed(true)
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, var(--purple), var(--purple-light))',
      padding: '40px 24px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          color: 'var(--white)',
          fontSize: '24px',
          marginBottom: '8px',
        }}>
          Stay Connected with Bupe
        </h3>
        <p style={{
          color: 'rgba(255,255,255,0.75)',
          fontSize: '14px',
          fontFamily: "'Lato', sans-serif",
          marginBottom: '24px',
        }}>
          Get stories of hope and updates delivered to your inbox
        </p>

        {!subscribed ? (
          <>
            <div style={{
              display: 'flex',
              gap: '10px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                onKeyDown={e => e.key === 'Enter' && handleSubscribe()}
                style={{
                  flex: '1',
                  minWidth: '200px',
                  maxWidth: '320px',
                  padding: '14px 18px',
                  borderRadius: '8px',
                  border: error ? '2px solid #FF5252' : '2px solid transparent',
                  fontSize: '14px',
                  fontFamily: "'Lato', sans-serif",
                  outline: 'none',
                  color: 'var(--dark)',
                }}
              />
              <button
                onClick={handleSubscribe}
                style={{
                  backgroundColor: 'var(--gold)',
                  color: 'var(--dark)',
                  padding: '14px 28px',
                  borderRadius: '8px',
                  border: 'none',
                  fontWeight: '700',
                  fontSize: '14px',
                  fontFamily: "'Lato', sans-serif",
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'opacity 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                Subscribe ✉️
              </button>
            </div>
            {error && (
              <p style={{
                color: '#FF5252',
                fontSize: '12px',
                fontFamily: "'Lato', sans-serif",
                marginTop: '10px',
              }}>
                ⚠️ {error}
              </p>
            )}
          </>
        ) : (
          <div style={{
            backgroundColor: 'rgba(255,255,255,0.15)',
            borderRadius: '16px',
            padding: '20px 28px',
            border: '2px solid var(--gold)',
            display: 'inline-block',
          }}>
            <p style={{
              margin: 0,
              color: 'var(--gold)',
              fontFamily: "'Playfair Display', serif",
              fontSize: '18px',
              marginBottom: '4px',
            }}>
              🎉 You're subscribed!
            </p>
            <p style={{
              margin: 0,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: "'Lato', sans-serif",
              fontSize: '13px',
            }}>
              Welcome to the Bupe family. Stories of hope are on their way to{' '}
              <strong style={{ color: 'var(--gold)' }}>{email}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}