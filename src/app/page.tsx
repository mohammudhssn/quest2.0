'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/landing')
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-quest-coral-light/20 via-quest-purple-light/20 to-quest-yellow-light/20">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-quest-coral"></div>
    </div>
  )
}