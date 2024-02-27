"use client"

import React from "react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";


interface TitleProps {
    initialData: Doc<"documents">;
}


// setTimeout is used to focus the input after it is rendered
// setSelectionRange is used to select the text in the input
export const Title = (
    {initialData}: TitleProps
) =>{
    const update = useMutation(api.documents.update);
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [title, setTitle] = React.useState(initialData.title || "Untitled");
    const [isEditing, setIsEditing] = React.useState(false);

    const enableInput = () => {
        setTitle(initialData.title);
        setIsEditing(true);
        setTimeout(() => {
            inputRef.current?.focus();
            inputRef.current?.setSelectionRange(0, inputRef.current.value.length);  
        }, 0);
    }


    const disableInput = () => {
        setIsEditing(false);
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        update({
            id:initialData._id,
            title: event.target.value || "Untitled",
        })
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter"){
            disableInput();
        }
    }

    return (
        <div className='flex items-center gap-x-1'>
            {!!initialData.icon && (
                <p>
                    {initialData.icon}
                </p>
            )}
            {isEditing ? (
                <Input 
                ref={inputRef}
                onClick={enableInput}
                onBlur={disableInput}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={title}
                className='h-7 px-2 focus-visible:ring-transparent'
                />
            ):(
                <Button
                onClick={enableInput}
                variant="ghost"
                size="sm"
                className="font-normal h-auto p-1"
                >
                    <span className="truncate">
                        {initialData?.title}
                    </span>
                </Button>
            )}
        </div>
    )
}


// Skeleton is a component that is used to show a loading state of the component

Title.Skeleton = function TitleSkeleton(){
    return (
        <Skeleton className='h-3 w-20 rounded-md'/>
    );
};