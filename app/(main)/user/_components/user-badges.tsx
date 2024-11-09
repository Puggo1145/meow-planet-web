"use client"

import Image from 'next/image'
// ui
import { Badge } from '@/components/ui/badge'
// components
import { HeadingText, HeadingTextTitle, HeadingTextDescription } from '@/components/heading-text'
import { InfoSection, InfoSectionContent } from '@/components/info-section'
// constants
import { UserRoleEnums } from '@/constants/user-enums'
// store
import { useUserStore } from '@/store/use-user'

export const UserBadges = () => {
  const { user, teams } = useUserStore()

  // 过滤并合并有效的徽章
  const validBadges = [
    // 从 teams 中获取有效徽章
    ...(teams?.filter(team => UserRoleEnums[team.name]) || [])
      .map(team => ({
        id: team.$id,
        type: 'team',
        name: team.name,
        ...UserRoleEnums[team.name]
      })),
    
    // 从 user.labels 中获取有效徽章
    ...(user?.labels?.filter(label => UserRoleEnums[label]) || [])
      .map(label => ({
        id: label,
        type: 'label',
        name: label,
        ...UserRoleEnums[label]
      }))
  ]

  return (
    <InfoSection>
      <HeadingText>
        <HeadingTextTitle>徽章</HeadingTextTitle>
        <HeadingTextDescription className='max-w-xs'>
          您的徽章是您为社区所做贡献的最好证明，通过参与社区管理与公益活动以获得更多徽章
        </HeadingTextDescription>
      </HeadingText>

      <InfoSectionContent className='flex items-center gap-x-4'>
        {validBadges.length === 0 && (
          <div className='flex-1 flex flex-col items-center justify-center'>
            <span className='text-sm text-muted-foreground'>暂无徽章</span>
          </div>
        )}
        {validBadges.length > 0 && validBadges.map(badge => (
          <div 
            key={`${badge.type}-${badge.id}`}
            className='flex flex-col items-center gap-y-2'
          >
            <Image
              src={badge.image}
              alt={badge.alias}
              width={128}
              height={128}
              className='rounded-full size-24'
            />
            <Badge
              variant={badge.type === 'label' ? "secondary" : "default"}
              className='-mt-4'
            >
              {badge.alias}
            </Badge>
          </div>
        ))}
      </InfoSectionContent>
    </InfoSection>
  )
}
