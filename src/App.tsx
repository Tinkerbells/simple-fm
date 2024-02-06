import { useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"

import { Menu } from "@/components/menu"
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
import { ThemeProvider } from "./components/theme-provider"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/ui/sidebar"

function App() {
  const [greetMsg, setGreetMsg] = useState("")
  const [name, setName] = useState("321321k")

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }))
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="h-screen overflow-clip">
        <Menu />
        <div
          className={cn(
            "h-screen overflow-hidden border-t bg-background pb-8 flex",
            // "scrollbar-none"
            "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
          )}
        >
          <Sidebar />
          {/* <ContextMenu> */}
          {/*   <ContextMenuTrigger className="flex m-4 h-full w-full items-center justify-center rounded-md border border-dashed text-sm"> */}
          {/*     Right click here */}
          {/*   </ContextMenuTrigger> */}
          {/*   <ContextMenuContent className="w-64"> */}
          {/*     <ContextMenuItem inset> */}
          {/*       Back */}
          {/*       <ContextMenuShortcut>⌘[</ContextMenuShortcut> */}
          {/*     </ContextMenuItem> */}
          {/*     <ContextMenuItem inset disabled> */}
          {/*       Forward */}
          {/*       <ContextMenuShortcut>⌘]</ContextMenuShortcut> */}
          {/*     </ContextMenuItem> */}
          {/*     <ContextMenuItem inset> */}
          {/*       Reload */}
          {/*       <ContextMenuShortcut>⌘R</ContextMenuShortcut> */}
          {/*     </ContextMenuItem> */}
          {/*     <ContextMenuSub> */}
          {/*       <ContextMenuSubTrigger inset>More Tools</ContextMenuSubTrigger> */}
          {/*       <ContextMenuSubContent className="w-48"> */}
          {/*         <ContextMenuItem> */}
          {/*           Save Page As... */}
          {/*           <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut> */}
          {/*         </ContextMenuItem> */}
          {/*         <ContextMenuItem>Create Shortcut...</ContextMenuItem> */}
          {/*         <ContextMenuItem>Name Window...</ContextMenuItem> */}
          {/*         <ContextMenuSeparator /> */}
          {/*         <ContextMenuItem>Developer Tools</ContextMenuItem> */}
          {/*       </ContextMenuSubContent> */}
          {/*     </ContextMenuSub> */}
          {/*     <ContextMenuSeparator /> */}
          {/*     <ContextMenuCheckboxItem checked> */}
          {/*       Show Bookmarks Bar */}
          {/*       <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut> */}
          {/*     </ContextMenuCheckboxItem> */}
          {/*     <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem> */}
          {/*     <ContextMenuSeparator /> */}
          {/*     <ContextMenuRadioGroup value="pedro"> */}
          {/*       <ContextMenuLabel inset>People</ContextMenuLabel> */}
          {/*       <ContextMenuSeparator /> */}
          {/*       <ContextMenuRadioItem value="pedro"> */}
          {/*         Pedro Duarte */}
          {/*       </ContextMenuRadioItem> */}
          {/*       <ContextMenuRadioItem value="colm">Colm Tuite</ContextMenuRadioItem> */}
          {/*     </ContextMenuRadioGroup> */}
          {/*   </ContextMenuContent> */}
          {/* </ContextMenu> */}
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
