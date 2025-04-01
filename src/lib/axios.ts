import axios from 'axios'
import { corsConfig, tokenUtils } from './authToken'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: corsConfig.credentials,
})

// Request 인터셉터: 요청 시 토큰 추가
api.interceptors.request.use((config) => {
  const token = tokenUtils.getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('요청에 토큰 추가:', token)
  } else {
    console.log('저장된 토큰이 없습니다.')
  }
  return config
})

// Response 인터셉터: 응답 확인
api.interceptors.response.use(
  (response) => {
    // 로그인 응답인 경우
    if (response.config.url === '/api/auth/login') {
      console.log('로그인 응답:', JSON.stringify(response.data, null, 2))
      if (response.data?.access_token) {
        tokenUtils.setToken(response.data.access_token)
        console.log('토큰 발견:', response.data.access_token)
      } else {
        console.log('토큰이 없습니다. 응답 데이터:', JSON.stringify(response.data, null, 2))
      }
    }
    return response
  },
  (error) => {
    // 401 에러(인증 실패)인 경우 토큰 제거
    if (error.response?.status === 401) {
      tokenUtils.removeToken()
    }
    return Promise.reject(error)
  }
)

export default api
  