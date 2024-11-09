"use client"

import { useState } from 'react'
// icons
import { Check, Copy } from 'lucide-react'
// ui
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
// components
import { 
  HeadingText, 
  HeadingTextTitle, 
  HeadingTextDescription 
} from '@/components/heading-text'
import { 
  InfoSection, 
  InfoSectionContent 
} from '@/components/info-section'
import Image from 'next/image'
// assets
import images from "@/constants/images"

export const UserInvite = () => {
  const [copied, setCopied] = useState(false)
  const inviteLink = "https://www.mmxq.cc" // 这里替换为实际的邀请链接

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      toast.success("邀请链接已复制")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("复制失败，请手动复制")
    }
  }

  return (
    <InfoSection>
        <HeadingText>
          <HeadingTextTitle>邀请好友</HeadingTextTitle>
        <HeadingTextDescription className='max-w-xs'>
          复制链接或二维码发送给好友，邀请好友加入猫猫星球，一起发现更多猫咪<br/>
          {/* <p>邀请满 3 名用户后可获得 1 个达人徽章</p> */}
        </HeadingTextDescription>
      </HeadingText>

      <InfoSectionContent className='flex flex-col items-start gap-y-6'>
        {/* 邀请链接 */}
        <div className='flex items-center gap-x-4 w-full'>
          <Input 
            value={inviteLink}
            readOnly
            className='flex-1 bg-secondary'
          />
          <Button
            variant="outline"
            size="icon"
            onClick={handleCopy}
          >
            {copied ? (
              <Check className="size-4 text-green-500" />
            ) : (
              <Copy className="size-4" />
            )}
          </Button>
        </div>

        {/* 邀请二维码 */}
        <div className='flex items-center justify-center'>
          <Image src={images.inviteCode} alt="邀请二维码" width={200} height={200} />
        </div>

        {/* 邀请统计 */}
        {/* <div className='flex items-center gap-x-12 text-sm text-muted-foreground'>
          <div className='space-y-1'>
            <p>已邀请</p>
            <p className='text-xl font-semibold text-foreground'>0</p>
          </div>
          <div className='space-y-1'>
            <p>成功注册</p>
            <p className='text-xl font-semibold text-foreground'>0</p>
          </div>
          <div className='space-y-1'>
            <p>活跃用户</p>
            <p className='text-xl font-semibold text-foreground'>0</p>
          </div>
        </div> */}
      </InfoSectionContent>
    </InfoSection>
  )
} 