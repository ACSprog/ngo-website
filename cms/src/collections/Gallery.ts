import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    description: 'Manage photos shown across the website',
    group: 'Content',
    defaultColumns: ['title', 'category', 'featured', 'createdAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'description', type: 'textarea' },
    {
      name: 'category', type: 'select', required: true,
      options: [
        { label: '🤝 Programs',   value: 'programs'  },
        { label: '🎉 Events',     value: 'events'    },
        { label: '👥 Team',       value: 'team'      },
        { label: '🏘️ Community',  value: 'community' },
        { label: '🎓 Education',  value: 'education' },
        { label: '🍽️ Nutrition',  value: 'nutrition' },
        { label: '🙏 Spiritual',  value: 'spiritual' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'consentGiven', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'takenAt', type: 'date', admin: { position: 'sidebar' } },
  ],
}
