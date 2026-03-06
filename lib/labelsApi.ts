import api from './api'
import { ApiResponse, Label } from '@/types'

export const labelsApi = {
  getAll:  () => api.get<ApiResponse<Label[]>>('/api/labels'),
  create:  (name: string) => api.post<ApiResponse<Label>>('/api/labels', { name }),
  update:  (id: number, name: string) => api.put<ApiResponse<Label>>(`/api/labels/${id}`, { name }),
  delete:  (id: number) => api.delete(`/api/labels/${id}`),
}
