"use client"

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { MenuIcon } from "lucide-react";
import { useParams } from "next/navigation";
import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";


interface NavbarProps {
    isCollapsed: boolean;
    onResetWidth: () => void;
}

// I needed to use the documentId from the params to get the document from the server.
// I used as Id<"documents"> to tell typescript that the documentId is of type Id<"documents">

export const Navbar = ({
    isCollapsed,
    onResetWidth
}: NavbarProps) => {
    const params = useParams();

    const document=useQuery(api.documents.getById,
        {documentId:params.documentId as Id<"documents">});
    
    if(document===undefined){
        return (
            <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full
        flex justify-between items-center">
            <Title.Skeleton />
            <div className="flex items-center gap-x-2">
                <Menu.Skeleton />
            </div>
            </nav>
        )
    }

    if(document===null){
        return <p>
            Document not found
        </p>
    }

    return (
        <>
        <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full
        flex items-center gap-x-4">
            {isCollapsed && (
                <MenuIcon 
                onClick={onResetWidth}
                role='button' 
                className='h-6 w-6 text-muted-foreground'/>
            )}
            <div className="flex items-center justify-between w-full">
                <Title
                initialData={document}
                />
                <Menu documentId={document._id}/>
            </div>
        </nav>
        {document.isArchived && (
            <Banner
            documentId={document._id}
            />)}
        </>
    )
}
