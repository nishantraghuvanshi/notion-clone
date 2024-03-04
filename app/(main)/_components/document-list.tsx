"use client"

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { use, useState } from "react";
import Item from "./item";
import { FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";


// Id is imported to use as a type for the parentDocument prop
// Doc is imported to use as a type for the data prop
interface DocumentListProps {
    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">[];
}

export const DocumentList = (
    {
        parentDocumentId,
        level = 0,
        data,
    }: DocumentListProps
) => {
    const params = useParams();
    const router = useRouter();
    // <Record> is used to define the type of the expanded state
    // It is a dictionary with string keys and boolean values
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    // onExpand is a function that takes a documentId and toggles the expanded state
    // ...prevExpanded is used to spread the previous expanded state
    const onExpand = (documentId: string) => {
        setExpanded(prevExpanded => ({
            ...prevExpanded,
            [documentId]: !prevExpanded[documentId],
        }));
    };

    // useQuery is used to get data from the server
    const documents = useQuery(api.documents.getSidebar, {
        parentDocument: parentDocumentId,
    });

    // onRedirect is a function that takes a documentId and redirects to the document page
    const onRedirect = (documentId: string) => {
        router.push(`/documents/${documentId}`);
    };

    // If the documents are not loaded, return a loading message
    if (!documents) {
        return <div>
            <Item.Skeleton level={level}/>
            {level === 0 && 
            (<>
                <Item.Skeleton level={level} />
                <Item.Skeleton level={level} />
            </>)
            }
        </div>;
    }
    // style in p tag is used to set the padding left based on the level
    return (
        <div>
        <p
            style={{
                paddingLeft: level ? `${(level * 12) + 12}px` : "12px",
            }}
            className={cn(
                "hidden text-sm font-medium text-muted-foreground/80",
                expanded && "last:block",
                level === 0 && "block"
            )}
            >
            Items
        </p>
        {documents.map(document => (
            <div key={document._id}>
                <Item 
                id={document._id}
                onClick={() => onRedirect(document._id)}
                label={document.title}
                icon={FileIcon}
                documentIcon={document.icon}
                active={params.documentId === document._id}
                level={level}
                onExpand={() => onExpand(document._id)}
                expanded={expanded[document._id]}
                />
                {expanded[document._id] && (
                    <DocumentList
                    parentDocumentId={document._id}
                    level={level + 1}
                    />)}
            </div>
        ))}   
        </div>
    )
}