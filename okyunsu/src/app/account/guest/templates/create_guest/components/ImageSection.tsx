/**
 * 이미지 섹션 컴포넌트
 * 
 * 회원가입 페이지의 왼쪽 측면 이미지와 타이틀을 표시
 * 모바일 화면에서는 숨겨짐(반응형)
 */
export default function ImageSection() {
  return (
    <div className="hidden md:flex flex-1 bg-teal-50 items-center justify-center p-8">
      <div className="text-center">
        <img
          src="https://via.placeholder.com/300"
          alt="Secure"
          className="w-60 mx-auto"
        />
        <h2 className="text-xl font-semibold mt-4 text-teal-600">SECURE</h2>
      </div>
    </div>
  );
} 