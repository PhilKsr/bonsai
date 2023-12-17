'use client'

import { useProModal } from '@/app/hooks/use-pro-modal'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { CodeIcon, MessageSquare, Music, VideoIcon, Image, Check, Zap } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import { useState } from 'react'
import toast from 'react-hot-toast'

const tools = [
  {
    label: 'Conversation',
    icon: MessageSquare,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500/10',
  },
  {
    label: 'Music Generation',
    icon: Music,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
  },
  {
    label: 'Image Generation',
    icon: Image,
    color: 'text-pink-700',
    bgColor: 'bg-pink-700/10',
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    color: 'text-orange-700',
    bgColor: 'bg-orange-700/10',
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    color: 'text-green-700',
    bgColor: 'bg-green-700/10',
  },
]

export default function ProModal() {
  const proModal = useProModal()

  const [isLoading, setIsLoading] = useState(false)

  async function onSubscribe() {
    try {
      setIsLoading(true)
      const response = await axios.get('/api/stripe')

      window.location.href = response.data.url
    } catch (error: unknown) {
      toast.error('Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className='flex flex-col items-center justify-center pb-2 gap-y-4'>
              <div className='flex items-center py-1 font-bold gap-x-2'>
                Upgrade to Bonsai
                <Badge variant='premium' className='py-1 text-sm uppercase'>
                  pro
                </Badge>
              </div>
            </DialogTitle>
            <DialogDescription className='pt-2 space-y-2 font-medium text-center text-zinc-900'>
              {tools.map(tool => (
                <Card key={tool.label} className='flex items-center justify-between p-3 border-black/5'>
                  <div className='flex items-center gap-x-4'>
                    <div className={cn('p-2 w-fit rounded-md', tool.bgColor)}>
                      <tool.icon className={cn('w-6 h-6', tool.color)} />
                    </div>
                    <div className='text-sm font-semibold'>{tool.label}</div>
                  </div>
                  <Check className='w-5 text-primary' />
                </Card>
              ))}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button disabled={isLoading} onClick={onSubscribe} size='lg' variant='premium' className='w-full'>
              Upgrade
              <Zap className='w-4 h-4 ml-2 fill-white' />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
