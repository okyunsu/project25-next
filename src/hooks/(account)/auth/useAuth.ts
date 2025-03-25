import { useState } from "react";
import api from '@/lib/axios'
// import { useUserStore } from "@/store/account/auth/user/store";

interface LoginFormState {
  user_id: string;
  password: string;
}

interface LoginResponse {
  message: string;
  name: string | null;
  success: boolean;
  token: string | null;
  user_id: string | null;
}

export function useAuth() {
  const [form, setForm] = useState<LoginFormState>({
    user_id: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.user_id || !form.password) {
      setError("아이디와 비밀번호를 입력하세요.");
      return false;
    }

    setError("");
    
    try {
      console.log("로그인 시도:", {
        url: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        data: form
      });

      const response = await api.post<LoginResponse>('/api/auth/login', {
        user_id: form.user_id,
        password: form.password
      });
      
      console.log("로그인 응답:", response.data);

      // 응답 데이터 확인
      if (!response.data) {
        setError("서버 응답이 없습니다.");
        return false;
      }

      // success 값으로 로그인 성공 여부 판단
      if (!response.data.success) {
        setError(response.data.message || "로그인에 실패했습니다.");
        return false;
      }

      // 로그인 성공
      console.log("로그인 성공:", response.data);   
      // const token = response.data.accessToken;
      // useAuthStore.getState().setAccessToken(token);
      return true;
    } catch (err: any) {
      console.log("로그인 실패");
      console.log("에러 메시지:", err.message);
      console.log("에러 응답 데이터:", err.response?.data);
      console.log("에러 상태 코드:", err.response?.status);
      
      const serverErrorMessage = err.response?.data?.detail || "로그인 실패. 다시 시도해주세요.";
      setError(serverErrorMessage);
      return false;
    }
  };

  return { form, error, handleChange, handleSubmit };
}