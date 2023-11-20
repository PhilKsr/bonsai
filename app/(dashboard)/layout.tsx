import Navbar from '@/components/navbar'
import Sidebar from '@/components/sidebar'
import { getApiLimitCount } from '@/lib/api-limit'

type Props = {
  children: React.ReactNode
}

export default async function DashboardLayout({ children }: Props) {
  const apiLimitCount = await getApiLimitCount()

  return (
    <div className='relative h-full'>
      <div className='hidden h-full bg-gray-900 md:flex md:w-72 md:flex-col md:fixed md:inset-y-0'>
        <Sidebar apiLimitCount={apiLimitCount} />
      </div>

      <main className='md:pl-72'>
        <Navbar />
        {children}
      </main>
    </div>
  )
}
