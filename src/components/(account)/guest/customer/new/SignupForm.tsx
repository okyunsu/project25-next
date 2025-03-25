import { memo } from 'react';
import Link from 'next/link';
import FormField from './FormField';
import ErrorMessage from './ErrorMessage';
import { SignupFormData } from '@/hooks/(account)/guest/new/useSignup';

interface SignupFormProps {
  form: SignupFormData;
  errorMsg: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

function SignupForm({ form, errorMsg, handleChange, handleSubmit }: SignupFormProps) {
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
            value={form.user_id}
            onChange={handleChange}
            maxLength={15}
          />
          
          <FormField
            id="email"
            name="email"
            label="이메일"
            type="email"
            placeholder="example@email.com"
            value={form.email}
            onChange={handleChange}
            maxLength={20}
          />
          
          <FormField
            id="password"
            name="password"
            label="비밀번호"
            type="password"
            placeholder="8~15자 영문, 숫자, 특수문자"
            value={form.password}
            onChange={handleChange}
            maxLength={15}
          />
          
          <FormField
            id="confirmPassword"
            name="confirmPassword"
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력하세요"
            value={form.confirmPassword}
            onChange={handleChange}
            maxLength={15}
          />
          
          <FormField
            id="name"
            name="name"
            label="이름"
            type="text"
            placeholder="실명을 입력하세요"
            value={form.name}
            onChange={handleChange}
            maxLength={20}
          />
          
          <button
            type="submit"
            className="w-full bg-white text-teal-600 py-2 px-4 rounded-lg font-semibold hover:bg-teal-50 transition-colors"
          >
            가입하기
          </button>
        </form>
        
        <p className="text-center text-sm">
          이미 계정이 있으신가요?{' '}
          <Link href="/login" className="underline hover:text-teal-200">
            로그인
          </Link>
        </p>
      </div>
    </div>
  );
}

export default memo(SignupForm); 