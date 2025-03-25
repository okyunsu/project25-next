'use client'
import { useTheme } from 'next-themes'
import { useEffect, useRef, useState } from 'react'
import { FiSun } from 'react-icons/fi'
import { useOnClickOutside } from 'usehooks-ts'
import Button from './Button'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { setTheme, resolvedTheme, themes, theme } = useTheme()
  const ref = useRef(null)
  useEffect(() => setMounted(true), [])
  useOnClickOutside(ref, () => setIsOpen(false))

  if (!mounted)
    return (
      <button
        type='button'
        className='inline-flex w-fit min-w-[95px] items-center justify-between gap-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
      >
        <span className='ml-2'>Theme</span>
        <FiSun />
      </button>
    )

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div ref={ref} className='relative inline-block text-left'>
      <button
        type='button'
        className='inline-flex w-full min-w-[95px] items-center justify-between gap-3 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700'
        onClick={toggleDropdown}
      >
        <span className='ml-2'>Theme</span>
        <FiSun />
      </button>
      {isOpen && (
        <div className='absolute right-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg dark:bg-gray-800'>
          <div className='py-1'>
            {themes.map(themeItem => {
              return (
                <button
                  key={themeItem}
                  onClick={() => {
                    setTheme(themeItem)
                    setIsOpen(false)
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm ${
                    themeItem === theme
                      ? 'bg-blue-50 text-blue-700 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  {themeItem.charAt(0).toUpperCase() + themeItem.slice(1)}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
} 