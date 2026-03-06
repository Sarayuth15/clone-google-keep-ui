# Google Keep Clone — Next.js Frontend

A production-ready frontend for the Google Keep Clone REST API, built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and **Zustand**.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Configure API URL
cp .env.local.example .env.local
# Edit .env.local → set NEXT_PUBLIC_API_URL to your Spring Boot API

# 3. Run dev server
npm run dev
```

Open → `http://localhost:3000`

---

## 🏗️ Project Structure

```
keep-frontend/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx      # Login page
│   │   └── register/page.tsx   # Register page
│   └── (app)/
│       ├── layout.tsx          # Main app layout (header + sidebar)
│       ├── notes/page.tsx      # Home — all active notes
│       ├── archive/page.tsx    # Archived notes
│       ├── trash/page.tsx      # Trash
│       ├── search/page.tsx     # Search results
│       └── label/[id]/page.tsx # Notes by label
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # Top bar with search + profile
│   │   └── Sidebar.tsx         # Nav sidebar with labels
│   └── notes/
│       ├── NoteCard.tsx        # Individual note card
│       ├── NoteGrid.tsx        # Masonry grid layout
│       ├── NoteModal.tsx       # Full note editor dialog
│       ├── CreateNoteBar.tsx   # Note creation input
│       └── ColorPicker.tsx     # Color picker popover
├── lib/
│   ├── api.ts                  # Axios instance + JWT interceptors
│   ├── authApi.ts              # Auth endpoints
│   ├── notesApi.ts             # Notes endpoints
│   ├── labelsApi.ts            # Labels endpoints
│   └── utils.ts                # Helpers + color map
├── store/
│   ├── authStore.ts            # Zustand auth state
│   └── notesStore.ts           # Zustand notes state
└── types/index.ts              # All TypeScript types
```

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 Auth | Login, Register, JWT auto-refresh |
| 📝 Create notes | Text or checklist, with title + color |
| 🎨 Colors | 13 background colors, live color picker |
| 📌 Pin | Pin notes to top |
| 🗄️ Archive | Archive/unarchive notes |
| 🗑️ Trash | Soft delete, restore, permanent delete |
| 🔍 Search | Full-text search across all notes |
| 🏷️ Labels | Browse by label, create labels in sidebar |
| ✅ Checklist | Check/uncheck items inside notes |
| 📱 Responsive | Masonry grid adapts 1–4 columns |

---

## ⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8080` | Spring Boot API base URL |

---

## 🔗 Connecting to the API

Make sure the Spring Boot backend is running with CORS configured to allow `http://localhost:3000`.

In `application.yml` (backend):
```yaml
app:
  cors:
    allowed-origins:
      - http://localhost:3000
```
