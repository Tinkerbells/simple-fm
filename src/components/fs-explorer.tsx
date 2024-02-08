"use client"

import { invoke } from "@tauri-apps/api/tauri"

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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useScroll } from "@/hooks";
import { Input } from "./ui/input"
import { toast } from "./ui/use-toast"

interface FileSystemExplorerProps {
  // fileDirInfo: FileDirInfo[]
}
export function FileSystemExplorer({ }: FileSystemExplorerProps) {

  const [currentDir, setCurrentDir] = useState("")
  const [dirs, setDirs] = useState<FileDirInfo[]>([])
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const childRefs = useRef<HTMLButtonElement[]>([]);
  const [isListView, setIsListView] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  //TODO add scroll detection 
  // const [isScrollable, setIsSrollable] = useState(true)

  const handleDirChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const dir = event.target.value
  }

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

  const handleKeyOpen = () => {
    const currentIndex = childRefs.current.findIndex(item => document.activeElement === item);
    if (dirs[currentIndex].is_dir) {
      handleOpenDir(dirs[currentIndex].path)
    }
    else {
      toast({
        variant: "destructive",
        title: "This is not folder",
        description: "There was a problem with your request.",
      })
    }
  }

  useHotkeys('j', () => focusNextItem())
  useHotkeys('k', () => focusPreviousItem())
  useHotkeys('shift+g', () => useScroll(containerRef, "end"))
  useHotkeys('shift+j', () => useScroll(containerRef, "start"))
  useHotkeys('h', () => handleGoBack())
  useHotkeys('l', () => handleKeyOpen())

  const handleGoBack = async () => {
    try {
      const fetchedDirs: FileDirInfo[] = await invoke("go_back");
      setDirs(fetchedDirs);
    } catch (error) {
      console.error('Error fetching directories:', error);
    }
  };


  const handleOpenDir = async (path: string) => {
    try {
      const fetchedDirs: FileDirInfo[] = await invoke("open_dir", { path: path });
      setDirs(fetchedDirs);
    } catch (error) {
      console.error('Error fetching directories:', error);
    }
  };


  useEffect(() => {
    const currentDir = async () => {
      try {
        const fetchedDir: string = await invoke("get_current_dir");
        setCurrentDir(fetchedDir);
      } catch (error) {
        console.error('Error fetching current directory:', error);
      }
    };
    const fetchDirs = async () => {
      try {
        const fetchedDirs: FileDirInfo[] = await invoke("list_dirs");
        setDirs(fetchedDirs);
      } catch (error) {
        console.error('Error fetching directories:', error);
      }
    };
    currentDir()
    fetchDirs()
    childRefs.current = childRefs.current.slice(0, dirs.length);

  }, [dirs])

  return (
    <div className="px-4 py-2 h-full w-full">
      <div className="pb-2 flex w-full justify-between">
        <div className="flex gap-2 w-1/3">
          <div className="flex gap-1">
            <Button variant={"ghost"} size={"icon"} className="rounded-full" onClick={handleGoBack}><Icons.chevronLeft /></Button>
            <Button variant={"ghost"} size={"icon"} className="rounded-full"><Icons.chevronRight /></Button>
          </div>
          <Input value={currentDir} className="w-full" />
        </div>
        <div>
          <ToggleGroup type="single">
            <ToggleGroupItem value="list" onClick={() => { setIsListView(true) }}>
              <Icons.list />
            </ToggleGroupItem>
            <ToggleGroupItem value="grid" onClick={() => { setIsListView(false) }}>
              <Icons.grid />
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <ContextMenu>
        <ContextMenuTrigger className="flex w-full h-[calc(100%-4rem)] items-center justify-center rounded-md border text-sm" >
          <ScrollArea className="h-full w-full overflow-x-hidden p-2" viewportRef={scrollAreaRef}>
            <div className={cn("grid gap-3 py-2 overflow-y-scroll", !isListView && "grid-cols-5")} ref={containerRef}>
              <DndContext collisionDetection={closestCenter} onDragEnd={(e) => console.log(e, "drag end")}>
                {dirs.map((el, i) => (
                  <Folder ref={el => { if (el) childRefs.current[i] = el }} info={el} isListView={isListView} key={i} openDir={handleOpenDir} />
                ))}
              </DndContext>
            </div>
            <Button
              className="rounded-3xl absolute mt-8 bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              onClick={() => useScroll(containerRef, isAtTop ? "end" : "start", () => setIsAtTop(!isAtTop), "smooth")}
              variant={"secondary"}
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
