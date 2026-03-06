'use client'
import { useState, useRef } from 'react'
import { CheckSquare, Image, Plus, X, Check } from 'lucide-react'
import { NoteColor, NoteType, CreateNoteRequest } from '@/types'
import { getNoteColorClasses, cn } from '@/lib/utils'
import ColorPicker from './ColorPicker'

interface CreateNoteBarProps {
  onSave: (note: CreateNoteRequest) => void
}

export default function CreateNoteBar({ onSave }: CreateNoteBarProps) {
  const [expanded, setExpanded] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [color, setColor] = useState<NoteColor>('DEFAULT')
  const [type, setType] = useState<NoteType>('TEXT')
  const [checklistItems, setChecklistItems] = useState<{ text: string; checked: boolean }[]>([])
  const [newItem, setNewItem] = useState('')
  const [showColors, setShowColors] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const { bg, border } = getNoteColorClasses(color)

  const reset = () => {
    setTitle(''); setContent(''); setColor('DEFAULT')
    setType('TEXT'); setChecklistItems([]); setNewItem('')
    setExpanded(false); setShowColors(false)
  }

  const handleSave = () => {
    if (!title.trim() && !content.trim() && checklistItems.length === 0) { reset(); return }
    onSave({
      title: title.trim() || undefined,
      content: content.trim() || undefined,
      color, type,
      checklistItems: checklistItems.map((item, i) => ({ ...item, position: i })),
    })
    reset()
  }

  const addItem = () => {
    if (!newItem.trim()) return
    setChecklistItems([...checklistItems, { text: newItem.trim(), checked: false }])
    setNewItem('')
  }

  if (!expanded) {
    return (
      <div className="bg-white border border-gray-300 rounded-2xl shadow-note px-4 py-3.5 flex items-center gap-3 cursor-text mb-6 hover:shadow-note-hover transition-shadow"
        onClick={() => setExpanded(true)}>
        <span className="text-gray-400 text-sm flex-1">Take a note…</span>
        <button className="p-1 hover:bg-gray-100 rounded-full" onClick={(e) => { e.stopPropagation(); setType('CHECKLIST'); setExpanded(true) }}>
          <CheckSquare className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    )
  }

  return (
    <div ref={containerRef} className={cn('border rounded-2xl shadow-note-hover mb-6 overflow-hidden transition-colors', bg, border, color === 'DEFAULT' ? 'border-gray-300' : '')}>
      <div className="p-4">
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full bg-transparent text-base font-semibold text-gray-800 outline-none placeholder-gray-400 mb-2"
        />

        {type === 'TEXT' && (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Take a note…"
            rows={3}
            className="w-full bg-transparent text-sm text-gray-700 outline-none placeholder-gray-400 resize-none"
          />
        )}

        {type === 'CHECKLIST' && (
          <div className="space-y-2">
            {checklistItems.map((item, i) => (
              <div key={i} className="flex items-center gap-2 checklist-item">
                <input type="checkbox" checked={item.checked}
                  onChange={() => setChecklistItems(checklistItems.map((it, j) => j === i ? { ...it, checked: !it.checked } : it))} />
                <input value={item.text}
                  onChange={(e) => setChecklistItems(checklistItems.map((it, j) => j === i ? { ...it, text: e.target.value } : it))}
                  className="flex-1 bg-transparent text-sm outline-none text-gray-700" />
                <button onClick={() => setChecklistItems(checklistItems.filter((_, j) => j !== i))}>
                  <X className="w-3.5 h-3.5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
            ))}
            <div className="flex items-center gap-2">
              <div className="w-4.5 h-4.5" />
              <input value={newItem} onChange={(e) => setNewItem(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') addItem() }}
                placeholder="+ List item"
                className="flex-1 bg-transparent text-sm outline-none text-gray-500 placeholder-gray-400" />
            </div>
          </div>
        )}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-1 px-3 pb-3">
        <div className="relative">
          <button onClick={() => setShowColors(!showColors)} className="p-2 rounded-full hover:bg-black/8 transition" title="Background color">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-gray-600" fill="currentColor">
              <path d="M20.71 5.63l-2.34-2.34a1 1 0 00-1.41 0l-3.12 3.12-1.41-1.42-1.42 1.42 1.41 1.41-6.6 6.6A2 2 0 005 16v3h3a2 2 0 001.42-.59l6.6-6.6 1.41 1.42 1.42-1.42-1.42-1.41 3.12-3.12a1 1 0 000-1.65zM8 17H7v-1l6.6-6.6 1 1z"/>
            </svg>
          </button>
          {showColors && <ColorPicker current={color} onSelect={(c) => { setColor(c); setShowColors(false) }} onClose={() => setShowColors(false)} />}
        </div>

        {type === 'TEXT' && (
          <button onClick={() => setType('CHECKLIST')} className="p-2 rounded-full hover:bg-black/8 transition" title="Checklist">
            <CheckSquare className="w-4 h-4 text-gray-600" />
          </button>
        )}

        <div className="flex-1" />
        <button onClick={handleSave} className="px-4 py-1.5 text-sm font-semibold text-gray-700 hover:bg-black/8 rounded-xl transition">
          Close
        </button>
        <button onClick={handleSave} className="px-4 py-1.5 text-sm font-semibold text-[#1a73e8] hover:bg-[#1a73e8]/10 rounded-xl transition">
          Save
        </button>
      </div>
    </div>
  )
}
