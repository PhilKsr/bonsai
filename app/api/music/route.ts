import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { prompt } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!prompt) {
      return new NextResponse('Prompt not found', { status: 400 })
    }

    const freeTrial = await checkApiLimit()

    if (!freeTrial) {
      return new NextResponse('Free trial limit reached', { status: 403 })
    }

    const response = await replicate.run('meta/musicgen:7a76a8258b23fae65c5a22debb8841d1d7e816b75c2f24218cd2bd8573787906', {
      input: {
        model_version: prompt,
      },
    })

    await increaseApiLimit()

    return NextResponse.json(response)
  } catch (error) {
    console.log('[MUSIC_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
