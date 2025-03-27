'use client'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { subscribeWithSelector } from 'zustand/middleware'

type State = {
  user_id: string;
  name: string;
}

type Action = {
  setUser: (user: State) => void;
  updateName: (name: State['name']) => void;
  updateUserId: (user_id: State['user_id']) => void;
  reset: () => void;
}

type UserStore = State & Action;

// Selectors
export const selectUserId = (state: UserStore) => state.user_id;
export const selectName = (state: UserStore) => state.name;

export const useUserStore = create<UserStore>()(
  devtools(
    subscribeWithSelector(
      immer(
        persist(
          (set, get) => ({
            // state
            user_id: '',
            name: '',
            
            // actions
            setUser: (user) => {
              set((state) => {
                state.user_id = user.user_id;
                state.name = user.name;
              });
            },
            updateName: (name) => {
              set((state) => {
                state.name = name;
              });
            },
            updateUserId: (user_id) => {
              set((state) => {
                state.user_id = user_id;
              });
            },
            reset: () => {
              set((state) => {
                state.user_id = '';
                state.name = '';
              });
            },
          }),
          {
            name: 'user-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({ user_id: state.user_id, name: state.name }), // 저장할 상태 선택
          }
        )
      )
    ),
    {
      name: 'UserStore', // DevTools에서 보여질 이름
    }
  )
)
