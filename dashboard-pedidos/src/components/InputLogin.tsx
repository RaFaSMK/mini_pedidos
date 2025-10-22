import { ReactNode } from 'react';

interface InputLoginProps {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export const InputLogin = ({
  label,
  placeholder,
  type = 'text',
  required = false,
  icon,
  onIconClick,
  value,
  onChange,
  error,
}: InputLoginProps) => {

  const errorRingClass = 'focus:ring-red-500 border-red-500';
  const defaultRingClass = 'focus:ring-green-500 border-gray-300';
  const ringClass = error ? errorRingClass : defaultRingClass;

  return (
    <div>
      <label
        htmlFor={placeholder}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={placeholder}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={onChange}
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${ringClass}`}
        />
        {icon && (
          <button
            type="button"
            onClick={onIconClick}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {icon}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};