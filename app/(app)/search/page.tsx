'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Note, NoteColor } from '@/types'
import NoteGrid from '@/components/notes/NoteGrid'
import NoteModal from '@/components/notes/NoteModal'
import { useNotesStore } from '@/store/notesStore'
import { notesApi } from '@/lib/notesApi'
import { Search } from 'lucide-react'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const q = searchParams.get('q') || ''
  const { updateNote, updateColor, togglePin, toggleArchive, trashNote } = useNotesStore()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    if (!q.trim()) { setNotes([]); return }
    setLoading(true)
    notesApi.search(q)
      .then(({ data }) => setNotes(data.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [q])

  return (
    <>
      <h1 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
        {q ? `Results for "${q}"` : 'Search'}
      </h1>

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <NoteGrid
          notes={notes}
          onPin={togglePin}
          onArchive={(id) => { toggleArchive(id); setNotes(n => n.filter(note => note.id !== id)) }}
          onTrash={(id) => { trashNote(id); setNotes(n => n.filter(note => note.id !== id)) }}
          onColorChange={updateColor}
          onClick={setSelectedNote}
          emptyMessage={q ? 'No notes found' : 'Search for notes above'}
          emptyIcon={<Search className="w-20 h-20" />}
        />
      )}

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={updateNote}
          onPin={togglePin}
          onArchive={(id) => { toggleArchive(id); setSelectedNote(null) }}
          onTrash={(id) => { trashNote(id); setSelectedNote(null) }}
          onColorChange={updateColor}
        />
      )}
    </>
  )
}
