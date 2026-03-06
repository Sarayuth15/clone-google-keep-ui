'use client'
import { useEffect, useState } from 'react'
import { useNotesStore } from '@/store/notesStore'
import { Note, NoteColor } from '@/types'
import CreateNoteBar from '@/components/notes/CreateNoteBar'
import NoteGrid from '@/components/notes/NoteGrid'
import NoteModal from '@/components/notes/NoteModal'
import { Lightbulb } from 'lucide-react'

export default function NotesPage() {
  const { notes, loading, fetchNotes, createNote, updateNote, updateColor, togglePin, toggleArchive, trashNote } = useNotesStore()
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => { fetchNotes() }, [fetchNotes])

  return (
    <>
      <CreateNoteBar onSave={createNote} />

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <NoteGrid
          notes={notes}
          onPin={togglePin}
          onArchive={toggleArchive}
          onTrash={trashNote}
          onColorChange={updateColor}
          onClick={setSelectedNote}
          emptyMessage="Notes you add appear here"
          emptyIcon={<Lightbulb className="w-20 h-20" />}
        />
      )}

      {selectedNote && (
        <NoteModal
          note={selectedNote}
          onClose={() => setSelectedNote(null)}
          onUpdate={updateNote}
          onPin={(id) => { togglePin(id); setSelectedNote(n => n ? { ...n, pinned: !n.pinned } : n) }}
          onArchive={(id) => { toggleArchive(id); setSelectedNote(null) }}
          onTrash={(id) => { trashNote(id); setSelectedNote(null) }}
          onColorChange={updateColor}
        />
      )}
    </>
  )
}
