"use client"

import Image from 'next/image'
import React from 'react'
import { useUser } from '@clerk/clerk-react'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { toast } from 'sonner'


const Documents = () => {
    const {user} = useUser()
    const create = useMutation(api.documents.create);

    const onCreate = () =>{
      const promise= create({
        title: 'New Note',
      })
      toast.promise(promise, {
        loading: 'Creating Note...',
        success: 'Note created!',
        error: 'Error creating note',
      });
    };

  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
        <Image 
        src="/empty.png"
        height="300"
        width="300"
        alt='empty'
        className='dark:hidden'
        />
        <Image 
        src="/empty-dark.png"
        height="300"
        width="300"
        alt='empty'
        className='hidden dark:block'
        />
        <h2>
            Welcome to {user?.firstName}&apos;s Zotion.
        </h2>
        <Button onClick={onCreate}>
            <PlusCircle  className='h-4 w-4 mr-2'/>
            Create a Note
        </Button>
    </div>
  )
}

export default Documents