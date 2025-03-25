import { InputHTMLAttributes } from 'react';

// FormField 컴포넌트의 props 타입 정의
type FormFieldProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'id' | 'name' | 'placeholder' | 'value' | 'onChange' | 'maxLength' | 'required'>;

/**
 * 입력 필드 컴포넌트
 * 
 * 라벨과 입력 요소를 포함한 일관된 스타일의 폼 필드를 렌더링
 */
export default function FormField({
  id,
  name,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  maxLength,
  required = true,
  ...rest
}: FormFieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block mb-1 font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        required={required}
        {...rest}
      />
    </div>
  );
} 