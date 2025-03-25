'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

// 회원가입 폼 데이터 타입 정의
export type SignupFormData = {
  user_id: string;
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
};

// 서버에 전송할 사용자 데이터 타입 정의
export type SignupUserData = Omit<SignupFormData, 'confirmPassword'>;

/**
 * 회원가입 폼 관리 및 API 통신을 위한 커스텀 훅
 */
export function useSignup() {
  const router = useRouter();
  const [form, setForm] = useState<SignupFormData>({
    user_id: '',
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });
  const [errorMsg, setErrorMsg] = useState('');

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 필드 이름을 한글로 변환
  const getFieldName = (field: string): string => {
    const fieldMap: Record<string, string> = {
      'user_id': '아이디',
      'email': '이메일',
      'password': '비밀번호',
      'name': '이름'
    };
    return fieldMap[field] || field;
  };

  // FastAPI 서버에 회원가입 정보 전송
  const sendToFastAPI = async (userData: SignupUserData) => {
    try {
      const apiUrl = 'http://localhost:8000/api/customer/create';
      const response = await axios.post(apiUrl, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (error) {
      console.error('회원가입 API 호출 오류:', error);
      
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<any>;
        if (axiosError.response?.data) {
          const errorData = axiosError.response.data;
          if (errorData.detail && typeof errorData.detail === 'object') {
            const fieldErrors = Object.entries(errorData.detail)
              .map(([field, message]) => `${getFieldName(field)}: ${message}`)
              .join('\n');
            throw new Error(`회원가입 실패:\n${fieldErrors}`);
          } else if (errorData.detail) {
            throw new Error(errorData.detail);
          } else if (errorData.message) {
            throw new Error(errorData.message);
          }
        }
        throw new Error(axiosError.response?.status === 400 ? 
          '입력 정보에 문제가 있습니다. 다시 확인해주세요.' : 
          '회원가입 처리 중 오류가 발생했습니다.');
      }
      throw new Error('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  // 클라이언트 측 유효성 검사
  const validateForm = (): boolean => {
    // 모든 필드 입력 확인
    if (!form.user_id || !form.email || !form.password || !form.confirmPassword || !form.name) {
      setErrorMsg('모든 필드를 입력해주세요.');
      return false;
    }

    // 비밀번호 일치 확인
    if (form.password !== form.confirmPassword) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return false;
    }

    // 아이디 길이 검사
    if (form.user_id.length < 5) {
      setErrorMsg('아이디는 5자 이상이어야 합니다.');
      return false;
    }

    // 이메일 형식 검사
    if (!form.email.includes('@')) {
      setErrorMsg('유효한 이메일 형식이 아닙니다.');
      return false;
    }

    // 비밀번호 길이 검사
    if (form.password.length < 8) {
      setErrorMsg('비밀번호는 8자 이상이어야 합니다.');
      return false;
    }

    return true;
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 클라이언트 측 유효성 검사
      if (!validateForm()) {
        return;
      }

      // 회원가입 정보 객체
      const userData: SignupUserData = {
        user_id: form.user_id,
        email: form.email,
        password: form.password,
        name: form.name
      };

      // FastAPI로 데이터 전송
      const result = await sendToFastAPI(userData);

      console.log('회원가입 성공:', result);
      alert(`회원가입이 완료되었습니다. ${result.message || ''}`);

      // 성공 시 로그인 페이지로 이동
      router.push('/auth/login');
    } catch (error: any) {
      // 오류 메시지 처리
      const errorMessage = error.message || '회원가입 처리 중 오류가 발생했습니다.';
      console.error('회원가입 오류:', errorMessage);

      // 줄바꿈이 있는 경우 화면에 표시할 때 줄바꿈 유지
      if (errorMessage.includes('\n')) {
        setErrorMsg(errorMessage.split('\n')[0]); // 첫 줄만 오류 메시지 영역에 표시
      } else {
        setErrorMsg(errorMessage);
      }

      // 알림창에는 전체 오류 메시지 표시
      alert(errorMessage);
    }
  };

  return {
    form,
    setForm,
    errorMsg,
    handleChange,
    handleSubmit
  };
} 