
import React from 'react';

interface RadioGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  options: string[];
  required?: boolean;
  error?: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ label, name, value, onChange, options, required = false, error }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="flex items-center space-x-4">
      {options.map(option => (
        <div key={option} className="flex items-center">
          <input
            id={`${name}-${option}`}
            name={name}
            type="radio"
            value={option}
            checked={value === option}
            onChange={onChange}
            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
          <label htmlFor={`${name}-${option}`} className="ml-2 block text-sm text-gray-900">
            {option}
          </label>
        </div>
      ))}
    </div>
    {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

export default RadioGroup;
