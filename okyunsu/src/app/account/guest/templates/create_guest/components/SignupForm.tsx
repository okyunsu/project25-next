import { memo } from 'react';
import Link from 'next/link';
import FormField from './FormField';
import ErrorMessage from './ErrorMessage';
import { SignupFormData } from '../hooks/useSignup';

/**
 * 회원가입 폼 컴포넌트의 props 타입 정의
 */
type SignupFormProps = {
  formData: SignupFormData;
  errorMsg: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
};

/**
 * 회원가입 폼 컴포넌트
 * 
 * 사용자 정보 입력 필드와 제출 버튼을 포함한 회원가입 폼
 * memo를 사용하여 불필요한 리렌더링 방지
 */
function SignupForm({
  formData,
  errorMsg,
  handleChange,
  handleSubmit
}: SignupFormProps) {
  return (
    <div className="flex-1 bg-teal-600 p-8 text-white overflow-y-auto max-h-screen">
      <h2 className="text-3xl font-bold text-center mb-6">회원가입</h2>
      
      <ErrorMessage message={errorMsg} />
      
      <div className="space-y-4">
        <form onSubmit={handleSubmit}>
          <FormField
            id="user_id"
            name="user_id"
            label="아이디"
            type="text"
            placeholder="5~15자 영문, 숫자 조합"
            value={formData.user_id}
            onChange={handleChange}
            maxLength={15}
          />
          
          <FormField
            id="email"
            name="email"
            label="이메일"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            maxLength={20}
          />
          
          <FormField
            id="password"
            name="password"
            label="비밀번호"
            type="password"
            placeholder="8~15자 영문, 숫자, 특수문자"
            value={formData.password}
            onChange={handleChange}
            maxLength={15}
          />
          
          <FormField
            id="confirmPassword"
            name="confirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 재입력"
            value={formData.confirmPassword}
            onChange={handleChange}
            maxLength={15}
          />
          
          <FormField
            id="name"
            name="name"
            label="이름"
            type="text"
            placeholder="2~10자 한글 또는 영문"
            value={formData.name}
            onChange={handleChange}
            maxLength={10}
          />
          
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-400 cursor-pointer transition-colors"
            >
              회원가입 완료
            </button>
            <Link
              href="/auth/login"
              className="w-full block border border-white mt-3 py-3 rounded-lg font-semibold text-center hover:bg-white hover:text-teal-600 cursor-pointer transition-colors"
            >
              로그인 페이지로 돌아가기
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// memo로 감싸서 props가 변경될 때만 리렌더링
export default memo(SignupForm); 