"use client"

import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Folder } from "./ui/folder"
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Icons } from "./icons";
import { cn } from "@/lib/utils";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { useHotkeys } from "react-hotkeys-hook";
import { useScroll } from "@/hooks";

export function FileSystemExplorer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const childRefs = useRef<HTMLButtonElement[]>([]);
  const [isListView, setIsListView] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)


  const focusNextItem = () => {
    if (childRefs.current) {
      const currentIndex = childRefs.current.findIndex(item => document.activeElement === item);
      const nextIndex = (currentIndex + 1) % childRefs.current.length;
      childRefs.current[nextIndex]?.focus()
    }
  }

  const focusPreviousItem = () => {
    const currentIndex = childRefs.current.findIndex(item => document.activeElement === item);
    const previousIndex = (currentIndex - 1 + childRefs.current.length) % childRefs.current.length;
    childRefs.current[previousIndex]?.focus();
  };


  useHotkeys('j', () => focusNextItem())
  useHotkeys('k', () => focusPreviousItem())
  useHotkeys('shift+g', () => useScroll(containerRef, "end"))
  useHotkeys('shift+j', () => useScroll(containerRef, "start"))

  useEffect(() => {
    childRefs.current = childRefs.current.slice(0, 99);
  }, [])

  return (
    <div className="p-4 h-full w-full relative">
      <ContextMenu>
        <ContextMenuTrigger className="flex w-full h-full items-center justify-center rounded-md border text-sm" >
          <ScrollArea className="h-full w-full p-2 overflow-x-hidden" >
            <div className={cn("grid gap-2 my-2", !isListView && "grid-cols-5")} ref={containerRef}>
              <DndContext collisionDetection={closestCenter} onDragEnd={(e) => console.log(e, "drag end")}>
                {Array.from({ length: 100 }, (_, index) => index + 1).map((i) => (
                  <Folder ref={el => { if (el) childRefs.current[i] = el }} id={i.toString()} isListView={isListView} />
                ))}
              </DndContext>
            </div>
            <Button
              className="rounded-3xl absolute mt-8 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              onClick={() => useScroll(containerRef, isAtTop ? "end" : "start", () => setIsAtTop(!isAtTop), "smooth")}
              variant={"default"}
              size={"icon"}
            >
              <Icons.arrowUpCircle className={cn("transition-all", isAtTop ? "-rotate-180" : "rotate-0")} />
            </Button>
          </ScrollArea>
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup value="pedro">
            <ContextMenuLabel inset>People</ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu >
    </div >
  )
}
