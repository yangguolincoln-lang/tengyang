import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, CheckCircle2, ChevronDown, Copy, Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const DIRECTIONS = [
  'Breeding stock & multiplication',
  'Scientific research',
  'Products & distribution',
  'Media inquiry',
  'Other',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^\+?[0-9\s().-]{7,}$/

type InquiryData = {
  name: string
  contact: string
  direction: string
  message: string
}

type Errors = Partial<Record<keyof InquiryData, string>>

const INITIAL: InquiryData = { name: '', contact: '', direction: '', message: '' }

function validate(data: InquiryData): Errors {
  const errors: Errors = {}
  if (!data.name.trim()) errors.name = 'Please enter your name.'
  if (!data.contact.trim()) {
    errors.contact = 'Please enter your email address or phone number.'
  } else if (!EMAIL_RE.test(data.contact.trim()) && !PHONE_RE.test(data.contact.trim())) {
    errors.contact = 'Please enter a valid email address or phone number.'
  }
  if (!data.message.trim()) errors.message = 'Please tell us how we can help.'
  return errors
}

export default function EnglishInquiryForm() {
  const [data, setData] = useState<InquiryData>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')
  const [copied, setCopied] = useState(false)

  const update = (key: keyof InquiryData) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setData((current) => ({ ...current, [key]: event.target.value }))
      if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }))
    }

  const summary = () =>
    [
      'Tengyang Yuchun · Online Inquiry',
      `Name: ${data.name.trim()}`,
      `Contact: ${data.contact.trim()}`,
      `Area of cooperation: ${data.direction || 'Not specified'}`,
      `Message: ${data.message.trim()}`,
      `Submitted: ${new Date().toLocaleString('en-US')}`,
    ].join('\n')

  const copySummary = async () => {
    const text = summary()
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const nextErrors = validate(data)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return
    setStatus('loading')
    window.setTimeout(() => setStatus('success'), 800)
  }

  const reset = () => {
    setData(INITIAL)
    setErrors({})
    setStatus('idle')
    setCopied(false)
  }

  const inputClass = (key: keyof InquiryData) =>
    cn(
      'mt-2 w-full rounded-xl border bg-ivory-50/70 px-4 py-3.5 font-inter text-[15px] text-ink-900 outline-none transition-all placeholder:text-ink-400/65',
      errors[key]
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/25'
        : 'border-ink-400/25 focus:border-pine-700 focus:ring-2 focus:ring-wheat-400/35',
    )

  return (
    <div className="font-inter">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex min-h-[520px] flex-col items-center justify-center py-6 text-center"
            aria-live="polite"
          >
            <CheckCircle2 className="h-14 w-14 text-wheat-400" strokeWidth={1.5} />
            <h3 className="mt-5 font-fraunces text-3xl font-semibold text-ink-900">Thank you for contacting us.</h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-ink-600">
              Your inquiry has been submitted. Our team will respond on working days.
            </p>
            <div className="mt-6 w-full rounded-2xl border border-pine-950/10 bg-ivory-50 p-5 text-left">
              <p className="whitespace-pre-wrap text-xs leading-6 text-ink-600">{summary()}</p>
              <button
                type="button"
                onClick={copySummary}
                className="mt-4 inline-flex items-center gap-2 rounded-full border border-wheat-400/60 px-4 py-2 text-xs font-medium text-pine-700 transition-colors hover:bg-wheat-400/10"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Copied' : 'Copy inquiry summary'}
              </button>
            </div>
            <button
              type="button"
              onClick={reset}
              className="mt-6 rounded-full border border-pine-700/20 px-6 py-2.5 text-sm font-medium text-pine-700 transition-colors hover:bg-pine-700/5"
            >
              Send another inquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <div>
              <span className="text-xs font-medium uppercase tracking-[0.25em] text-wheat-600">Online inquiry</span>
              <h3 className="mt-3 font-fraunces text-3xl font-semibold text-ink-900">Tell us about your project.</h3>
              <p className="mt-3 text-sm leading-6 text-ink-600">Complete the form in English and our team will get back to you on working days.</p>
            </div>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="en-name" className="text-sm font-medium text-ink-900">
                  Your name <span className="text-marble-500">*</span>
                </label>
                <input
                  id="en-name"
                  type="text"
                  autoComplete="name"
                  value={data.name}
                  onChange={update('name')}
                  placeholder="Name or organisation"
                  className={inputClass('name')}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? 'en-name-error' : undefined}
                />
                {errors.name && <p id="en-name-error" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="en-contact" className="text-sm font-medium text-ink-900">
                  Email or phone <span className="text-marble-500">*</span>
                </label>
                <input
                  id="en-contact"
                  type="text"
                  autoComplete="email"
                  value={data.contact}
                  onChange={update('contact')}
                  placeholder="you@company.com or +86…"
                  className={inputClass('contact')}
                  aria-invalid={Boolean(errors.contact)}
                  aria-describedby={errors.contact ? 'en-contact-error' : undefined}
                />
                {errors.contact && <p id="en-contact-error" className="mt-1.5 text-xs text-red-500">{errors.contact}</p>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="en-direction" className="text-sm font-medium text-ink-900">Area of cooperation</label>
              <div className="relative">
                <select
                  id="en-direction"
                  value={data.direction}
                  onChange={update('direction')}
                  className={cn(inputClass('direction'), 'appearance-none pr-11')}
                >
                  <option value="">Select an area (optional)</option>
                  {DIRECTIONS.map((direction) => (
                    <option key={direction} value={direction}>{direction}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute bottom-4 right-4 h-4 w-4 text-ink-400" />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="en-message" className="text-sm font-medium text-ink-900">
                Your message <span className="text-marble-500">*</span>
              </label>
              <textarea
                id="en-message"
                rows={5}
                value={data.message}
                onChange={update('message')}
                placeholder="Tell us about your goals, requirements or partnership idea…"
                className={cn(inputClass('message'), 'resize-none leading-7')}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? 'en-message-error' : undefined}
              />
              {errors.message && <p id="en-message-error" className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-7 inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-8 py-3.5 text-sm font-bold text-pine-950 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-75 sm:w-auto"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit inquiry
                  <Send className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-4 text-xs leading-5 text-ink-400">Your contact details are used only to respond to your inquiry.</p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}
