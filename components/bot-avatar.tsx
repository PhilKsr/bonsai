import { Avatar, AvatarImage } from './ui/avatar'

export function BotAvatar() {
  return (
    <Avatar className='w-8 h-8'>
      <AvatarImage src='/next.svg' className='p-1' />
    </Avatar>
  )
}
