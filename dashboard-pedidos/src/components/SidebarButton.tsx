"use client"

import { Home, Users, Package, ShoppingCart, LucideIcon } from "lucide-react"

interface SidebarButtonProps {
  icon: string
  label: string
  active: boolean
  onClick: () => void
  sidebarOpen: boolean
}

export default function SidebarButton({ icon, label, active, onClick, sidebarOpen }: SidebarButtonProps) {
  const icons: Record<string, LucideIcon> = {
    Home,
    Users,
    Package,
    ShoppingCart
  }

  const Icon = icons[icon]

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${active ? 'bg-emerald-700 text-white' : 'text-emerald-100 hover:bg-emerald-700'
        }`}
    >
      <Icon size={20} />
      {sidebarOpen && <span>{label}</span>}
    </button>
  )
}
