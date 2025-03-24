// src/lib/axios.ts
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  }
})

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem('user_data')
  if (userData) {
    const { user_id } = JSON.parse(userData)
    config.headers.Authorization = `Bearer ${user_id}`
  }
  return config
})

export default api