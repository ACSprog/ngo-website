import type { CollectionConfig } from 'payload'

export const Stories: CollectionConfig = {
  slug: 'stories',
  admin: {
    useAsTitle: 'name',
    description: 'Review and approve stories submitted via the Share Your Story page',
    group: 'Content',
    defaultColumns: ['name', 'role', 'program', 'approved', 'createdAt'],
  },
  access: { read: () => true, create: () => true },
  fields: [
    { name: 'name', type: 'text' },
    { name: 'story', type: 'textarea', required: true },
    {
      name: 'role', type: 'select',
      options: [
        { label: '👶 Child We Served',     value: 'child'     },
        { label: '👩‍👧 Guardian / Parent', value: 'guardian'  },
        { label: '🙋 Volunteer',            value: 'volunteer' },
        { label: '💛 Donor / Supporter',    value: 'donor'     },
        { label: '🤝 Partner Organisation', value: 'partner'   },
        { label: '💬 Other',               value: 'other'     },
      ],
    },
    {
      name: 'program', type: 'select',
      options: [
        { label: '🤝 Child Care & Protection', value: 'child-care' },
        { label: '📚 Education Support',        value: 'education'  },
        { label: '💛 Emotional Healing',        value: 'healing'    },
        { label: '🏘️ Community Empowerment',   value: 'community'  },
        { label: '🙏 Spiritual Development',    value: 'spiritual'  },
        { label: '🍽️ Nutrition & Health',      value: 'nutrition'  },
      ],
    },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'anonymous', type: 'checkbox', defaultValue: false },
    { name: 'approved', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'contactEmail', type: 'email', admin: { position: 'sidebar' } },
  ],
}
