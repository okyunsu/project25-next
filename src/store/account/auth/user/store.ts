'use client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'


export type UserType = {
  user_id: string;
  name: string;
  setUser: (user: { user_id: string; name: string }) => void;
  reset: () => void;
}

export const useUserStore = create<UserType>()(
  persist(
    (set) => ({
      user_id: '',
      name: '',
      setUser: (user) => set({
        user_id: user.user_id,
        name: user.name,
      }),
      reset: () => set({
        user_id: '',
        name: '',
      }),
    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
