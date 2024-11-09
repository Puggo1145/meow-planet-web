// components
import { UserInfo } from './_components/user-info'
import { UserBadges } from './_components/user-badges'
import { UserInvite } from './_components/user-invite'
import { UserSignOut } from './_components/user-sign-out'
import { Separator } from '@/components/ui/separator'

const UserPage = () => {
  return (
    <div className='flex-1 flex flex-col pt-24 px-4'>
      <UserInfo />
      <Separator className='mt-20 mb-8'/>
      <UserBadges />
      <Separator className='mt-20 mb-8'/>
      <UserInvite />
      <Separator className='mt-20 mb-8'/>
      <UserSignOut />
      <Separator className='mt-20 mb-8'/>
    </div>
  )
}

export default UserPage