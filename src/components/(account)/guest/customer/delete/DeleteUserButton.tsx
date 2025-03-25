import { useDeleteUser } from '@/hooks/(account)/guest/delete/useDeleteUser';

interface DeleteUserButtonProps {
    userId: string;
}

export function DeleteUserButton({ userId }: DeleteUserButtonProps) {
    const { deleteUser, isLoading, error } = useDeleteUser();

    const handleDelete = async () => {
        if (window.confirm('정말로 탈퇴하시겠습니까?')) {
            await deleteUser(userId);
        }
    };

    return (
        <div>
            <button
                onClick={handleDelete}
                disabled={isLoading}
                className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-400 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
                {isLoading ? '처리 중...' : '회원 탈퇴'}
            </button>
            {error && (
                <p className="text-red-500 mt-2 text-sm">{error}</p>
            )}
        </div>
    );
} 