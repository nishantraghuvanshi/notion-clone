"use client"

import { useEffect,useState } from "react";
import { File } from "lucide-react";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { useUser} from "@clerk/clerk-react";

import { 
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
 } from "./ui/command";
import { useSearch } from "@/hooks/use-search";
import { api } from "@/convex/_generated/api";


/* Hydration error is a common error that occurs when the server-rendered HTML does not match the client-rendered HTML. 
This error is often caused by the client-side JavaScript that modifies the HTML after it has been rendered by the server.*/
/* In this case the hydration error is caused by the isMounted state
and to prevent the hydration error, we use the useEffect hook which makes it so that the isMounted is rendered only when the client side mounts.*/
export const SearchCommand = () => {
    const {user} = useUser();
    const router = useRouter();
    const documents = useQuery(api.documents.getSearch);
    const [isMounted,setIsMounted] = useState(false);

    const toggle= useSearch((state) => state.toggle);
    const isOpen= useSearch((state) => state.isOpen);
    const onClose= useSearch((state) => state.onClose);

    useEffect(() => {
        setIsMounted(true);
    },[]);

    useEffect(() => {
        const down= (event: KeyboardEvent) => {
            if(event.key === 'k' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                toggle();
            }
        }
        document.addEventListener('keydown',down);
        return () => {
            document.removeEventListener('keydown',down);
        }
    },[toggle])

    if(!isMounted) { return null; };

    const onSelect = (id: string) => {
        router.push(`/documents/${id}`);
        onClose();
    }

    return (
        <CommandDialog open={isOpen} onOpenChange={onClose}>
            <CommandInput 
            placeholder={`Search ${user?.firstName}'s documents`}
            />
            <CommandList>
                <CommandEmpty>No Results found.</CommandEmpty>
                <CommandGroup heading="Documents">
                    {documents?.map((document) => (
                        <CommandItem 
                        key={document._id}
                        value={`${document._id}-${document.title}`}
                        title={document.title}
                        onSelect={onSelect}
                        >
                            {document.icon ? (
                                <p className="mr-2 text-[18px]">
                                    {document.icon}
                                </p>
                            ):(
                                <File className="mr-2 h-4 w-4"/>
                            )}
                            <span>{document.title}</span>
                        </CommandItem>
                    ))    
                    }
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    )
}