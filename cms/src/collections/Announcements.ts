import type { CollectionConfig } from 'payload'

export const Announcements: CollectionConfig = {
  slug: 'announcements',
  admin: {
    useAsTitle: 'message',
    description: 'Manage the announcement banner shown at the top of every page',
    group: 'Site Management',
    defaultColumns: ['message', 'type', 'active', 'expiresAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'message', type: 'text', required: true },
    {
      name: 'type', type: 'select', required: true, defaultValue: 'info',
      options: [
        { label: '🔵 Info (Blue)',    value: 'info'    },
        { label: '🟡 Warning (Gold)', value: 'warning' },
        { label: '🟢 Success (Green)',value: 'success' },
        { label: '🔴 Urgent (Red)',   value: 'urgent'  },
      ],
    },
    { name: 'icon', type: 'text', defaultValue: '📢' },
    { name: 'active', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'dismissible', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'ctaLabel', type: 'text' },
    { name: 'ctaLink', type: 'text' },
    { name: 'expiresAt', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
  ],
}
