import { cn } from "@/lib/utils"
import { Button } from "./button"
import { Icons } from "../icons"
import { ModeToggle } from "../theme-toggle"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function Sidebar({ className }: SidebarProps) {
  return (
    <div className={cn("pb-2 flex flex-col justify-between h-full w-44 border-r sticky", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Devices
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-1">
              <Icons.hardDrive size={20} />
              Disk 1
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-1">
              <Icons.hardDrive size={20} />
              Disk 2
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-1">
              <Icons.hardDrive size={20} />
              Disk 3
            </Button>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Favorites
          </h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-1">
              <Icons.downloads size={20} />
              Downloads
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-1">
              <Icons.media size={20} />
              Pictures
            </Button>
          </div>
        </div>
      </div>
      <div className="py-2 border-t">
        <div className="px-3 py-2 flex items-center">
          <Button variant="ghost" className="w-full justify-start gap-1">
            <Icons.settings />
            Settings
          </Button>
        </div>
        <div className="px-3 py-2">
          <ModeToggle />
        </div>
      </div>
    </div>
  )
}
