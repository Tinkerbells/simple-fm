"use client"

import { cn } from "@/lib/utils";
import { Icons } from "../icons"
import { Button } from "./button"
import { useDraggable } from '@dnd-kit/core';
import { CSS } from "@dnd-kit/utilities"
import { forwardRef } from "react";

interface FolderProps {
  id: string
  isListView: boolean
}

export const Folder = forwardRef<HTMLButtonElement, FolderProps>(
  function Folder({ id, isListView }, ref) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: id,
    });
    const style = {
      transform: CSS.Transform.toString(transform)
    }
    return (
      <div ref={setNodeRef} className="px-2">
        <Button variant={"ghost"} ref={ref} className={cn("gap-1 flex items-end focus:bg-accent focus:text-accent-foreground focus-visible:ring-1", isListView && "w-full justify-start")} style={style} {...listeners} {...attributes}>
          <Icons.folder size={30} fill="black" />
          <span className="text-sm">Downloads</span>
        </Button>
      </div>
    )
  }
);

