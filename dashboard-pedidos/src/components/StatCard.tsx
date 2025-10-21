"use client"

import { Users, Package, ShoppingCart, LucideIcon } from "lucide-react"

interface StatCardProps {
  icon: string
  label: string
  value: number
  color: 'emerald' | 'blue' | 'orange'
}

export default function StatCard({ icon, label, value, color }: StatCardProps) {
  const icons: Record<string, LucideIcon> = {
    Users,
    Package,
    ShoppingCart
  }

  const Icon = icons[icon]

  const colorClasses = {
    emerald: {
      border: 'border-emerald-600',
      bg: 'bg-emerald-100',
      text: 'text-emerald-600'
    },
    blue: {
      border: 'border-blue-600',
      bg: 'bg-blue-100',
      text: 'text-blue-600'
    },
    orange: {
      border: 'border-orange-600',
      bg: 'bg-orange-100',
      text: 'text-orange-600'
    }
  }

  const colors = colorClasses[color]

  return (
    <div className={`bg-white rounded-xl shadow-sm p-6 border-l-4 ${colors.border}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
          <Icon className={colors.text} size={24} />
        </div>
      </div>
    </div>
  )
}