// CORS 설정
export const corsConfig = {
  origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Authorization', 'Content-Type'],
};

// 토큰 관리 유틸리티
export const tokenUtils = {
  // 토큰 저장
  setToken: (token: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', token);
    }
  },

  // 토큰 가져오기
  getToken: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('access_token');
    }
    return null;
  },

  // 토큰 제거
  removeToken: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('access_token');
    }
  },

  // 토큰 존재 여부 확인
  hasToken: () => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('access_token');
    }
    return false;
  },

  // Authorization 헤더 생성
  getAuthHeader: () => {
    const token = tokenUtils.getToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}; 