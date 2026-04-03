export const localized = (name, title, type = 'string') => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'fr', title: 'Français', type },
    { name: 'ar', title: 'العربية', type },
  ],
})

export const localizedBody = (name, title) => ({
  name,
  title,
  type: 'object',
  fields: [
    { name: 'fr', title: 'Français', type: 'array', of: [{ type: 'block' }] },
    { name: 'ar', title: 'العربية', type: 'array', of: [{ type: 'block' }] },
  ],
})
