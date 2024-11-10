// components
import Image from 'next/image'
// icon
import { HeartIcon, ImageOffIcon, ThumbsUpIcon } from 'lucide-react'

export const CatCard = ({ children }: { children: React.ReactNode }) => {
    return (
        <li className='max-w-52 w-full h-64 md:h-72 lg:h-80 flex flex-col rounded-2xl overflow-hidden bg-background
        border-2 border-secondary cursor-pointer hover:bg-secondary hover:scale-[1.02] duration-300'>
            {children}
        </li>
    )
}

export const CatCardImage = ({ src }: { src: string }) => {
    return (
        <div className='relative w-full flex-1 overflow-hidden '>
            {src
                ?
                <Image
                    src={src}
                    alt="cat"
                    width={100}
                    height={100}
                    className='w-full h-full object-cover'
                />
                :
                <div className='flex items-center justify-center w-full h-full bg-secondary'>
                    <ImageOffIcon className='size-8 text-muted-foreground' />
                </div>
            }
        </div>
    )
}

export const CatCardInfo = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='relative flex items-center justify-between h-12 px-4'>
            {children}
        </div>
    )
}

export const CatCardInfoName = ({ children }: { children: React.ReactNode }) => {
    return (
        <span className='text-sm text-foreground font-bold line-clamp-1'>
            {children}
        </span>
    )
}

export const CatCardInfoNumbers = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='text-sm text-foreground font-bold flex items-center gap-x-2'>
            {children}
        </div>
    )
}

export const CatCardInfoLoveCount = ({ loveCount }: { loveCount: number }) => {
    return (
        <span className='text-sm text-gray-500 flex items-center gap-x-1'>
            <HeartIcon className='size-4' />
            {loveCount}
        </span>
    )
}

export const CatCardInfoLikeCount = ({ likeCount }: { likeCount: number }) => {
    return (
        <span className='text-sm text-gray-500 flex items-center gap-x-1'>
            <ThumbsUpIcon className='size-4' />
            {likeCount}
        </span>
    )
}

export const CatCardImageUpdates = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='absolute -top-8 left-0 w-full h-8 px-4
        bg-black/30 text-xs text-white flex items-center'>
            {children}
        </div>
    )
}