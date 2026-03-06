import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { NoteColor } from '@/types'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const NOTE_COLOR_MAP: Record<NoteColor, { bg: string; border: string; label: string }> = {
  DEFAULT:  { bg: 'bg-white',           border: 'border-gray-200',  label: 'Default' },
  RED:      { bg: 'bg-[#f28b82]',       border: 'border-[#f28b82]', label: 'Tomato' },
  ORANGE:   { bg: 'bg-[#fbbc04]',       border: 'border-[#fbbc04]', label: 'Flamingo' },
  YELLOW:   { bg: 'bg-[#fff475]',       border: 'border-[#fff475]', label: 'Banana' },
  GREEN:    { bg: 'bg-[#ccff90]',       border: 'border-[#ccff90]', label: 'Sage' },
  TEAL:     { bg: 'bg-[#a7ffeb]',       border: 'border-[#a7ffeb]', label: 'Basil' },
  BLUE:     { bg: 'bg-[#cbf0f8]',       border: 'border-[#cbf0f8]', label: 'Peacock' },
  DARK_BLUE:{ bg: 'bg-[#aecbfa]',       border: 'border-[#aecbfa]', label: 'Blueberry' },
  PURPLE:   { bg: 'bg-[#d7aefb]',       border: 'border-[#d7aefb]', label: 'Lavender' },
  PINK:     { bg: 'bg-[#fdcfe8]',       border: 'border-[#fdcfe8]', label: 'Grape' },
  BROWN:    { bg: 'bg-[#e6c9a8]',       border: 'border-[#e6c9a8]', label: 'Graphite' },
  GRAY:     { bg: 'bg-[#e8eaed]',       border: 'border-[#e8eaed]', label: 'Gray' },
  DARK_GRAY:{ bg: 'bg-[#b0bec5]',       border: 'border-[#b0bec5]', label: 'Dark Gray' },
}

export function getNoteColorClasses(color: NoteColor) {
  return NOTE_COLOR_MAP[color] ?? NOTE_COLOR_MAP.DEFAULT
}

export function formatDate(dateStr: string) {
  const date = new Date(dateStr)
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
}
