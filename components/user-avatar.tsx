import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { SupaSelectType, UserProfile } from '@/lib/supabase'
import { AvatarProps } from '@radix-ui/react-avatar'
import { User } from 'lucide-react'

interface UserAvatarProps extends AvatarProps {
	user: UserProfile
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
	return (
		<Avatar {...props}>
			{/* {user.image ? (
        <AvatarImage alt="Picture" src={user.image} />
      ) : ( */}
			<AvatarFallback>
				<span className='sr-only'>{user.name}</span>
				<User className='w-4 h-4' />
			</AvatarFallback>
			{/* //   )} */}
		</Avatar>
	)
}
