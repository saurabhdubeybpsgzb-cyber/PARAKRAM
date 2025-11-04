
import React from 'react';

interface FileInputProps {
  label: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
  accept?: string;
  previewUrl?: string | null;
}

const FileInput: React.FC<FileInputProps> = ({ label, name, onChange, required = false, error, accept, previewUrl }) => (
  <div className="w-full">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="mt-1 flex items-center space-x-4">
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="h-16 w-16 rounded-full object-cover" />
      ) : (
        <span className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="h-12 w-12 text-gray-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      <input
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        accept={accept}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-indigo-50 file:text-indigo-700
          hover:file:bg-indigo-100"
      />
    </div>
     {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
  </div>
);

export default FileInput;
