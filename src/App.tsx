import { useEffect, useState } from "react"

import { Menu } from "@/components/menu"
import { ThemeProvider } from "./components/theme-provider"
import { cn } from "@/lib/utils"
import { Sidebar } from "@/components/sidebar"
import { FileSystemExplorer } from "@/components/fs-explorer"
import { Toaster } from "@/components/ui/toaster"

function App() {
  const [greetMsg, setGreetMsg] = useState("")
  const [name, setName] = useState("")


  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="h-screen overflow-clip">
        <Menu />
        <div
          className={cn(
            "h-screen overflow-hidden border-t bg-background pb-8 flex",
            "scrollbar-none"
            // "scrollbar scrollbar-track-transparent scrollbar-thumb-accent scrollbar-thumb-rounded-md"
          )}
        >
          <Sidebar />
          <FileSystemExplorer />
        </div>
        <Toaster />
      </main>
    </ThemeProvider>
  )
}

export default App
