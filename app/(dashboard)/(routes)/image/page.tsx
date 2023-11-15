'use client'

import axios from 'axios'
import * as z from 'zod'
import Heading from '@/components/heading'
import { Download, ImageIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { amountOptions, conversationSchema, resolutionOptions } from './types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Empty } from '@/components/empty'
import { Loader } from '@/components/loader'
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectItem } from '@radix-ui/react-select'
import { Card, CardFooter } from '@/components/ui/card'
import Image from 'next/image'

export default function ImagePage() {
  const router = useRouter()

  const [images, setImages] = useState<string[]>([])

  const form = useForm<z.infer<typeof conversationSchema>>({
    resolver: zodResolver(conversationSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  })

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (values: z.infer<typeof conversationSchema>) => {
    try {
      setImages([])

      const response = await axios.post('/api/image', values)

      const urls = response.data.map((image: { url: string }) => image.url)

      setImages(urls)

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
        title='Image Generation'
        description='Turn your prompt into a beautiful image.'
        icon={ImageIcon}
        iconColor='text-pink-700'
        bgColor='bg-pink-700/10'
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
                  <FormItem className='col-span-12 lg:col-span-6'>
                    <FormControl className='p-0 m-0'>
                      <Input
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='A picture of a horse in Swiss alps'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='amount'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {amountOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='resolution'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-2'>
                    <Select disabled={isLoading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue defaultValue={field.value} />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {resolutionOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
            <div className='p-20'>
              <Loader />
            </div>
          )}
          {images.length === 0 && !isLoading && <Empty label='No images generated.' />}
          <div className='grid grid-cols-1 gap-4 mt-8 md:grid-cols2 lg:grid-cols-3 xl:grid-cols-4'>
            {images.map(src => (
              <Card key={src} className='overflow-hidden rounded-lg'>
                <div className='relative aspect-square'>
                  <Image alt='Image' fill src={src} />
                </div>
                <CardFooter className='p-2'>
                  <Button variant='secondary' className='w-full' onClick={() => window.open(src)}>
                    <Download className='w-4 h-4 mr-2' />
                    Download
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
