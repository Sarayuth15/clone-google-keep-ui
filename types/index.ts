// ── Enums ──────────────────────────────────────────────────────────────────
export type NoteType = 'TEXT' | 'CHECKLIST' | 'IMAGE'

export type NoteColor =
  | 'DEFAULT' | 'RED' | 'ORANGE' | 'YELLOW' | 'GREEN'
  | 'TEAL' | 'BLUE' | 'DARK_BLUE' | 'PURPLE' | 'PINK'
  | 'BROWN' | 'GRAY' | 'DARK_GRAY'

export type ReminderRepeat = 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY'
export type CollaboratorPermission = 'VIEW' | 'EDIT'

// ── Sub-types ──────────────────────────────────────────────────────────────
export interface ChecklistItem {
  id: number
  text: string
  checked: boolean
  position: number
}

export interface NoteLabel {
  id: number
  name: string
}

export interface Collaborator {
  userId: number
  name: string
  email: string
  permission: CollaboratorPermission
}

export interface Reminder {
  id: number
  remindAt: string
  repeat: ReminderRepeat
  fired: boolean
}

export interface NoteImage {
  id: number
  imageUrl: string
  altText?: string
  position: number
}

// ── Note ──────────────────────────────────────────────────────────────────
export interface Note {
  id: number
  title?: string
  content?: string
  type: NoteType
  color: NoteColor
  pinned: boolean
  archived: boolean
  trashed: boolean
  checklistItems: ChecklistItem[]
  labels: NoteLabel[]
  collaborators: Collaborator[]
  reminder?: Reminder
  images: NoteImage[]
  ownerId: number
  ownerName: string
  createdAt: string
  updatedAt: string
}

// ── Label ─────────────────────────────────────────────────────────────────
export interface Label {
  id: number
  name: string
  noteCount: number
  createdAt: string
}

// ── Auth ──────────────────────────────────────────────────────────────────
export interface User {
  id: number
  name: string
  email: string
  profilePicture?: string
  createdAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  tokenType: string
  user: User
}

// ── API ──────────────────────────────────────────────────────────────────
export interface ApiResponse<T> {
  success: boolean
  message?: string
  data: T
  timestamp: string
}

// ── Requests ─────────────────────────────────────────────────────────────
export interface CreateNoteRequest {
  title?: string
  content?: string
  type?: NoteType
  color?: NoteColor
  pinned?: boolean
  checklistItems?: { text: string; checked: boolean; position: number }[]
  labelIds?: number[]
}

export interface UpdateNoteRequest {
  title?: string
  content?: string
  color?: NoteColor
  pinned?: boolean
  labelIds?: number[]
}
