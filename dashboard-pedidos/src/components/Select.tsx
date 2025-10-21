interface SelectOption {
  value: string | number
  label: string
}

interface SelectProps {
  options: SelectOption[]
  value: string | number
  onChange: (value: string) => void
  placeholder?: string
}

export default function Select({ options, value, onChange, placeholder = "Selecione..." }: SelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
    >
      <option value="">{placeholder}</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}