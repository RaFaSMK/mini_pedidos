"use client"

import { LogOut } from "lucide-react"

interface LogoutSidebarButtonProps {
  icon: string
  label: string
  onClick: () => void
  sidebarOpen: boolean
}

export default function LogoutSidebarButton({ label, onClick, sidebarOpen }: LogoutSidebarButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-emerald-100 hover:bg-emerald-700 transition-all"
    >
      <LogOut size={20} />
      {sidebarOpen && <span>{label}</span>}
    </button>
  )
}
