import { checkApiLimit, increaseApiLimit } from '@/lib/api-limit'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    const body = await req.json()
    const { messages } = body

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    if (!openAI.apiKey) {
      return new NextResponse('OpenAI API Key not found', { status: 500 })
    }

    if (!messages) {
      return new NextResponse('Message not found', { status: 400 })
    }

    const freeTrial = await checkApiLimit()

    if (!freeTrial) {
      return new NextResponse('Free trial limit reached', { status: 403 })
    }

    const response = await openAI.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    })

    await increaseApiLimit()

    return NextResponse.json(response.choices[0].message)
  } catch (error) {
    console.log('[CONVERSATION_ERROR]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
