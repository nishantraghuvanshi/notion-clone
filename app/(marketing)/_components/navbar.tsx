"use client"
import { useScrollTop } from '@/hooks/user-scroll-top';
import React from 'react'
import { cn } from '@/lib/utils';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/mode-toggle';
import { useConvexAuth } from 'convex/react';
import { SignInButton, UserButton } from '@clerk/clerk-react';
import { Spinner } from '@/components/spinner';
import Link from 'next/link';

const Navbar = () => {
    const {isAuthenticated,isLoading} = useConvexAuth();
    const scrolled = useScrollTop(10);
    return (
    <div className={cn("z-50 bg-background fixed top-0 flex dark:bg-[#1F1F1F] items-center w-full p-6 ",scrolled && "border-b shadow-sm")}>
        <Logo />
        <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
            {isLoading && (
                <Spinner size="lg" />
            )}
            {!isAuthenticated && !isLoading && (
                <div>
                <SignInButton mode="modal">
                    <Button variant="ghost" size="sm">
                        Log In
                    </Button>
                </SignInButton>
                <SignInButton mode="modal">
                    <Button size="sm">
                        Get Jotion free
                    </Button>
                </SignInButton>
                </div>
            )}

            {isAuthenticated && !isLoading && (
                <div className="flex justify-between gap-x-4">
                <Button size="sm" asChild>
                    <Link href="/documents">
                        Enter Jotion
                    </Link>
                </Button>
                <UserButton 
                afterSignOutUrl='/'
                />
                </div>
            )}
            <ModeToggle />
        </div>
    </div>
  )
}

export default Navbar