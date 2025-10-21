interface StatusBadgeProps {
  status: string
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    Confirmado: 'bg-green-100 text-green-800',
    Pendente: 'bg-yellow-100 text-yellow-800',
    Cancelado: 'bg-red-100 text-red-800'
  }

  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  )
}