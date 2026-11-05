// ── NEWS & EVENTS DATA ─────────────────────────────────────────────
// Replace the sample entries below with your real posts/events.
// Post fields: id, type (story|news|press|devotional), category, title, excerpt, body,
//   author, date, readTime, image (emoji), imageUrl (optional, e.g. '/images/news/x.jpg'),
//   tags[], featured, likes, color, border
// Event fields: title, date, time, location, type, icon, desc, spots, registered, color, border, eventDate

export const POSTS = [
  {
    id: 1, type: 'story', category: 'Impact Story',
    title: "From Dropout to Top of Her Class — Chisomo's Story",
    excerpt: 'At age 7, Chisomo lost both parents and was forced to leave school. Five years later, she is top of her class and dreaming of becoming a doctor.',
    body: 'When we first met Chisomo Phiri in 2019, she was a quiet, withdrawn seven-year-old...',
    author: 'Bupe Foundation Team', date: 'February 18, 2026', readTime: '5 min read',
    image: '👧🏾', tags: ['Education', 'Impact', 'Children'], featured: true, likes: 142,
    color: '#F3E5F5', border: '#6B2D8B',
  },
  {
    id: 2, type: 'news', category: 'Press Release',
    title: 'Bupe Foundation Expands to Copperbelt Province — 3 New Communities',
    excerpt: 'We are thrilled to announce the expansion of our programmes to three new communities in Copperbelt Province.',
    body: 'Lusaka, Zambia — February 10, 2026...',
    author: 'Communications Team', date: 'February 10, 2026', readTime: '3 min read',
    image: '🏘️', tags: ['Expansion', 'Copperbelt', 'Announcement'], featured: false, likes: 88,
    color: '#E3F2FD', border: '#1A4B8C',
  },
]

export const EVENTS = [
  {
    title: 'Annual Fundraising Gala 2026', date: 'April 15, 2026', time: '18:00 – 22:00',
    location: 'Lusaka Intercontinental Hotel, Lusaka', type: 'Fundraiser', icon: '🎉',
    desc: 'Our flagship annual gala — dinner, live music, silent auction and inspiring stories.',
    spots: 200, registered: 147, color: '#F3E5F5', border: '#6B2D8B',
    eventDate: new Date('2026-04-15T18:00:00'),
  },
  {
    title: 'Community Volunteer Day — Kafue', date: 'March 8, 2026', time: '08:00 – 16:00',
    location: 'Kafue Community Centre, Kafue', type: 'Volunteer', icon: '🤝',
    desc: 'A full day of volunteering — cooking, teaching, building. Lunch provided.',
    spots: 50, registered: 38, color: '#E8F5E9', border: '#2E7D32',
    eventDate: new Date('2026-03-08T08:00:00'),
  },
]
