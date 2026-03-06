'use client'
import { useEffect, useState } from 'react'
import { Note, NoteColor } from '@/types'
import NoteGrid from '@/components/notes/NoteGrid'
import NoteModal from '@/components/notes/NoteModal'
import { useNotesStore } from '@/store/notesStore'
import { Archive } from 'lucide-react'

export default function ArchivePage() {
  const { fetchArchived, updateNote, updateColor, togglePin, toggleArchive, trashNote } = useNotesStore()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    fetchArchived().then(setNotes).finally(() => setLoading(false))
  }, [fetchArchived])

  const handleUnarchive = async (id: number) => {
    await toggleArchive(id)
    setNotes(n => n.filter(note => note.id !== id))
  }

  return (
    <>
      <h1 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Archive</h1>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <NoteGrid
          notes={notes}
          variant="archived"
          onArchive={handleUnarchive}
          onTrash={(id) => { trashNote(id); setNotes(n => n.filter(note => note.id !== id)) }}
          onColorChange={updateColor}
          onClick={setSelectedNote}
          emptyMessage="Your archived notes appear here"
          emptyIcon={<Archive className="w-20 h-20" />}
        />
      )}

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={updateNote}
          onPin={togglePin}
          onArchive={(id) => { handleUnarchive(id); setSelectedNote(null) }}
          onTrash={(id) => { trashNote(id); setSelectedNote(null) }}
          onColorChange={updateColor}
        />
      )}
    </>
  )
}
