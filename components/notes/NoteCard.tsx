'use client'
import { useState } from 'react'
import { Pin, PinOff, Archive, Trash2, Palette, Tag, Bell, MoreHorizontal, ArchiveRestore, RotateCcw } from 'lucide-react'
import { Note, NoteColor } from '@/types'
import { getNoteColorClasses, NOTE_COLOR_MAP, cn, formatDate } from '@/lib/utils'
import ColorPicker from './ColorPicker'

interface NoteCardProps {
  note: Note
  onPin?: (id: number) => void
  onArchive?: (id: number) => void
  onTrash?: (id: number) => void
  onRestore?: (id: number) => void
  onDelete?: (id: number) => void
  onColorChange?: (id: number, color: NoteColor) => void
  onClick?: (note: Note) => void
  variant?: 'default' | 'archived' | 'trashed'
}

export default function NoteCard({
  note, onPin, onArchive, onTrash, onRestore, onDelete, onColorChange, onClick, variant = 'default'
}: NoteCardProps) {
  const [showColors, setShowColors] = useState(false)
  const { bg, border } = getNoteColorClasses(note.color)
  const checkedCount = note.checklistItems.filter(i => i.checked).length

  return (
    <div
      className={cn(
        'note-card group relative rounded-2xl border cursor-pointer transition-all duration-200',
        'shadow-note hover:shadow-note-hover',
        bg, border,
        note.color === 'DEFAULT' ? 'border-gray-200' : ''
      )}
      onClick={() => onClick?.(note)}
    >
      <div className="p-4">
        {/* Title */}
        {note.title && (
          <h3 className="font-semibold text-sm text-gray-800 mb-2 leading-snug line-clamp-2">{note.title}</h3>
        )}

        {/* Text content */}
        {note.type === 'TEXT' && note.content && (
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-10 whitespace-pre-wrap">{note.content}</p>
        )}

        {/* Checklist */}
        {note.type === 'CHECKLIST' && note.checklistItems.length > 0 && (
          <div className="space-y-1.5">
            {note.checklistItems.slice(0, 8).map((item) => (
              <div key={item.id} className="flex items-center gap-2 checklist-item">
                <input type="checkbox" checked={item.checked} readOnly onClick={(e) => e.stopPropagation()} />
                <span className={cn('text-sm', item.checked ? 'line-through text-gray-400' : 'text-gray-700')}>
                  {item.text}
                </span>
              </div>
            ))}
            {note.checklistItems.length > 8 && (
              <p className="text-xs text-gray-400 pl-6">+{note.checklistItems.length - 8} more</p>
            )}
          </div>
        )}

        {/* Labels */}
        {note.labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {note.labels.map((label) => (
              <span key={label.id} className="text-xs bg-black/8 text-gray-600 rounded-full px-2 py-0.5">
                {label.name}
              </span>
            ))}
          </div>
        )}

        {/* Reminder */}
        {note.reminder && !note.reminder.fired && (
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
            <Bell className="w-3 h-3" />
            <span>{new Date(note.reminder.remindAt).toLocaleDateString()}</span>
          </div>
        )}

        {/* Date */}
        <p className="text-xs text-gray-400 mt-3">{formatDate(note.updatedAt)}</p>
      </div>

      {/* Pin button (top right) */}
      {variant === 'default' && (
        <button
          onClick={(e) => { e.stopPropagation(); onPin?.(note.id) }}
          className={cn(
            'note-actions absolute top-2 right-2 p-1.5 rounded-full hover:bg-black/8 transition',
            note.pinned ? 'opacity-100' : ''
          )}
          title={note.pinned ? 'Unpin' : 'Pin'}
        >
          {note.pinned
            ? <Pin className="w-4 h-4 text-gray-600 fill-gray-600" />
            : <PinOff className="w-4 h-4 text-gray-500" />}
        </button>
      )}

      {/* Action bar (bottom) */}
      <div
        className="note-actions flex items-center gap-1 px-3 pb-2"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Color picker */}
        {variant !== 'trashed' && (
          <div className="relative">
            <button
              onClick={() => setShowColors(!showColors)}
              className="p-2 rounded-full hover:bg-black/8 transition"
              title="Change color"
            >
              <Palette className="w-4 h-4 text-gray-600" />
            </button>
            {showColors && (
              <ColorPicker
                current={note.color}
                onSelect={(c) => { onColorChange?.(note.id, c); setShowColors(false) }}
                onClose={() => setShowColors(false)}
              />
            )}
          </div>
        )}

        {/* Archive */}
        {variant === 'default' && (
          <button onClick={() => onArchive?.(note.id)} className="p-2 rounded-full hover:bg-black/8 transition" title="Archive">
            <Archive className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Unarchive */}
        {variant === 'archived' && (
          <button onClick={() => onArchive?.(note.id)} className="p-2 rounded-full hover:bg-black/8 transition" title="Unarchive">
            <ArchiveRestore className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Trash */}
        {variant !== 'trashed' && (
          <button onClick={() => onTrash?.(note.id)} className="p-2 rounded-full hover:bg-black/8 transition" title="Delete">
            <Trash2 className="w-4 h-4 text-gray-600" />
          </button>
        )}

        {/* Restore / Delete permanently */}
        {variant === 'trashed' && (
          <>
            <button onClick={() => onRestore?.(note.id)} className="p-2 rounded-full hover:bg-black/8 transition" title="Restore">
              <RotateCcw className="w-4 h-4 text-gray-600" />
            </button>
            <button onClick={() => onDelete?.(note.id)} className="p-2 rounded-full hover:bg-red-50 transition" title="Delete forever">
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </>
        )}
      </div>
    </div>
  )
}
