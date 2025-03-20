import { useSignup } from '@/hooks/auth/useSignup';

export default function CreateGuestPage() {
  const { formData, handleChange, errors, handleSubmit } = useSignup();
  
  return (
    // ... 컴포넌트 내용
  );
} 