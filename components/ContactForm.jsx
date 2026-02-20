'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export default function ContactForm() {
  const t = useTranslations('contact')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'success' : 'error')
      if (res.ok) setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="container mx-auto px-4 py-14">
      <div className="w-[88%] mx-auto">

        {/* Section intro — separator style */}
        <div className="mb-10 text-center space-y-1">
          <p className="text-3xl font-bold text-dark leading-snug">
            🤝 {t('sectionIntro')}
          </p>
          <p className="text-3xl font-bold text-primary leading-snug">
            {t('sectionHighlight')}
          </p>
        </div>

        {/* Form + floating info card */}
        <div className="relative">
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>

            {/* Row 1 — Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label={t('name')} name="name" type="text" value={form.name} onChange={handleChange} placeholder={t('namePlaceholder')} />
              <Field label={t('email')} name="email" type="email" value={form.email} onChange={handleChange} placeholder={t('emailPlaceholder')} required />
            </div>

            {/* Row 2 — Subject + Send */}
            <div className="flex flex-col sm:flex-row gap-4 items-end">
              <div className="flex-1">
                <Field label={t('subject')} name="subject" type="text" value={form.subject} onChange={handleChange} placeholder={t('subjectPlaceholder')} required />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="h-11 sm:mb-px bg-primary text-white px-8 rounded-xl font-semibold text-sm hover:bg-primary-dark transition-colors disabled:opacity-60 whitespace-nowrap shrink-0"
              >
                {loading ? '...' : t('send')}
              </button>
            </div>

            {/* Row 3 — Message */}
            <div>
              <label className="block text-sm font-medium text-dark mb-1.5">{t('message')}</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={t('messagePlaceholder')}
                required
                rows={5}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>

            {status === 'success' && <p className="text-primary text-sm font-medium">{t('success')}</p>}
            {status === 'error' && <p className="text-red-500 text-sm font-medium">{t('error')}</p>}
          </form>

        </div>
      </div>
    </section>
  )
}

function Field({ label, name, type, value, onChange, placeholder, required }) {
  return (
    <div>
      <label className="block text-sm font-medium text-dark mb-1.5">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        placeholder={placeholder} required={required}
        className="w-full h-11 border border-gray-200 rounded-xl px-4 text-sm text-dark placeholder:text-gray-400 focus:outline-none focus:border-primary transition-colors"
      />
    </div>
  )
}

