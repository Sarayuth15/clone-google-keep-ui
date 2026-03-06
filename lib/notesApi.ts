import api from './api'
import { ApiResponse, Note, NoteColor, CreateNoteRequest, UpdateNoteRequest } from '@/types'

export const notesApi = {
  getAll:      () => api.get<ApiResponse<Note[]>>('/api/notes'),
  getArchived: () => api.get<ApiResponse<Note[]>>('/api/notes/archived'),
  getTrashed:  () => api.get<ApiResponse<Note[]>>('/api/notes/trash'),
  getShared:   () => api.get<ApiResponse<Note[]>>('/api/notes/shared'),
  getById:     (id: number) => api.get<ApiResponse<Note>>(`/api/notes/${id}`),
  search:      (q: string) => api.get<ApiResponse<Note[]>>(`/api/notes/search?q=${encodeURIComponent(q)}`),
  getByLabel:  (labelId: number) => api.get<ApiResponse<Note[]>>(`/api/notes/by-label/${labelId}`),
  getByColor:  (color: NoteColor) => api.get<ApiResponse<Note[]>>(`/api/notes/by-color/${color}`),

  create:  (data: CreateNoteRequest) => api.post<ApiResponse<Note>>('/api/notes', data),
  update:  (id: number, data: UpdateNoteRequest) => api.put<ApiResponse<Note>>(`/api/notes/${id}`, data),

  updateColor: (id: number, color: NoteColor) =>
    api.patch<ApiResponse<Note>>(`/api/notes/${id}/color`, { color }),
  togglePin:   (id: number) => api.patch<ApiResponse<Note>>(`/api/notes/${id}/pin`),
  toggleArchive: (id: number) => api.patch<ApiResponse<Note>>(`/api/notes/${id}/archive`),
  trash:       (id: number) => api.patch<ApiResponse<Note>>(`/api/notes/${id}/trash`),
  restore:     (id: number) => api.patch<ApiResponse<Note>>(`/api/notes/${id}/restore`),
  delete:      (id: number) => api.delete(`/api/notes/${id}`),
  emptyTrash:  () => api.delete('/api/notes/trash'),

  // Checklist
  addChecklistItem: (noteId: number, text: string, position: number) =>
    api.post<ApiResponse<Note>>(`/api/notes/${noteId}/checklist`, { text, checked: false, position }),
  updateChecklistItem: (noteId: number, itemId: number, data: { text?: string; checked?: boolean; position?: number }) =>
    api.patch<ApiResponse<Note>>(`/api/notes/${noteId}/checklist/${itemId}`, data),
  deleteChecklistItem: (noteId: number, itemId: number) =>
    api.delete<ApiResponse<Note>>(`/api/notes/${noteId}/checklist/${itemId}`),

  // Reminder
  setReminder: (noteId: number, remindAt: string, repeat: string) =>
    api.post<ApiResponse<Note>>(`/api/notes/${noteId}/reminder`, { remindAt, repeat }),
  deleteReminder: (noteId: number) =>
    api.delete<ApiResponse<Note>>(`/api/notes/${noteId}/reminder`),
}
