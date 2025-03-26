'use client'
import Link from 'next/link'
import ThemeSwitch from './ThemeSwitch'
import { useUserStore } from '@/store/account/auth/user/store'
import { useAuth } from '@/hooks/(account)/auth/useAuth'

export default function Header() {
  const user_id = useUserStore((state) => state.user_id);
  const { handleLogout } = useAuth();

  return (
    <div className='mx-auto flex max-w-screen-2xl flex-row items-center justify-between p-5 bg-white dark:bg-gray-900'>
      <Link href='/'>
        <div className='flex flex-row items-center'>
          <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z" />
          </svg>
          <strong className='mx-2 select-none text-gray-800 dark:text-white'>Template</strong>
        </div>
      </Link>
      
      <nav className='mr-4 inline-flex gap-5'>
        <Link href='/about' className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'>About</Link>
        <a href='#' className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'>Support</a>
        <a href='#' className='text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white'>Other</a>
      </nav>
      <div className="flex items-center gap-2">
        <ThemeSwitch />
        {user_id && (
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 bg-teal-600 text-white rounded flex items-center gap-1">
              <span>{user_id}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  )
} 