import { cn } from '@/lib/utils'

/** 金色小英文全大写标签，左右 32px 细线 */
export default function Eyebrow({
  text,
  className,
  align = 'left',
}: {
  text: string
  className?: string
  align?: 'left' | 'center'
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-4',
        align === 'center' && 'justify-center',
        className,
      )}
    >
      <span className="h-px w-8 bg-wheat-400/70" aria-hidden />
      <span className="eyebrow">{text}</span>
      <span className="h-px w-8 bg-wheat-400/70" aria-hidden />
    </div>
  )
}
