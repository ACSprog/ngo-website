import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'name',
    description: 'Manage staff, board members and volunteers shown on the About page',
    group: 'Content',
    defaultColumns: ['name', 'position', 'department', 'order'],
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'position', type: 'text', required: true },
    {
      name: 'department', type: 'select',
      options: [
        { label: '👑 Leadership',     value: 'leadership' },
        { label: '🏛️ Board',         value: 'board'      },
        { label: '📋 Programs',       value: 'programs'   },
        { label: '💰 Finance',        value: 'finance'    },
        { label: '📣 Communications', value: 'comms'      },
        { label: '🙋 Field Staff',    value: 'field'      },
      ],
    },
    { name: 'bio', type: 'textarea' },
    { name: 'photo', type: 'upload', relationTo: 'media' },
    { name: 'email', type: 'email' },
    { name: 'order', type: 'number', defaultValue: 99, admin: { position: 'sidebar' } },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
