import Link from 'next/link';

export default function RegisterPage() {
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-100">
        <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* 왼쪽 이미지 섹션 */}
          <div className="hidden md:flex flex-1 bg-blue-50 items-center justify-center p-8">
            <div className="text-center">
              <img
                src="https://via.placeholder.com/300"
                alt="Secure"
                className="w-60 mx-auto"
              />
              <h2 className="text-xl font-semibold mt-4 text-blue-600">SECURE</h2>
            </div>
          </div>
  
          {/* 오른쪽 회원가입 폼 */}
          <div className="flex-1 bg-blue-600 p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">어서오세요!</h2>
  
            {/* 입력 필드 */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="아이디"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800"
              />
             
              <input
                type="password"
                placeholder="비밀번호"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 text-gray-800"
              />
            </div>
  

            {/* 버튼들 */}
            <div className="mt-6">
              <button className="w-full bg-yellow-400 text-black py-3 rounded-lg font-semibold">
                회원가입
              </button>
              <button className="w-full border border-white mt-3 py-3 rounded-lg font-semibold">
                로그인
              </button>
              <Link href="/" className="w-full block border border-white mt-3 py-3 rounded-lg font-semibold text-center">
                메인으로 돌아가기
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  