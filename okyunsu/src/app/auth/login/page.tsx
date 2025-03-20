"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


export default function RegisterPage() {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [loginFailed, setLoginFailed] = useState(false);
    const router = useRouter();
    
    const handleLogin = () => {
        console.log("id : ", id);
        console.log("password : ", password);

        if (id === "test" && password === "test123") {
            console.log("로그인 성공");
            router.push('/dashboard/common/user/templates');
        } else {
            console.log("로그인 실패");
            setLoginFailed(true);
            setId('');
            setPassword('');
        }
    }
    
    const handleSignup = () => {
        router.push('/account/guest/templates/create_guest');
    }
    
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
  
          {/* 오른쪽 회원가입 폼 */}
          <div className="flex-1 bg-teal-600 p-8 text-white">
            <h2 className="text-3xl font-bold text-center mb-6">어서오세요!</h2>
  
            {/* 로그인 실패 메시지 */}
            {loginFailed && (
              <div className="bg-red-500 text-white p-3 rounded mb-4 text-center">
                로그인에 실패하였습니다. 다시 시도해 주세요.
              </div>
            )}
  
            {/* 입력 필드 */}
            <div className="space-y-4">
              <form onSubmit={(e) => e.preventDefault()}>
                <input
                  type="text"
                  placeholder="아이디를 입력하세요"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  onChange={(e) => setId(e.target.value)}
                  value={id}
                />
                
                <div className="mt-4">
                  <input
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>

                {/* 버튼들 */}
                <div className="mt-6">
                  <button 
                    type="button" 
                    className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-400 cursor-pointer transition-colors"
                    onClick={handleSignup}
                  >
                    회원가입
                  </button>
                  <button
                    type="button"
                    className="w-full border border-white mt-3 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 cursor-pointer transition-colors"
                    onClick={handleLogin}
                  >
                    로그인
                  </button>
                  <Link 
                    href="/" 
                    className="w-full block border border-white mt-3 py-3 rounded-lg font-semibold text-center hover:bg-white hover:text-teal-600 cursor-pointer transition-colors"
                  >
                    메인으로 돌아가기
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  