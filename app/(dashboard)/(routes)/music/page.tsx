'use client'

import axios from 'axios'
import * as z from 'zod'
import Heading from '@/components/heading'
import { Music } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { conversationSchema } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'

export default function MusicPage() {
  const router = useRouter()

  const [music, setMusic] = useState<string>()

  const form = useForm<z.infer<typeof conversationSchema>>({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof conversationSchema>) => {
    try {
      setMusic(undefined)

      const response = await axios.post('/api/music', values)

      setMusic(response.data.audio)

      form.reset()
    } catch (error: unknown) {
      //TODO: Open Pro Model
      console.log(error)
    } finally {
      router.refresh()
    }
  }

  return (
    <div>
      <Heading
        title='Music Generation'
        description='Turn your prompt into music.'
        icon={Music}
        iconColor='text-emerald-500'
        bgColor='bg-emerald-500/10'
      />
      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid w-full grid-cols-12 gap-2 p-4 px-3 border rounded-lg md:px-6 focus-within:shadow-sm'>
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='p-0 m-0'>
                      <Input
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='Piano solo'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button className='w-full col-span-12 lg:col-span-2' disabled={isLoading}>
                Generate
              </Button>
            </form>
          </Form>
        </div>

        <div className='mt-4 space-y-4'>
          {isLoading && (
            <div className='flex items-center justify-center w-full p-8 rounded-lg bg-muted'>
              <Loader />
            </div>
          )}
          {!music && !isLoading && <Empty label='No music generated.' />}
          {music && (
            <audio controls className='w-full mt-8'>
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  )
}
