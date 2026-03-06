'use client'
import { useState, useEffect, useRef } from 'react'
import { X, Pin, PinOff, Archive, Trash2, Plus, Check } from 'lucide-react'
import { Note, NoteColor, UpdateNoteRequest } from '@/types'
import { getNoteColorClasses, cn } from '@/lib/utils'
import ColorPicker from './ColorPicker'
import { notesApi } from '@/lib/notesApi'
import toast from 'react-hot-toast'

interface NoteModalProps {
  note: Note
  onClose: () => void
  onUpdate: (id: number, data: UpdateNoteRequest) => void
  onPin: (id: number) => void
  onArchive: (id: number) => void
  onTrash: (id: number) => void
  onColorChange: (id: number, color: NoteColor) => void
}

export default function NoteModal({ note, onClose, onUpdate, onPin, onArchive, onTrash, onColorChange }: NoteModalProps) {
  const [title, setTitle] = useState(note.title || '')
  const [content, setContent] = useState(note.content || '')
  const [items, setItems] = useState(note.checklistItems)
  const [newItem, setNewItem] = useState('')
  const [showColors, setShowColors] = useState(false)
  const { bg, border } = getNoteColorClasses(note.color)
  const backdropRef = useRef<HTMLDivElement>(null)

  // Save on close
  const handleClose = () => {
    onUpdate(note.id, {
      title: title.trim() || undefined,
      content: content.trim() || undefined,
    })
    onClose()
  }

  const handleCheckItem = async (itemId: number, checked: boolean) => {
    try {
      await notesApi.updateChecklistItem(note.id, itemId, { checked })
      setItems(items.map(i => i.id === itemId ? { ...i, checked } : i))
    } catch { toast.error('Failed to update item') }
  }

  const handleAddItem = async () => {
    if (!newItem.trim()) return
    try {
      const { data } = await notesApi.addChecklistItem(note.id, newItem.trim(), items.length)
      setItems(data.data.checklistItems)
      setNewItem('')
    } catch { toast.error('Failed to add item') }
  }

  const handleDeleteItem = async (itemId: number) => {
    try {
      await notesApi.deleteChecklistItem(note.id, itemId)
      setItems(items.filter(i => i.id !== itemId))
    } catch { toast.error('Failed to delete item') }
  }

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 animate-fade-in"
      onClick={(e) => { if (e.target === backdropRef.current) handleClose() }}
    >
      <div className={cn(
        'w-full max-w-lg rounded-2xl border shadow-2xl animate-scale-in flex flex-col max-h-[85vh]',
        bg, border, note.color === 'DEFAULT' ? 'border-gray-200 bg-white' : ''
      )}>
        {/* Header */}
        <div className="flex items-start gap-2 p-4 pb-0">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="flex-1 bg-transparent text-base font-bold text-gray-800 outline-none placeholder-gray-400"
          />
          <button onClick={() => onPin(note.id)} className="p-1.5 rounded-full hover:bg-black/8 transition flex-shrink-0">
            {note.pinned ? <Pin className="w-4 h-4 text-gray-600 fill-gray-600" /> : <PinOff className="w-4 h-4 text-gray-500" />}
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-4 py-3">
          {note.type === 'TEXT' && (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Take a note…"
              rows={6}
              className="w-full bg-transparent text-sm text-gray-700 outline-none resize-none placeholder-gray-400"
            />
          )}

          {note.type === 'CHECKLIST' && (
            <div className="space-y-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 checklist-item group/item">
                  <input type="checkbox" checked={item.checked} onChange={(e) => handleCheckItem(item.id, e.target.checked)} />
                  <span className={cn('flex-1 text-sm', item.checked ? 'line-through text-gray-400' : 'text-gray-700')}>{item.text}</span>
                  <button onClick={() => handleDeleteItem(item.id)} className="opacity-0 group-hover/item:opacity-100 transition">
                    <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddItem() }}
                  placeholder="+ List item"
                  className="flex-1 bg-transparent text-sm outline-none placeholder-gray-400 text-gray-600 py-1"
                />
                {newItem && <button onClick={handleAddItem}><Check className="w-4 h-4 text-[#1a73e8]" /></button>}
              </div>
            </div>
          )}

          {/* Labels */}
          {note.labels.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {note.labels.map((label) => (
                <span key={label.id} className="text-xs bg-black/8 text-gray-600 rounded-full px-2 py-0.5">{label.name}</span>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center gap-1 px-3 py-3 border-t border-black/5">
          <div className="relative">
            <button onClick={() => setShowColors(!showColors)} className="p-2 rounded-full hover:bg-black/8 transition">
              <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="currentColor">
                <path d="M20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-3.12 3.12-1.41-1.42-1.42 1.42 1.41 1.41-6.6 6.6A2 2 0 005 16v3h3a2 2 0 001.42-.59l6.6-6.6 1.41 1.42 1.42-1.42-1.42-1.41 3.12-3.12a1 1 0 000-1.65zM8 17H7v-1l6.6-6.6 1 1z"/>
              </svg>
            </button>
            {showColors && <ColorPicker current={note.color} onSelect={(c) => { onColorChange(note.id, c); setShowColors(false) }} onClose={() => setShowColors(false)} />}
          </div>
          <button onClick={() => { onArchive(note.id); onClose() }} className="p-2 rounded-full hover:bg-black/8 transition" title="Archive">
            <Archive className="w-4 h-4 text-gray-600" />
          </button>
          <button onClick={() => { onTrash(note.id); onClose() }} className="p-2 rounded-full hover:bg-black/8 transition" title="Delete">
            <Trash2 className="w-4 h-4 text-gray-600" />
          </button>
          <div className="flex-1" />
          <button onClick={handleClose} className="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-black/8 rounded-xl transition">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
