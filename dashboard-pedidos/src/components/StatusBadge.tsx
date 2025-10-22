import React from 'react';

interface StatusBadgeProps {
  status: string;
  onClick?: () => void;
}

export default function StatusBadge({ status, onClick }: StatusBadgeProps) {
  let colorClasses = '';

  switch (status?.toUpperCase()) {
    case 'PAGO':
      colorClasses = 'bg-green-100 text-green-700';
      break;
    case 'PENDENTE':
      colorClasses = 'bg-yellow-100 text-yellow-700';
      break;
    case 'CANCELADO':
      colorClasses = 'bg-red-100 text-red-700';
      break;
    default:
      colorClasses = 'bg-gray-100 text-gray-700';
  }

  const commonClasses = 'px-2.5 py-0.5 rounded-full text-xs font-medium capitalize transition-colors';

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${commonClasses} ${colorClasses} hover:opacity-80`}
        title={`Status: ${status}. Clique para alterar.`}
      >
        {status?.toLowerCase()}
      </button>
    );
  }

  return (
    <span className={`${commonClasses} ${colorClasses}`}>
      {status?.toLowerCase()}
    </span>
  );
}