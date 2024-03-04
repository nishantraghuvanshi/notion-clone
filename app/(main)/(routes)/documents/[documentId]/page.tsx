"use client"
import { api } from '@/convex/_generated/api'
import { Id } from '@/convex/_generated/dataModel'
import { useMutation, useQuery } from 'convex/react'
import React from 'react'
import { Toolbar } from '@/components/toolbar'
import { Cover } from '@/components/cover'
import { Skeleton } from '@/components/ui/skeleton'
import dynamic from 'next/dynamic'
import { useMemo } from 'react';

// We can access the params this way. We can also use useParams hook alternatively.
interface DocumentIdPageProps {
  params:{
    documentId: Id<"documents">
  }}

const DocumentIdPage = ({
  params
}:DocumentIdPageProps) => {
// We can use dynamic import to load the editor component only when it is needed.
  const Editor = useMemo(()=> dynamic(()=>import('@/components/editor'), {ssr: false}), [])

  const document= useQuery(api.documents.getById, {documentId: params.documentId})

  const update= useMutation(api.documents.update)

  const onChangeFunc = (content: string) => {
    update({
      id: params.documentId,
      content
    })
  }


  if(document === undefined){
    return (<div>
      <Cover.Skeleton />
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
        <div className='space-y-4 pl-8 pt-4'>
          <Skeleton className='h-14 w-[50%]' />
          <Skeleton className='h-4 w-[40%]' />
          <Skeleton className='h-4 w-[40%]' />
          <Skeleton className='h-4 w-[40%]' />
        </div>
      </div>
    </div>)
  }
  if(document === null){
    return <div>Document not found</div>
  }
  return (
    <div className='pb-40'>
      <Cover url={document.coverImage}/>
      <div className='md:max-w-3xl lg:max-w-4xl mx-auto'>
        <Toolbar initialData={document}/>
        <Editor
        onChange={onChangeFunc}
        initialContent={document.content}
        />
      </div>
    </div>
  )
}

export default DocumentIdPage