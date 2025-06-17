'use client'
 
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

 
export function NavigationEvents():any {
  const pathname = usePathname()
  const searchParams = useSearchParams()
 
 
  return (`${pathname}`)
}