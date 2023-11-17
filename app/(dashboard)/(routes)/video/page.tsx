'use client'

import axios from 'axios'
import * as z from 'zod'
import Heading from '@/components/heading'
import { Music, VideoIcon } from 'lucide-react'
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

export default function VideoPage() {
  const router = useRouter()

  const [video, setVideo] = useState<string>()

  const form = useForm<z.infer<typeof conversationSchema>>({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      prompt: '',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof conversationSchema>) => {
    try {
      setVideo(undefined)

      const response = await axios.post('/api/video', values)

      setVideo(response.data[0])

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
        title='Video Generation'
        description='Turn your prompt into a video.'
        icon={VideoIcon}
        iconColor='text-orange-700'
        bgColor='bg-orange-700/10'
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
                        placeholder='Clownfish swimming around a coral reef'
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
          {!video && !isLoading && <Empty label='No video generated.' />}
          {video && (
            <video className='w-full mt-8 bg-black border rounded-lg aspect-video' controls>
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  )
}
