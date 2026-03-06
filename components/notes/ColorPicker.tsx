'use client'
import { useEffect, useRef } from 'react'
import { NoteColor } from '@/types'
import { NOTE_COLOR_MAP } from '@/lib/utils'
import { Check } from 'lucide-react'

interface ColorPickerProps {
  current: NoteColor
  onSelect: (color: NoteColor) => void
  onClose: () => void
}

export default function ColorPicker({ current, onSelect, onClose }: ColorPickerProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute bottom-full left-0 mb-1 bg-white rounded-2xl shadow-xl border border-gray-200 p-3 z-50 animate-scale-in"
    >
      <p className="text-xs text-gray-500 mb-2 font-medium">Color</p>
      <div className="grid grid-cols-5 gap-1.5">
        {(Object.entries(NOTE_COLOR_MAP) as [NoteColor, { bg: string; label: string }][]).map(([color, { bg, label }]) => (
          <button
            key={color}
            title={label}
            onClick={() => onSelect(color)}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition hover:scale-110 ${
              color === 'DEFAULT' ? 'border-gray-300 bg-white' : `${bg} border-transparent`
            } ${current === color ? 'border-gray-800' : ''}`}
          >
            {current === color && <Check className="w-3 h-3 text-gray-700" />}
          </button>
        ))}
      </div>
    </div>
  )
}
