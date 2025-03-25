/**
 * 오류 메시지 컴포넌트의 props 타입 정의
 */
type ErrorMessageProps = {
  message: string;
};

/**
 * 오류 메시지 컴포넌트
 * 
 * 메시지가 있는 경우에만 렌더링되는 오류 알림 표시
 */
export default function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;
  
  return (
    <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
      {message}
    </div>
  );
} 