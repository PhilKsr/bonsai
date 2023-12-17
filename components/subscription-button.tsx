'use client'

import { Button } from '@/components/ui/button'
import axios from 'axios'
import { Zap } from 'lucide-react'
import { useState } from 'react'

interface SubscriptionButtonProps {
  isPro: boolean
}

export default function SubscriptionButton({ isPro = false }: SubscriptionButtonProps) {
  const [isloading, setIsLoading] = useState(false)

  async function onClick() {
    try {
      setIsLoading(true)
      const response = await axios.get('/apu/stripe')

      window.location.href = response.data.url
    } catch (error) {
      console.log('BILLING_ERROR', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button disabled={isloading} variant={isPro ? 'default' : 'premium'} onClick={onClick}>
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Zap className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  )
}
