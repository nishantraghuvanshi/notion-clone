"use client";
import { Skeleton } from '@/components/ui/skeleton';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { useUser } from '@clerk/clerk-react';
import { 
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useMutation } from 'convex/react';
import { ChevronDown, ChevronRight, LucideIcon, MoreHorizontal, PlusIcon, Trash } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react'
import { toast } from 'sonner';

interface Props {
    id?: Id<"documents">;
    documentIcon?: String;
    active?: boolean;
    expanded?: boolean;
    isSearch?: boolean;
    level?: number;
    onExpand?: () => void;
    label: string;
    onClick?: () => void;
    icon: LucideIcon;
}

const Item = ({
    label,
    onClick,
    icon:Icon,
    id,
    active,
    documentIcon,
    isSearch,
    level=0,
    onExpand,
    expanded,
}: Props) => {
    const create= useMutation(api.documents.create);
    const {user} = useUser();
    // const router= useRouter();
    const archive= useMutation(api.documents.archive);

    const onArchive = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if(!id) return;
        const promise= archive({id})
        
        toast.promise(promise, {
            loading: 'Archiving...',
            success: 'Archived!',
            error: 'Error archiving',
        });
    }


// React.MouseEvent<HTMLDivElement, MouseEvent> is a type that represents a mouse event on a div element
// MouseEvent is a built-in type in TypeScript that represents a mouse event
// HTMLDivElement is a built-in type in TypeScript that represents a div element
// StopPropagation is a method that stops the event from bubbling up the DOM tree
    const handleExpand = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        onExpand?.();
    }

    // onCreate is a function that is called when the user clicks on the create button. It creates a new document and expands the parent item if it is not already expanded.
    // onExpand?.() is a shorthand for calling the onExpand function if it exists. It is equivalent to writing if (onExpand) { onExpand(); }
    const onCreate = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.stopPropagation();
        if (!id) return;
        const promise= create({ title:"Untitled", parentDocument:id })
        .then((documentId) => {
            if(!expanded){
                onExpand?.();
            }
        // router.push(`/documents/${documentId}`)
    });

        toast.promise(promise, {
            loading: 'Creating New Note...',
            success: 'New Note created!',
            error: 'Error creating New Note',
        });
    }



    const ChevronIcon= expanded ? ChevronDown : ChevronRight;


    return (
        <div 
        onClick={onClick}
        role='button'
        style={{
            paddingLeft:level? `${(level * 12)+12}px`: "12px"
        }}
        className={cn(
            "group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground",
            active && "bg-primary/5 text-primary",
        )}
        >
            {!!id && (
                <div
                role='button'
                className='h-full rounded-sm hover:bg-neutral-300
                dark:bg-neutral-600 mr-1'
                onClick={handleExpand}
                >
                    <ChevronIcon 
                        className='h-4 w-4 shrink-0 text-muted-foreground'
                    />
                </div>
                )}
            {documentIcon ? (
                <div>
                    {documentIcon}
                </div>
            ): (
                <Icon className='shrink-0 h-[18px] mr-2 text-muted-foreground' /> 

            )}
            <span className="text-sm font-semibold truncate">{label}</span>
            {isSearch && (
                <kbd className='ml-auto pointer-events-none inline-flex
                h-5 select-none items-center gap-1 rounded border bg-muted
                px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100'>
                    <span>CTRL</span>K
                </kbd>
            )}
            {!!id && (
                <div className="ml-auto flex items-center gap-x-2">
            <DropdownMenu>
            <DropdownMenuTrigger
              onClick={(e) => e.stopPropagation()}
              asChild
            >
              <div
                role="button"
                className="opacity-0 group-hover:opacity-100 h-full ml-auto 
                rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              >
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-60"
              align="start"
              side="right"
              forceMount
            >
              <DropdownMenuItem onClick={onArchive}>
                <Trash className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="text-xs text-muted-foreground p-2">
                Last edited by: {user?.fullName}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
                    <div 
                    role='button'
                    onClick={onCreate}
                    className='opacity-0 group-hover:opacity-100 h-full ml-auto
                    rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600'>
                        <PlusIcon className='h-4 w-4 text-muted-foreground'/>
                    </div>
                </div>
                )}
        </div>
    )
}
// What does this mean?
// The Item component is a reusable component that is used to render a single item in the navigation sidebar. It accepts the following props:
// What is the level prop used for? 
// The level prop is used to determine the indentation of the item in the sidebar. It is used to create a nested structure in the sidebar.
Item.Skeleton = function ItemSkeleton({level}:{level?:number}) {
    return (
// Why are we using style instead of classname?
// We are using the style prop instead of the className prop because we want to apply inline styles to the component. In this case, we are setting the padding-left property of the component based on the level prop to create the indentation effect.
// Can't we just use className to apply the styles?
// Yes, we could use the className prop to apply the styles, but using the style prop allows us to apply the styles directly to the component without having to define a separate CSS class.
        <div
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px"
            }}
        >
        <Skeleton className='h-4 w-4'/>
        <Skeleton className='h-4 w-30%'/>
        </div>
    )
}

export default Item