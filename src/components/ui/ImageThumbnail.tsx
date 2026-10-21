import { useState } from 'react'
import { cn } from '@/lib/cn'

type ImageThumbnailProps = {
  src: string | null
  alt: string
  className?: string
}

export function ImageThumbnail({ src, alt, className }: ImageThumbnailProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const showImage = src !== null && src !== failedSrc

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center overflow-hidden bg-linear-to-br from-brand-50 to-slate-100 font-semibold text-brand-300',
        className,
      )}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onError={() => setFailedSrc(src)}
          className="size-full object-cover"
        />
      ) : (
        <span aria-hidden="true">{alt.charAt(0).toUpperCase()}</span>
      )}
    </div>
  )
}
