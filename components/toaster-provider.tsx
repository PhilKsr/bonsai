'use client'

import { Toaster } from 'react-hot-toast'

export default function ToasterProvider() {
  return (
    <div className='fixed bottom-0 right-0 z-50'>
      <Toaster />
    </div>
  )
}
