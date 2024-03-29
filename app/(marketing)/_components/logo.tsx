import React from 'react'
import Image from 'next/image'
import { Poppins } from 'next/font/google'
import { cn } from '@/lib/utils' //Help merging CSS with issues.



const font = Poppins({
    subsets: ['latin'],
    weight: ["400","600"],
});

export const Logo = () =>{
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
            src="/logoz-dark.png"
            width={40}
            height={40}
            alt="logo"
            className='dark:hidden'
            />
            <Image
            src="/logoz-light.png"
            width={40}
            height={40}
            alt="logo"
            className='hidden dark:block'
            />
            <p className={cn("font-semibold",font.className)}>
              Zotion
            </p>
        </div>
    )
}