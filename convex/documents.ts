import { Doc,Id } from "./_generated/dataModel";
import { mutation,query } from "./_generated/server";
import { v } from "convex/values";


// archive is a mutation that takes a documentId and archives the document and all its children
export const archive=mutation({
    args:{
        id:v.id("documents"),
    },
    handler:async (ctx,args)=>{
        const identity=await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not logged in");
        }
        const userId=identity.subject;

        const currentDocument=await ctx.db.get(args.id);
        if(!currentDocument){
            throw new Error("Document not found");
        }
        if(currentDocument.userId!==userId){
            throw new Error("Not authorized");
        }

        const recursiveArchive=async (documentId:Id<"documents">)=>{
            const children= await ctx.db
            .query("documents")
            .withIndex("by_user_parent",(q)=>q.eq("userId",userId).eq("parentDocument",documentId))
            .collect();
            for(const child of children){
                await ctx.db.patch(child._id,{
                    isArchived:true,
                });
                await recursiveArchive(child._id);
            }
        }

        const document= await ctx.db.patch(args.id,{
            isArchived:true,
        });

        recursiveArchive(args.id);

        return document;
    }
});

// Query is used to get data from the server
export const getSidebar= query({
    args:{
        parentDocument:v.optional(v.id("documents")),
    },
    handler:async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not logged in");
        }
        const userId = identity.subject;

        const documents= await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
            q
                .eq("userId", userId)
                .eq("parentDocument", args.parentDocument)
        )
        .filter((q) => q.eq(q.field("isArchived"), false))
        .order("desc")
        .collect();

    return documents;
    }
});


// mutation is used to send data to the server
export const create= mutation({
    args:{
        title:v.string(),
        parentDocument: v.optional(v.id("documents")),
    },
    handler:async (ctx,args)=>{
        const identity = await ctx.auth.getUserIdentity();
        if(!identity){
            throw new Error("Not logged in");
        }

        const userId = identity.subject;

        const document=await ctx.db.insert("documents",{
            title:args.title,
            parentDocument:args.parentDocument,
            userId,
            isArchived:false,
            isPublished:false,
        });
        return document;
    }
})