import { cn } from '@/lib/utils'
import type { ComponentProps } from 'react'

export const InfoSection = ({ children, className }: ComponentProps<'section'>) => {
    return (
        <section className={cn('flex flex-col lg:flex-row gap-x-24', className)}>
            {children}
        </section>
    )
}

export const InfoSectionContent = ({ children, className }: ComponentProps<'div'>) => {
    return (
        <div className={cn('flex-1', className)}>
            {children}
        </div>
    )
}
