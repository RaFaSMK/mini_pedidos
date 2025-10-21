"use client"

import { Plus } from "lucide-react"

interface PageHeaderProps {
  title: string
  subtitle?: string
  buttonText?: string
  onButtonClick?: () => void
}

export default function PageHeader({ title, subtitle, buttonText, onButtonClick }: PageHeaderProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
        </div>
        {buttonText && onButtonClick && (
          <button
            onClick={onButtonClick}
            className="flex items-center gap-2 bg-linear-to-r from-emerald-600 to-teal-600 text-white px-6 py-3 rounded-lg hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
          >
            <Plus size={20} />
            <span>{buttonText}</span>
          </button>
        )}
      </div>
    </div>
  )
}