import { useEffect, useId, useState, type FormEvent } from 'react'
import clsx from 'clsx'
import { useMembershipInterest } from '@/lib/MembershipInterest'
import { Button } from '@/components/ui/Button'

interface FormState {
  name: string
  email: string
  phone: string
  interest: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const INTEREST_OPTIONS = ['General Inquiry', 'Vanta Standard', 'Vanta Performance', 'Vanta Elite']

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function inputClasses(hasError: boolean) {
  return clsx(
    'w-full border-b bg-transparent py-3 font-sans text-vanta-white placeholder:text-vanta-mist focus-visible:outline-none',
    hasError ? 'border-vanta-ember' : 'border-vanta-steel/50 focus:border-vanta-white',
  )
}

export function ContactForm() {
  const { interest, setInterest } = useMembershipInterest()
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    interest: 'General Inquiry',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const idPrefix = useId()

  useEffect(() => {
    if (interest && INTEREST_OPTIONS.includes(interest)) {
      setForm((f) => ({ ...f, interest }))
    }
  }, [interest])

  const validate = (values: FormState): FormErrors => {
    const next: FormErrors = {}
    if (values.name.trim().length < 2) next.name = 'Enter your full name.'
    if (!EMAIL_PATTERN.test(values.email.trim())) next.email = 'Enter a valid email address.'
    if (values.message.trim().length < 10) next.message = 'Tell us a little more (10 characters minimum).'
    return next
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const nextErrors = validate(form)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setStatus('submitting')
    window.setTimeout(() => {
      setStatus('success')
      setInterest('')
      setForm({ name: '', email: '', phone: '', interest: 'General Inquiry', message: '' })
    }, 900)
  }

  if (status === 'success') {
    return (
      <div role="status" className="flex min-h-[420px] flex-col justify-center border border-vanta-steel/30 p-10">
        <span className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">Message received</span>
        <p className="mt-4 max-w-sm font-display text-2xl font-bold uppercase leading-tight text-vanta-white">
          We'll be in touch within one business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 self-start font-mono text-[11px] uppercase tracking-widest2 text-vanta-fog underline decoration-vanta-steel underline-offset-4 hover:text-vanta-white"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="flex flex-col gap-7">
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
            Name
          </label>
          <input
            id={`${idPrefix}-name`}
            name="name"
            type="text"
            autoComplete="name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? `${idPrefix}-name-error` : undefined}
            className={inputClasses(Boolean(errors.name))}
            placeholder="Jordan Blake"
          />
          {errors.name && (
            <p id={`${idPrefix}-name-error`} className="mt-2 text-xs text-vanta-ember">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={`${idPrefix}-email`} className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
            name="email"
            type="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? `${idPrefix}-email-error` : undefined}
            className={inputClasses(Boolean(errors.email))}
            placeholder="jordan@email.com"
          />
          {errors.email && (
            <p id={`${idPrefix}-email-error`} className="mt-2 text-xs text-vanta-ember">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-phone`} className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
            Phone <span className="normal-case text-vanta-mist/60">(optional)</span>
          </label>
          <input
            id={`${idPrefix}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            className={inputClasses(false)}
            placeholder="(212) 555-0134"
          />
        </div>

        <div>
          <label htmlFor={`${idPrefix}-interest`} className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
            Membership interest
          </label>
          <select
            id={`${idPrefix}-interest`}
            name="interest"
            value={form.interest}
            onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
            className="w-full border-b border-vanta-steel/50 bg-transparent py-3 font-sans text-vanta-white focus:border-vanta-white focus-visible:outline-none"
          >
            {INTEREST_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="bg-vanta-charcoal">
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${idPrefix}-message`} className="font-mono text-[11px] uppercase tracking-widest2 text-vanta-mist">
          Message
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? `${idPrefix}-message-error` : undefined}
          className={clsx(inputClasses(Boolean(errors.message)), 'resize-none')}
          placeholder="Tell us about your training background and goals."
        />
        {errors.message && (
          <p id={`${idPrefix}-message-error`} className="mt-2 text-xs text-vanta-ember">
            {errors.message}
          </p>
        )}
      </div>

      <p className="font-mono text-[10px] uppercase tracking-widest2 text-vanta-mist/70">
        Design concept form — submissions are not stored or transmitted.
      </p>

      <Button type="submit" variant="solid" className="w-full justify-center sm:w-fit" arrow={status !== 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
