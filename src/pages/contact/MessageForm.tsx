import { useState } from 'react'
import type { ChangeEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, ChevronDown, Loader2, Send } from 'lucide-react'
import { cn } from '@/lib/utils'

const DIRECTIONS = ['引种合作', '科研合作', '产品与渠道合作', '媒体采访', '其他']

const PHONE_RE = /^1[3-9]\d{9}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FormData = {
  name: string
  contact: string
  direction: string
  message: string
}

type Errors = Partial<Record<keyof FormData, string>>

const INITIAL: FormData = { name: '', contact: '', direction: '', message: '' }

function validate(data: FormData): Errors {
  const errors: Errors = {}
  if (!data.name.trim()) errors.name = '请填写您的称呼'
  if (!data.contact.trim()) {
    errors.contact = '请填写您的联系方式'
  } else if (!PHONE_RE.test(data.contact.trim()) && !EMAIL_RE.test(data.contact.trim())) {
    errors.contact = '请填写有效的手机号或邮箱'
  }
  if (!data.message.trim()) errors.message = '请填写留言内容'
  return errors
}

/** 浮动标签输入外壳 */
function FieldShell({
  label,
  required,
  floated,
  error,
  children,
}: {
  label: string
  required?: boolean
  floated: boolean
  error?: string
  children: React.ReactNode
}) {
  return (
    <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }} className="relative">
      <div className="relative">
        {children}
        <label
          className={cn(
            'pointer-events-none absolute left-4 transition-all duration-200',
            floated
              ? 'top-2 text-xs text-pine-700'
              : 'top-1/2 -translate-y-1/2 text-sm text-ink-400',
            error && floated && 'text-red-500',
          )}
        >
          {label}
          {required && <span className="ml-0.5 text-marble-500">*</span>}
        </label>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0, x: [0, -6, 6, -4, 4, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-1.5 text-[13px] text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function MessageForm() {
  const [data, setData] = useState<FormData>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [focused, setFocused] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const set = (key: keyof FormData) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData((d) => ({ ...d, [key]: e.target.value }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const onFocus = (key: string) => () => setFocused(key)
  const onBlur = () => setFocused(null)

  const fieldClass = (key: keyof FormData, extra?: string) =>
    cn(
      'w-full rounded-xl border bg-ivory-50/60 px-4 pb-2.5 pt-6 text-[15px] text-ink-900 outline-none transition-all duration-200',
      errors[key]
        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-400/30'
        : 'border-ink-400/25 focus:border-pine-700 focus:ring-2 focus:ring-wheat-400/40',
      extra,
    )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(data)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setStatus('loading')
    // 纯前端演示：模拟 1.2s 后提交成功
    window.setTimeout(() => setStatus('success'), 1200)
  }

  const handleReset = () => {
    setData(INITIAL)
    setErrors({})
    setStatus('idle')
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-2xl bg-white shadow-card"
    >
      {/* 顶部 4px 金条 */}
      <span className="absolute left-0 right-0 top-0 h-1 bg-gradient-to-r from-wheat-400 to-wheat-300" aria-hidden />

      <div className="p-6 md:p-9">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            /* 成功态 */
            <motion.div
              key="success"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center overflow-hidden py-8 text-center"
            >
              <img
                src="/lamb-closeup.jpg"
                alt="羔羊特写"
                className="h-20 w-20 rounded-full border-4 border-ivory-100 object-cover shadow-card"
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 14, delay: 0.15 }}
              >
                <CheckCircle2 className="mt-5 h-12 w-12 text-wheat-400" strokeWidth={1.6} />
              </motion.div>
              <p className="mt-4 max-w-sm font-serif text-lg font-semibold leading-relaxed text-ink-900">
                留言已提交，感谢您的信任！我们会尽快与您联系。
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="mt-7 inline-flex items-center gap-2 rounded-full border border-wheat-400/70 px-7 py-3 text-sm font-medium text-wheat-600 transition-all duration-300 hover:bg-wheat-400/10 active:scale-95"
              >
                再写一条
              </button>
            </motion.div>
          ) : (
            /* 表单态 */
            <motion.form
              key="form"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              onSubmit={handleSubmit}
              noValidate
            >
              <motion.div
                variants={{ show: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
                initial="hidden"
                animate="show"
                className="space-y-5"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <FieldShell
                    label="您的称呼"
                    required
                    floated={focused === 'name' || data.name !== ''}
                    error={errors.name}
                  >
                    <input
                      type="text"
                      value={data.name}
                      onChange={set('name')}
                      onFocus={onFocus('name')}
                      onBlur={onBlur}
                      className={fieldClass('name')}
                      aria-label="您的称呼"
                    />
                  </FieldShell>

                  <FieldShell
                    label="联系方式"
                    required
                    floated={focused === 'contact' || data.contact !== ''}
                    error={errors.contact}
                  >
                    <input
                      type="text"
                      value={data.contact}
                      onChange={set('contact')}
                      onFocus={onFocus('contact')}
                      onBlur={onBlur}
                      placeholder={focused === 'contact' ? '手机或邮箱' : ''}
                      className={fieldClass('contact', 'placeholder:text-ink-400/70')}
                      aria-label="联系方式"
                    />
                  </FieldShell>
                </div>

                <FieldShell label="合作方向" floated error={undefined}>
                  <div className="relative">
                    <select
                      value={data.direction}
                      onChange={set('direction')}
                      className={cn(fieldClass('direction'), 'appearance-none pb-2.5 pt-6 pr-10')}
                      aria-label="合作方向"
                    >
                      <option value="" disabled>
                        请选择合作方向
                      </option>
                      {DIRECTIONS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                  </div>
                </FieldShell>

                <FieldShell
                  label="留言内容"
                  required
                  floated={focused === 'message' || data.message !== ''}
                  error={errors.message}
                >
                  <textarea
                    rows={5}
                    value={data.message}
                    onChange={set('message')}
                    onFocus={onFocus('message')}
                    onBlur={onBlur}
                    placeholder={focused === 'message' ? '请简要描述您的需求…' : ''}
                    className={fieldClass('message', 'resize-none placeholder:text-ink-400/70')}
                    aria-label="留言内容"
                  />
                </FieldShell>

                <motion.div variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}>
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className={cn(
                      'inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-wheat-400 to-wheat-300 px-9 py-4 font-bold text-pine-950 transition-all duration-300 sm:w-auto',
                      status === 'loading'
                        ? 'cursor-not-allowed opacity-80'
                        : 'hover:scale-[1.03] hover:shadow-card-hover active:scale-95',
                    )}
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        提交中…
                      </>
                    ) : (
                      <>
                        提交留言
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </motion.div>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
