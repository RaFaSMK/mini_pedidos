interface InputProps {
  type?: string
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export default function Input({ type = "text", placeholder, value, onChange }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
    />
  )
}