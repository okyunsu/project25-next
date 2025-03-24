'use client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


export type UserType = {
  user_id: string;
  email: string;
  name: string;
  password: string;
  reset: () => void;
}

export const useUserStore = create<UserType>()(
  persist(
    (set) => ({
      user_id: '',
      email: '',
      name: '',
      password: '',
      reset: () => set({
        user_id: '',
        email: '',
        name: '',
        password: '',
      }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
