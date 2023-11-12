import Image from 'next/image'

export function Loader() {
  return (
    <div className='flex flex-col items-center justify-center h-full gap-y-4'>
      <div className='relative w-10 h-10 animate-spin'>
        <Image alt='logo' fill src='/next.svg' />
      </div>

      <p className='text-sm text-muted-foreground'>Bonsai is thinking...</p>
    </div>
  )
}
