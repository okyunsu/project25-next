"use client";

import ImageSection from '../../../../components/(account)/guest/customer/new/ImageSection';
import SignupForm from '../../../../components/(account)/guest/customer/new/SignupForm';
import { useSignup } from '../../../../hooks/(account)/guest/new/useSignup';

/**
 * 회원가입 페이지 컴포넌트
 * 
 * 커스텀 훅을 통해 상태 관리를 처리하고 UI 컴포넌트들을 조합
 */
export default function CreateGuestPage() {
  // 커스텀 훅을 통한 상태 및 이벤트 핸들러 관리
  const { form, errorMsg, handleChange, handleSubmit } = useSignup();
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-teal-50">
      <div className="flex w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* 왼쪽 이미지 섹션 */}
        <ImageSection />
        
        {/* 오른쪽 회원가입 폼 */}
        <SignupForm 
          form={form}
          errorMsg={errorMsg}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
} 
