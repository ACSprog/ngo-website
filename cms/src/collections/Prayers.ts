import type { CollectionConfig } from 'payload'

export const Prayers: CollectionConfig = {
  slug: 'prayers',
  admin: {
    useAsTitle: 'prayer',
    description: 'Review and approve prayer requests submitted via the Prayer Wall',
    group: 'Content',
    defaultColumns: ['name', 'prayer', 'approved', 'createdAt'],
  },
  access: { read: () => true, create: () => true },
  fields: [
    { name: 'prayer', type: 'textarea', required: true },
    { name: 'name', type: 'text' },
    { name: 'location', type: 'text' },
    { name: 'anonymous', type: 'checkbox', defaultValue: false },
    { name: 'approved', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'prayerCount', type: 'number', defaultValue: 0, admin: { position: 'sidebar' } },
  ],
}
