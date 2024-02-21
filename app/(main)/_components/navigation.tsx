"use client"

import { cn } from '@/lib/utils'
import { ChevronsLeft, MenuIcon, PlusCircle, Search, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import React, { ElementRef, use, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'usehooks-ts'
import UserItem from './user-item'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Item from './item'
import { toast } from 'sonner'
import { DocumentList } from './document-list'


const Navigation = () => {
    const pathName = usePathname()
    const isMobile = useMediaQuery("(max-width: 760px)")
    const isResizingRef = useRef(false)
    const sidebarRef = useRef<ElementRef<"aside">>(null)
    const navbarRef = useRef<ElementRef<"div">>(null)
    const [isResetting, setIsResetting] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(isMobile)
    const create= useMutation(api.documents.create);

    useEffect(() => {
        if(isMobile){
            collapse();
        }else{
            resetWidth();
        }
    },[isMobile]);


    useEffect(() => {
        if(isMobile){
            collapse();
        }
    },[pathName,isMobile]);


    const handleMouseMove = (event:MouseEvent) => {
        if(!isResizingRef.current) return ;
        let newWidth = event.clientX
        if(newWidth < 240) newWidth = 240;
        if(newWidth > 350) newWidth = 350;

        if(sidebarRef.current && navbarRef.current){
            sidebarRef.current.style.width = `${newWidth}px`
            navbarRef.current.style.setProperty("left",`${newWidth}px`)
            navbarRef.current.style.setProperty("width",`calc(100% - ${newWidth}px)`)
        }
    }

    const handleMouseUp = () => {
        isResizingRef.current = false
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("mouseup", handleMouseUp)
    }

    const handleMouseDown = (event:React.MouseEvent<HTMLDivElement,MouseEvent>) => {
        event.preventDefault()
        event.stopPropagation()

        isResizingRef.current = true
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
    }

    const handleClick = () => {

    }

    const resetWidth = () => {
        if (sidebarRef.current && navbarRef.current) {
            setIsCollapsed(false)
            setIsResetting(true)
            
            sidebarRef.current.style.width = isMobile ? "100%" : "240px"
            navbarRef.current.style.setProperty("width", isMobile ? "0" : "calc(100%-240px")
            navbarRef.current.style.setProperty("left", isMobile ? "0" : "240px")
            setTimeout(() => setIsResetting(false),300);     
        }
    }

    const collapse = () => {
        if(sidebarRef.current && navbarRef.current){
            setIsCollapsed(true)
            setIsResetting(true)
            sidebarRef.current.style.width = "0"
            navbarRef.current.style.setProperty("width", "100%")
            navbarRef.current.style.setProperty("left", "0")
            setTimeout(() => setIsResetting(false),300);
        }
    }

    const handleCreate =  () => {
        const promise = create({title:"New Note"});

        toast.promise(promise,{
            loading: "Creating...",
            success: "New Note created!",
            error: "Error creating note"
        })
    }

    return (
    <>
    <aside
    ref={sidebarRef}
    className={cn("group/sidebar h-full bg-secondary overflow-y-auto relative flex w-60 flex-col z-[9999]",
    isResetting && "transition-all ease-in-out duration-300",
    isMobile && "w-0",)}
    >
        <div role='button'
        className={cn("h-6 w-6 text-muted-foreground rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 absolute top-3 right-2 opacity-0 group-hover/sidebar:opacity-100 transition cursor-pointer ",
        isMobile && "opacity-100")}
        onClick={collapse}
        >
            <ChevronsLeft />
        </div>
        
        <div>
            <UserItem/>
            <Item
            onClick={handleCreate}
            label="New Page"
            icon={PlusCircle}
            />
            <Item
            label="Search"
            icon={Search}
            isSearch
            onClick={()=>{}}
            />
            <Item
            label="Settings"
            icon={Settings}
            onClick={()=>{}}
            />
        </div>
        <div className="mt-4">
            <DocumentList />
        </div>
        <div 
        onMouseDown={handleMouseDown}
        onClick={resetWidth}
        className="opacity-0 group-hover/sidebar:opacity-100 transition cursor-ew-resize absolute h-full w-1 bg-primary/10 right-0 top-0"
        />
    </aside>
    <div
    ref={navbarRef}
    className={cn("absolute top-0 z-[9999] left-60 w-[calc(100%-240px)]",
    isResetting && "transition-all ease-in-out duration-300",
    isMobile && "w-full left-0")}
    >
        <nav >
            {isCollapsed && <MenuIcon onClick={resetWidth} role='button' className='h-6 w-6 text-muted-foreground'/>}
        </nav>

    </div>
    </>
  )
}

export default Navigation