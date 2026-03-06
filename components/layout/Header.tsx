'use client'
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, Search, X, Settings, LogOut, User } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { notesApi } from '@/lib/notesApi'

interface HeaderProps { onMenuToggle: () => void }

export default function Header({ onMenuToggle }: HeaderProps) {
  const router = useRouter()
  const { user, logout } = useAuthStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16 flex items-center px-4 gap-4">
      {/* Logo + Menu */}
      <div className="flex items-center gap-1 min-w-[240px]">
        <button
          onClick={onMenuToggle}
          className="p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={() => router.push('/notes')}
          className="flex items-center gap-2 ml-1 hover:opacity-80 transition"
        >
          <div className="w-8 h-8 bg-[#fbbc04] rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#202124">
              <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z"/>
            </svg>
          </div>
          <span className="text-xl font-bold font-display text-[#202124]">Keep</span>
        </button>
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-auto">
        <div className={`flex items-center bg-[#f1f3f4] rounded-2xl px-4 gap-3 transition-all ${searching ? 'shadow-md bg-white ring-1 ring-gray-300' : 'hover:shadow-sm'}`}>
          <Search className="w-5 h-5 text-gray-500 flex-shrink-0" />
          <input
            ref={searchRef}
            type="text"
            placeholder="Search your notes"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setSearching(true)}
            onBlur={() => setSearching(false)}
            className="flex-1 bg-transparent py-3 text-sm outline-none text-gray-800 placeholder-gray-500"
          />
          {searchQuery && (
            <button type="button" onClick={() => setSearchQuery('')}>
              <X className="w-4 h-4 text-gray-500" />
            </button>
          )}
        </div>
      </form>

      {/* Profile */}
      <div className="relative ml-auto">
        <button
          onClick={() => setShowProfile(!showProfile)}
          className="w-9 h-9 rounded-full bg-[#1a73e8] flex items-center justify-center text-white font-semibold text-sm hover:opacity-90 transition"
        >
          {user?.name?.[0]?.toUpperCase() || 'U'}
        </button>

        {showProfile && (
          <div className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-scale-in">
            <div className="p-4 border-b border-gray-100">
              <p className="font-semibold text-sm text-gray-800">{user?.name}</p>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
            <div className="p-2">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-xl transition"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
