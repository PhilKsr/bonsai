'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { MAX_FREE_COUNTS } from '@/constants'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Zap } from 'lucide-react'
import { useProModal } from '@/app/hooks/use-pro-modal'

type Props = {
  apiLimitCount: number
  isPro: boolean
}

export default function FreeCounter({ apiLimitCount = 0, isPro = false }: Props) {
  const proModal = useProModal()

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  if (isPro) return null

  return (
    <div className='px-3'>
      <Card className='border-0 bg-white/10'>
        <CardContent className='py-6'>
          <div className='mb-4 space-y-2 text-sm text-center text-white'>
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Generations
            </p>

            <Progress className='h-3' value={(apiLimitCount / MAX_FREE_COUNTS) * 100} />
          </div>

          <Button onClick={proModal.onOpen} className='w-full' variant='premium'>
            Upgrade
            <Zap className='w-4 h-4 ml-2 fill-white' />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}