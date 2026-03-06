'use client'
import { useEffect, useState } from 'react'
import { Note, NoteColor } from '@/types'
import NoteGrid from '@/components/notes/NoteGrid'
import NoteModal from '@/components/notes/NoteModal'
import { useNotesStore } from '@/store/notesStore'
import { notesApi } from '@/lib/notesApi'
import { labelsApi } from '@/lib/labelsApi'
import { Tag } from 'lucide-react'

export default function LabelPage({ params }: { params: { id: string } }) {
  const labelId = parseInt(params.id)
  const { updateNote, updateColor, togglePin, toggleArchive, trashNote } = useNotesStore()
  const [notes, setNotes] = useState<Note[]>([])
  const [labelName, setLabelName] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      notesApi.getByLabel(labelId),
      labelsApi.getAll(),
    ]).then(([notesRes, labelsRes]) => {
      setNotes(notesRes.data.data)
      const label = labelsRes.data.data.find(l => l.id === labelId)
      if (label) setLabelName(label.name)
    }).finally(() => setLoading(false))
  }, [labelId])

  return (
    <>
      <h1 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
        {labelName || 'Label'}
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
          emptyMessage={`No notes with label "${labelName}"`}
          emptyIcon={<Tag className="w-20 h-20" />}
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
