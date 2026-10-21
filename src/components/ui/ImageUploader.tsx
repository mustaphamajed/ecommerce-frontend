import { ImagePlus, Trash2, Upload } from 'lucide-react'
import { useRef, type ChangeEvent } from 'react'
import { Button } from './Button'
import { ImageThumbnail } from './ImageThumbnail'

type ImageUploaderProps = {
  imageUrl: string | null
  alt: string
  isUploading: boolean
  isRemoving: boolean
  onSelect: (file: File) => void
  onRemove: () => void
}

const ACCEPTED_TYPES = 'image/jpeg,image/png,image/webp'

export function ImageUploader({ imageUrl, alt, isUploading, isRemoving, onSelect, onRemove }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const isBusy = isUploading || isRemoving

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (file) {
      onSelect(file)
    }
  }

  return (
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      {imageUrl ? (
        <ImageThumbnail src={imageUrl} alt={alt} className="size-32 rounded-lg border border-slate-200 text-4xl" />
      ) : (
        <button
          type="button"
          disabled={isBusy}
          onClick={() => inputRef.current?.click()}
          className="flex size-32 shrink-0 flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 text-slate-400 transition hover:border-brand-400 hover:text-brand-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <ImagePlus className="size-7" />
          <span className="text-xs font-medium">Add image</span>
        </button>
      )}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            isLoading={isUploading}
            disabled={isBusy}
            onClick={() => inputRef.current?.click()}
          >
            <Upload className="size-4" />
            {imageUrl ? 'Replace' : 'Upload'}
          </Button>
          {imageUrl && (
            <Button variant="ghost" isLoading={isRemoving} disabled={isBusy} onClick={onRemove}>
              <Trash2 className="size-4" />
              Remove
            </Button>
          )}
        </div>
        <p className="text-sm text-slate-500">JPEG, PNG or WebP, up to 5 MB.</p>
      </div>
      <input ref={inputRef} type="file" accept={ACCEPTED_TYPES} hidden onChange={handleChange} />
    </div>
  )
}
