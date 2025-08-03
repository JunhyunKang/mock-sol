import type { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-100 p-4">
      <div className="h-[100vh] w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-lg">
        <div className="scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-gray-300 h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
