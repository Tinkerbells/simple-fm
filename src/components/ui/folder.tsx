"use client"

import { cn } from "@/lib/utils";
import { Icons } from "../icons"
import { Button } from "./button"
import { useDraggable } from '@dnd-kit/core';
import { CSS } from "@dnd-kit/utilities"
import { forwardRef } from "react";
import { FileIcon, defaultStyles } from "react-file-icon";
import { useHotkeys } from "react-hotkeys-hook";


interface FolderDirProps {
  isListView: boolean
  info: FileDirInfo
  openDir: (path: string) => void
}

export const Folder = forwardRef<HTMLButtonElement, FolderDirProps>(
  function Folder({ isListView, info, openDir }, ref) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: info.name,
    });
    const style = {
      transform: CSS.Transform.toString(transform)
    }
    return (
      <div ref={setNodeRef} className="px-2">
        <Button variant={"ghost"} ref={ref} className={cn("gap-1 flex items-end focus:bg-accent focus:text-accent-foreground focus-visible:ring-1", isListView && "w-full justify-start")} style={style} onClick={() => info.is_dir ? openDir(info.path) : null}>
          {info.is_dir ?
            <Icons.folder size={30} fill="black" /> :
            <Icons.file size={30} fill="black" />
          }
          <span className="text-sm">{info.name}</span>
        </Button>
      </div>
    )
  }
);

