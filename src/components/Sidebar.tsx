"use client"
import { sidebarLinks } from '@/constants'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {
    const pathname = usePathname() ;
  return (
    <div>
        <section className='sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-sm:hidden lg:w-[264px]'>
            <div className='flex flex-col gap-6'>
               {
                sidebarLinks.map((link) => {
                    const isActive = pathname === link.route
                    
                    return(
                        <Link
                        href={link.route}
                        key={link.label}
                        className={`flex gap-4 items-center p-4 rounded-[7px] justify-start ${isActive ? 'bg-blue-500 text-black' : ''}`}
                       >
                        <Image 
                        src={link.imgUrl}
                        alt={link.label}
                        width={24}
                        height={24}
                        ></Image>
                        <p className='text-lg font-semibold max-lg:hidden'>
                            {link.label}
                        </p>
                       </Link>
                    )
                })
               } 
            </div>
        </section>
    </div>
  )
}

export default Sidebar