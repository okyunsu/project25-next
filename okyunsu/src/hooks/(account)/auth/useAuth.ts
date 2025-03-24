import { useState, FormEvent, ChangeEvent } from 'react';
import api from '@/lib/axios';

// 로그인 폼 데이터
interface LoginForm {
    id: string;
    password: string;
}

// 로그인 요청 데이터
interface LoginRequest {
    user_id: string;
    password: string;
}

// 로그인 응답 데이터
interface LoginResponse {
    success: boolean;
    message?: string;
}

// 훅 반환 타입
interface UseAuthReturn {
    form: LoginForm;
    error: string | null;
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
}

// API 엔드포인트
const API_ENDPOINTS = {
    LOGIN: '/auth/login'
};

// 초기 폼 상태
const initialForm: LoginForm = {
    id: '',
    password: ''
};

export function useAuth(): UseAuthReturn {
    const [form, setForm] = useState<LoginForm>(initialForm);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await api.post<LoginResponse>(
                API_ENDPOINTS.LOGIN,
                { user_id: form.id, password: form.password }
            );

            if (!response.data.success) {
                setError(response.data.message || '로그인에 실패했습니다.');
                setForm(prev => ({ ...prev, password: '' }));
            }
        } catch (err) {
            console.error('로그인 실패:', err);
            setError('로그인 처리 중 오류가 발생했습니다.');
            setForm(prev => ({ ...prev, password: '' }));
        }
    };

    return {
        form,
        error,
        handleChange,
        handleSubmit
    };
} 