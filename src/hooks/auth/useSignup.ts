import { useForm } from '@/hooks/common/useForm';
import { useApi } from '@/hooks/common/useApi';

export function useSignup() {
  const { formData, handleChange, errors, setErrors } = useForm<SignupFormData>(initialState);
  const { makeRequest } = useApi();

  const handleSubmit = async () => {
    try {
      await makeRequest({
        url: '/api/auth/signup',
        method: 'POST',
        data: formData
      });
      // 성공 처리
    } catch (error) {
      // 에러 처리
    }
  };

  return { formData, handleChange, errors, handleSubmit };
} 