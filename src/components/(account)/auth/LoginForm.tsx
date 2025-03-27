import { memo } from 'react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/(account)/auth/useAuth";

export default function LoginForm() {
  const router = useRouter();
  const { form, error, handleChange, handleSubmit } = useAuth();

  const onSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-50">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* 왼쪽 이미지 섹션 */}
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

        {/* 오른쪽 로그인 폼 */}
        <div className="flex-1 bg-teal-600 p-8 text-white">
          <h2 className="text-3xl font-bold text-center mb-6">어서오세요!</h2>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="user_id" className="block text-sm font-medium mb-1">
                아이디
              </label>
              <input
                type="text"
                id="user_id"
                name="user_id"
                value={form.user_id}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="아이디를 입력하세요"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500 text-white p-3 rounded text-center text-sm">
                {error}
              </div>
            )}

            <div className="mt-6 space-y-3">
              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-400 transition-colors"
              >
                로그인
              </button>
              <Link
                href="/guest/new"
                className="w-full block border border-white py-3 rounded-lg font-semibold text-center hover:bg-white hover:text-teal-600 transition-colors"
              >
                회원가입
              </Link>
              <Link
                href="/"
                className="w-full block border border-white py-3 rounded-lg font-semibold text-center hover:bg-white hover:text-teal-600 transition-colors"
              >
                메인으로 돌아가기
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 