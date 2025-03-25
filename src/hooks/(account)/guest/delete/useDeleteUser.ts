import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

interface UseAuthReturn {
    isLoading: boolean;
    error: string | null;
    deleteUser: (userId: string, userInfo: UserInfo) => Promise<void>;
}

interface UserInfo {
    id: string;
    password: string;
    email: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export function useDeleteUser(): UseAuthReturn {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const deleteUser = async (userId: string, userInfo: UserInfo) => {
        try {
            setIsLoading(true);
            setError(null);

            // 먼저 사용자 목록을 가져와서 정보 확인
            const response = await axios.get(`${API_URL}/api/customer/list`);
            const customerList = response.data.customer_list;
            
            // 입력된 정보와 일치하는 사용자 찾기
            const user = customerList.find(
                (customer: any) => 
                    customer.user_id === userInfo.id &&
                    customer.password === userInfo.password &&
                    customer.email === userInfo.email
            );

            if (!user) {
                throw new Error('입력하신 정보가 일치하지 않습니다.');
            }

            // 삭제 API 호출
            await axios.delete(`${API_URL}/api/customer/delete/${userId}`);

            // 성공 메시지 표시
            alert('사용자가 성공적으로 삭제되었습니다.');

            // 페이지 새로고침
            router.refresh();
        } catch (error) {
            console.error('삭제 실패:', error);
            
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<any>;
                const errorMessage = axiosError.response?.data?.detail || '삭제 처리 중 오류가 발생했습니다.';
                setError(errorMessage);
                alert(errorMessage);
            } else {
                const errorMessage = (error as Error).message || '삭제 처리 중 오류가 발생했습니다.';
                setError(errorMessage);
                alert(errorMessage);
            }
            throw error; // 에러를 상위 컴포넌트로 전파
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        deleteUser
    };
} 