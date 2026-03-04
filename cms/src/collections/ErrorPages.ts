import type { CollectionConfig } from 'payload'

export const ErrorPages: CollectionConfig = {
  slug: 'error-pages',
  admin: {
    useAsTitle: 'code',
    description: 'Customise the message shown on each error page',
    group: 'Site Management',
    defaultColumns: ['code', 'title', 'active'],
  },
  access: { read: () => true },
  fields: [
    {
      name: 'code', type: 'select', required: true,
      options: [
        { label: '400 — Bad Request',                   value: '400' },
        { label: '401 — Unauthorised',                  value: '401' },
        { label: '403 — Forbidden',                     value: '403' },
        { label: '404 — Not Found',                     value: '404' },
        { label: '408 — Request Timeout',               value: '408' },
        { label: '409 — Conflict',                      value: '409' },
        { label: '410 — Gone',                          value: '410' },
        { label: '422 — Unprocessable Entity',          value: '422' },
        { label: '429 — Too Many Requests',             value: '429' },
        { label: '451 — Unavailable For Legal Reasons', value: '451' },
        { label: '500 — Internal Server Error',         value: '500' },
        { label: '502 — Bad Gateway',                   value: '502' },
        { label: '503 — Service Unavailable',           value: '503' },
        { label: '504 — Gateway Timeout',               value: '504' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'message', type: 'textarea', required: true },
    { name: 'emoji', type: 'text' },
    { name: 'maintenanceEnd', type: 'date', admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } } },
    { name: 'active', type: 'checkbox', defaultValue: true, admin: { position: 'sidebar' } },
  ],
}
