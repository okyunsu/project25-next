import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/axios';

interface DeleteUserButtonProps {
    userId: string;
    onDelete?: () => void;
}

export function DeleteUserButton({ userId, onDelete }: DeleteUserButtonProps) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('정말로 이 사용자를 삭제하시겠습니까?')) {
            return;
        }

        try {
            setIsDeleting(true);
            await api.delete(`customer/${userId}`);
            
            // 콜백 함수가 있으면 실행
            if (onDelete) {
                onDelete();
            }

            // 로컬 스토리지의 사용자 데이터 확인
            const userData = localStorage.getItem('user_data');
            if (userData) {
                const { user_id } = JSON.parse(userData);
                // 삭제된 사용자가 현재 로그인한 사용자인 경우
                if (user_id === userId) {
                    localStorage.removeItem('user_data');
                    router.push('/auth/login');
                    return;
                }
            }

            // 페이지 새로고침
            router.refresh();
        } catch (error) {
            console.error('사용자 삭제 실패:', error);
            alert('사용자 삭제 중 오류가 발생했습니다.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-red-300 disabled:cursor-not-allowed"
        >
            {isDeleting ? '삭제 중...' : '삭제'}
        </button>
    );
} 