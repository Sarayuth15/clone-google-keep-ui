import { create } from 'zustand'
import { Note, NoteColor, CreateNoteRequest, UpdateNoteRequest } from '@/types'
import { notesApi } from '@/lib/notesApi'
import toast from 'react-hot-toast'

interface NotesState {
  notes: Note[]
  loading: boolean
  fetchNotes: () => Promise<void>
  fetchArchived: () => Promise<Note[]>
  fetchTrashed: () => Promise<Note[]>
  createNote: (data: CreateNoteRequest) => Promise<Note | null>
  updateNote: (id: number, data: UpdateNoteRequest) => Promise<void>
  updateColor: (id: number, color: NoteColor) => Promise<void>
  togglePin: (id: number) => Promise<void>
  toggleArchive: (id: number) => Promise<void>
  trashNote: (id: number) => Promise<void>
  restoreNote: (id: number) => Promise<void>
  deleteNote: (id: number) => Promise<void>
  emptyTrash: () => Promise<void>
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  loading: false,

  fetchNotes: async () => {
    set({ loading: true })
    try {
      const { data } = await notesApi.getAll()
      set({ notes: data.data })
    } catch { toast.error('Failed to load notes') }
    finally { set({ loading: false }) }
  },

  fetchArchived: async () => {
    const { data } = await notesApi.getArchived()
    return data.data
  },

  fetchTrashed: async () => {
    const { data } = await notesApi.getTrashed()
    return data.data
  },

  createNote: async (noteData) => {
    try {
      const { data } = await notesApi.create(noteData)
      set((s) => ({ notes: [data.data, ...s.notes] }))
      return data.data
    } catch {
      toast.error('Failed to create note')
      return null
    }
  },

  updateNote: async (id, noteData) => {
    try {
      const { data } = await notesApi.update(id, noteData)
      set((s) => ({ notes: s.notes.map((n) => (n.id === id ? data.data : n)) }))
    } catch { toast.error('Failed to update note') }
  },

  updateColor: async (id, color) => {
    try {
      const { data } = await notesApi.updateColor(id, color)
      set((s) => ({ notes: s.notes.map((n) => (n.id === id ? data.data : n)) }))
    } catch { toast.error('Failed to update color') }
  },

  togglePin: async (id) => {
    try {
      const { data } = await notesApi.togglePin(id)
      set((s) => ({ notes: s.notes.map((n) => (n.id === id ? data.data : n)) }))
    } catch { toast.error('Failed to pin note') }
  },

  toggleArchive: async (id) => {
    try {
      await notesApi.toggleArchive(id)
      set((s) => ({ notes: s.notes.filter((n) => n.id !== id) }))
      toast.success('Note archived')
    } catch { toast.error('Failed to archive note') }
  },

  trashNote: async (id) => {
    try {
      await notesApi.trash(id)
      set((s) => ({ notes: s.notes.filter((n) => n.id !== id) }))
      toast.success('Note moved to trash')
    } catch { toast.error('Failed to trash note') }
  },

  restoreNote: async (id) => {
    try {
      await notesApi.restore(id)
      toast.success('Note restored')
    } catch { toast.error('Failed to restore note') }
  },

  deleteNote: async (id) => {
    try {
      await notesApi.delete(id)
      toast.success('Note deleted permanently')
    } catch { toast.error('Failed to delete note') }
  },

  emptyTrash: async () => {
    try {
      await notesApi.emptyTrash()
      toast.success('Trash emptied')
    } catch { toast.error('Failed to empty trash') }
  },
}))
