'use client'
import { useEffect, useState } from 'react'
import { Note } from '@/types'
import NoteGrid from '@/components/notes/NoteGrid'
import { useNotesStore } from '@/store/notesStore'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

export default function TrashPage() {
  const { fetchTrashed, restoreNote, deleteNote, emptyTrash } = useNotesStore()
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => fetchTrashed().then(setNotes).finally(() => setLoading(false))
  useEffect(() => { load() }, [])

  const handleRestore = async (id: number) => {
    await restoreNote(id)
    setNotes(n => n.filter(note => note.id !== id))
    toast.success('Note restored')
  }

  const handleDelete = async (id: number) => {
    await deleteNote(id)
    setNotes(n => n.filter(note => note.id !== id))
  }

  const handleEmptyTrash = async () => {
    if (!confirm('Permanently delete all notes in trash?')) return
    await emptyTrash()
    setNotes([])
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Trash</h1>
        {notes.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            className="text-sm text-gray-600 hover:text-red-600 font-medium transition"
          >
            Empty Trash
          </button>
        )}
      </div>

      {notes.length > 0 && (
        <p className="text-xs text-gray-400 mb-4">Notes in Trash are deleted after 7 days.</p>
      )}

      {loading ? (
        <div className="flex justify-center py-16">
          <div className="w-8 h-8 border-2 border-[#1a73e8] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <NoteGrid
          notes={notes}
          variant="trashed"
          onRestore={handleRestore}
          onDelete={handleDelete}
          emptyMessage="No notes in Trash"
          emptyIcon={<Trash2 className="w-20 h-20" />}
        />
      )}
    </>
  )
}
