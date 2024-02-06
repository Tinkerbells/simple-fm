import { useState } from "react"
import { invoke } from "@tauri-apps/api/tauri"

import { Menu } from "@/components/menu"
import { ThemeProvider } from "./components/theme-provider"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/ui/sidebar"
import { FileSystemExplorer } from "@/components/fs-explorer"

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
            "h-screen overflow-auto border-t bg-background pb-8 flex",
            // "scrollbar-none"
            "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
          )}
        >
          <Sidebar />
          <FileSystemExplorer />
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
