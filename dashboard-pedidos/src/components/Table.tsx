"use client"

import { LucideIcon } from "lucide-react"
import { ReactNode } from "react"

export interface Column<T> {
  label: string
  key?: keyof T
  render?: (row: T) => ReactNode
  className?: string
}

export interface Action<T> {
  icon: LucideIcon
  onClick: (row: T) => void
  className: string
  title: string
}

interface TableProps<T> {
  columns: Column<T>[]
  data: T[]
  actions?: Action<T>[]
}

export default function Table<T extends object>({ columns, data, actions }: TableProps<T>) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <table className="w-full min-w-max">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                {col.label}
              </th>
            ))}
            {actions && <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Ações</th>}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50 transition-colors">
              {columns.map((col, colIdx) => (
                <td key={colIdx} className={`px-6 py-4 text-sm ${col.className || 'text-gray-600'}`}>
                  {
                    col.render
                      ? col.render(row)
                      : (col.key ? row[col.key] : null) as ReactNode
                  }
                </td>
              ))}
              {actions && (
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    {actions.map((action, actionIdx) => (
                      <button
                        key={actionIdx}
                        onClick={() => action.onClick(row)}
                        className={`p-2 rounded-lg transition-colors ${action.className}`}
                        title={action.title}
                      >
                        <action.icon size={18} />
                      </button>
                    ))}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}