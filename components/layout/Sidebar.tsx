'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Lightbulb, Archive, Trash2, Tag, Plus, Edit2, Check, X } from 'lucide-react'
import { labelsApi } from '@/lib/labelsApi'
import { Label } from '@/types'
import { cn } from '@/lib/utils'
import toast from 'react-hot-toast'

interface SidebarProps { isOpen: boolean }

export default function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname()
  const [labels, setLabels] = useState<Label[]>([])
  const [addingLabel, setAddingLabel] = useState(false)
  const [newLabelName, setNewLabelName] = useState('')

  useEffect(() => {
    labelsApi.getAll().then(({ data }) => setLabels(data.data)).catch(() => {})
  }, [])

  const handleAddLabel = async () => {
    if (!newLabelName.trim()) return
    try {
      const { data } = await labelsApi.create(newLabelName.trim())
      setLabels([...labels, data.data])
      setNewLabelName('')
      setAddingLabel(false)
      toast.success('Label created')
    } catch { toast.error('Failed to create label') }
  }

  const navItem = (href: string, icon: React.ReactNode, label: string) => {
    const active = pathname === href
    return (
      <Link href={href} className={cn(
        'flex items-center gap-4 rounded-r-full py-3 transition-all',
        isOpen ? 'px-6' : 'px-5 justify-center',
        active ? 'bg-[#feefc3] text-[#202124] font-semibold' : 'text-gray-600 hover:bg-gray-100'
      )}>
        <span className="flex-shrink-0">{icon}</span>
        {isOpen && <span className="text-sm truncate">{label}</span>}
      </Link>
    )
  }

  return (
    <aside className={cn(
      'fixed left-0 top-16 bottom-0 z-40 bg-white overflow-y-auto overflow-x-hidden transition-all duration-300 border-r border-transparent',
      isOpen ? 'w-64' : 'w-[72px]'
    )}>
      <nav className="py-2">
        {navItem('/notes', <Lightbulb className="w-5 h-5" />, 'Notes')}
        {navItem('/archive', <Archive className="w-5 h-5" />, 'Archive')}
        {navItem('/trash', <Trash2 className="w-5 h-5" />, 'Trash')}

        {/* Labels */}
        {isOpen && labels.length > 0 && (
          <div className="mt-2 mb-1 px-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Labels</p>
          </div>
        )}

        {labels.map((label) =>
          navItem(`/label/${label.id}`, <Tag className="w-5 h-5" />, label.name)
        )}

        {/* Add label */}
        {isOpen && (
          <div className="px-4 mt-1">
            {addingLabel ? (
              <div className="flex items-center gap-2 px-2 py-2">
                <input
                  autoFocus
                  value={newLabelName}
                  onChange={(e) => setNewLabelName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleAddLabel(); if (e.key === 'Escape') setAddingLabel(false) }}
                  placeholder="New label"
                  className="flex-1 text-sm outline-none border-b border-gray-300 py-1 focus:border-[#1a73e8]"
                />
                <button onClick={handleAddLabel} className="text-[#1a73e8] hover:opacity-70"><Check className="w-4 h-4" /></button>
                <button onClick={() => setAddingLabel(false)} className="text-gray-400 hover:opacity-70"><X className="w-4 h-4" /></button>
              </div>
            ) : (
              <button
                onClick={() => setAddingLabel(true)}
                className="flex items-center gap-4 w-full px-2 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-r-full transition"
              >
                <Plus className="w-5 h-5" />
                <span>Create label</span>
              </button>
            )}
          </div>
        )}
      </nav>
    </aside>
  )
}
