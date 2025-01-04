"use client"

import { cn } from '@/lib/utils'
import Image from 'next/image'

interface HomeCardProps {
  className?: string
  img: string
  title: string
  description: string
  handleClick: () => void
}

const HomeCard = ({
  className,
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <div className="w-full">
      <div
        className={cn(
          'group relative overflow-hidden rounded-xl p-6 transition-all hover:shadow-lg',
          'flex min-h-[260px] w-full flex-col justify-between',
          'sm:max-w-[300px] md:max-w-[320px] xl:max-w-[270px]',
          'hover:-translate-y-1 hover:bg-opacity-90',
          className
        )}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      >
        <div className={cn(
          'glassmorphism flex items-center justify-center',
          'size-12 rounded-xl transition-transform',
          'group-hover:scale-110'
        )}>
          <Image
            src={img}
            alt={title}
            width={27}
            height={27}
            className="object-contain"
          />
        </div>

        <div className="flex flex-col gap-3">
          <h2 className="text-xl font-bold tracking-tight transition-colors group-hover:text-sky-400">
            {title}
          </h2>
          <p className="text-base font-normal leading-relaxed text-gray-200 line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomeCard