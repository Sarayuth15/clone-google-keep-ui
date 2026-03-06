'use client'
import { Note, NoteColor } from '@/types'
import NoteCard from './NoteCard'
import Masonry from 'react-masonry-css'

const BREAKPOINTS = { default: 4, 1280: 3, 1024: 2, 640: 1 }

interface NoteGridProps {
  notes: Note[]
  onPin?: (id: number) => void
  onArchive?: (id: number) => void
  onTrash?: (id: number) => void
  onRestore?: (id: number) => void
  onDelete?: (id: number) => void
  onColorChange?: (id: number, color: NoteColor) => void
  onClick?: (note: Note) => void
  variant?: 'default' | 'archived' | 'trashed'
  emptyMessage?: string
  emptyIcon?: React.ReactNode
}

export default function NoteGrid({
  notes, onPin, onArchive, onTrash, onRestore, onDelete, onColorChange, onClick,
  variant = 'default', emptyMessage = 'No notes here', emptyIcon
}: NoteGridProps) {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="text-gray-300 mb-4">{emptyIcon || (
          <svg viewBox="0 0 24 24" className="w-20 h-20" fill="currentColor">
            <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
          </svg>
        )}</div>
        <p className="text-gray-400 text-lg font-medium">{emptyMessage}</p>
      </div>
    )
  }

  const pinned = notes.filter((n) => n.pinned)
  const unpinned = notes.filter((n) => !n.pinned)

  return (
    <div className="space-y-6 animate-fade-in">
      {pinned.length > 0 && (
        <section>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Pinned</p>
          <Masonry breakpointCols={BREAKPOINTS} className="masonry-grid" columnClassName="masonry-column">
            {pinned.map((note) => (
              <NoteCard key={note.id} note={note} variant={variant}
                onPin={onPin} onArchive={onArchive} onTrash={onTrash}
                onRestore={onRestore} onDelete={onDelete}
                onColorChange={onColorChange} onClick={onClick} />
            ))}
          </Masonry>
        </section>
      )}

      {unpinned.length > 0 && (
        <section>
          {pinned.length > 0 && (
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3 px-1">Others</p>
          )}
          <Masonry breakpointCols={BREAKPOINTS} className="masonry-grid" columnClassName="masonry-column">
            {unpinned.map((note) => (
              <NoteCard key={note.id} note={note} variant={variant}
                onPin={onPin} onArchive={onArchive} onTrash={onTrash}
                onRestore={onRestore} onDelete={onDelete}
                onColorChange={onColorChange} onClick={onClick} />
            ))}
          </Masonry>
        </section>
      )}
    </div>
  )
}
