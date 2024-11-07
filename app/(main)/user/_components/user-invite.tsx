"use client"

import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { HeadingText, HeadingTextTitle, HeadingTextDescription } from '@/components/heading-text'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export const UserInvite = () => {
  const [copied, setCopied] = useState(false)
  const inviteLink = "https://www.mmxq.cn/invite/xyz123" // 这里替换为实际的邀请链接

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink)
      setCopied(true)
      toast.success("邀请链接已复制")
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast.error("复制失败，请手动复制")
    }
  }

  return (
    <section className='flex gap-x-24'>
      <HeadingText>
        <HeadingTextTitle>邀请好友</HeadingTextTitle>
        <HeadingTextDescription className='max-w-xs'>
          <p>邀请好友加入猫猫星球，一起发现更多猫咪</p>
          <p>邀请满 3 名用户后可获得 1 个达人徽章</p>
        </HeadingTextDescription>
      </HeadingText>

      <div className='flex-1 flex flex-col gap-y-6'>
        {/* 邀请链接 */}
        <div className='flex items-center gap-x-4'>
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

        {/* 邀请统计 */}
        <div className='flex items-center gap-x-12 text-sm text-muted-foreground'>
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
        </div>
      </div>
    </section>
  )
} 