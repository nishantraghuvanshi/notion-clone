"use client"


import { ConfirmModal } from '@/components/modals/confirm-modal';
import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useMutation, useQuery } from 'convex/react';
import { Search, Trash, Undo } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { toast } from 'sonner';

export const TrashBox = () => {
    const router = useRouter();
    const params= useParams();
    const documents = useQuery(api.documents.getTrash)
    const restore = useMutation(api.documents.restore);
    const remove = useMutation(api.documents.remove);

    const [search, setSearch] = React.useState("");

    const filteredDocuments = documents?.filter((doc) => {
        return doc.title.toLowerCase().includes(search.toLowerCase());
    });

    const onClick= (documentId: string) => {
        router.push(`/documents/${documentId}`);
    }

    const onRestore = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        documentId: Id<"documents">
    ) =>{
        event.stopPropagation();
        const promise = restore({id:documentId});
        toast.promise(promise, {
            loading: "Restoring...",
            success: "Restored!",
            error: "Error restoring",
        });
    }

    const onRemove = (
        documentId: Id<"documents">
    ) =>{
        const promise = remove({id:documentId});
        toast.promise(promise, {
            loading: "Deleted...",
            success: "Note Deleted!",
            error: "Error Deleting",
        });
        if(params.documentId===documentId){
            router.push(`/documents`);
        }
    }


    if(documents=== undefined){
        return (<div className="h-full flex items-center justify-center p-4">
            <Spinner size="lg"/>
        </div>)
    }


  return (
    <div className='text-sm'>
        <div className="flex items-center gap-x-1 p-2">
            <Search className='h-4 w-4'/>
            <Input 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title.."
                className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
            />
        </div>
        <div className='mt-2 px-1 pb-1'>
            <p className='hidden last:block text-xs 
            text-center text-muted-foreground'>
                No Documents found.
            </p>
            {filteredDocuments?.map((doc) => (
                <div
                key={doc._id}
                role='button'
                onClick={()=>onClick(doc._id)}
                className="flex text-sm rounded-sm w-full hover:bg-primary/5
                  items-center text-primary justify-between"
                >
                    <span className='truncate pl-2'>
                        {doc.title}
                    </span>
                    <div className='flex gap-x-1'>
                    <div
                    onClick={(e) => onRestore(e, doc._id)}
                    role='button'
                    className='rounded-sm p-2 hover:bg-neutral-200
                    dark:hover:bg-neutral-600'
                    >
                        <Undo className='h-4 w-6 text-muted-foreground'/>
                    </div>
                    <ConfirmModal onConfirm={()=>onRemove(doc._id)} >
                        <div 
                    role='button'
                    className='rounded-sm p-2 hover:bg-red-500
                    dark:hover:bg-neutral-600'
                    >
                        <Trash className='h-4 w-6 text-muted-foreground' />
                    </div>
                    </ConfirmModal>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
