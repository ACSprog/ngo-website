import type { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: {
    useAsTitle: 'title',
    description: 'Manage news articles, press releases, blog posts and events',
    group: 'Content',
    defaultColumns: ['title', 'category', 'publishedAt', 'featured'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'excerpt', type: 'textarea', required: true },
    { name: 'content', type: 'richText', required: true },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'category', type: 'select', required: true,
      options: [
        { label: '📰 News',          value: 'news'          },
        { label: '📣 Press Release', value: 'press-release' },
        { label: '📅 Event',         value: 'event'         },
        { label: '✍️ Blog',          value: 'blog'          },
        { label: '📊 Impact Story',  value: 'impact'        },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'publishedAt', type: 'date', required: true, admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'author', type: 'text', defaultValue: 'Bupe Foundation', admin: { position: 'sidebar' } },
  ],
}
