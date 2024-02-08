"use client"

import { useCallback, } from "react"
import { Globe, Mic } from "lucide-react"
import { WindowTitlebar } from "tauri-controls"

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"

import { AboutDialog } from "./about-dialog"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { Button } from "./ui/button"
import { Icons } from "./icons"

export function Menu() {
  const closeWindow = useCallback(async () => {
    const { appWindow } = await import("@tauri-apps/plugin-window")

    appWindow.close()
  }, [])

  return (
    <WindowTitlebar
    // controlsOrder="platform"
    // windowControlsProps={{ platform: "macos", className: "" }}
    >
      <Menubar className="rounded-none border-b border-none pl-2 lg:pl-3 w-full py-4">
      </Menubar>
    </WindowTitlebar>
  )
}
