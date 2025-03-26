import { useState } from "react";
import api from '@/lib/axios'
import { useUserStore } from "@/store/account/auth/user/store";
import { useRouter } from "next/navigation";

interface LoginFormState {
  user_id: string;
  password: string;
}

interface LoginResponse {
  message: string;
  success: boolean;
  token: string;
  user_id: string;
  name: string;
}

export function useAuth() {
  const [form, setForm] = useState<LoginFormState>({
    user_id: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.user_id || !form.password) {
      setError("로그인 데이터가 필요합니다.");
      return false;
    }

    setError("");
    
    try {
      const response = await api.post<LoginResponse>('/api/auth/login', {
        user_id: form.user_id,
        password: form.password
      });

      // 응답 데이터 확인
      if (!response.data) {
        setError("시스템 오류가 발생했습니다.");
        return false;
      }

      // success 값으로 로그인 성공 여부 판단
      if (!response.data.success) {
        setError(response.data.message);
        return false;
      }

      // zustand 저장
      if (response.data.user_id && response.data.name) {
        const store = useUserStore.getState();
        store.setUser({
          user_id: response.data.user_id,
          name: response.data.name
        });
        
        // 로그인 성공 후 메인 페이지로 리다이렉트
        router.push('/');
      }

      return true;
    } catch (err: any) {
      const serverErrorMessage = err.response?.data?.message || "시스템 오류가 발생했습니다.";
      setError(serverErrorMessage);
      return false;
    }
  };

  const handleLogout = () => {
    // zustand store 초기화
    useUserStore.getState().reset();
    // 로그인 페이지로 리다이렉트
    router.push('/login');
  };

  return { form, error, handleChange, handleSubmit, handleLogout };
}