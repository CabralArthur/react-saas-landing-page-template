import { SidebarTrigger } from "../ui/sidebar";
import logo from "@/assets/img/utmizer-logo.svg";

export default function TeamHeader() {
  return (
    <div className="flex items-center gap-3">
        <SidebarTrigger className="ml-1">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <img src={logo} alt="logo" className="w-full h-full" />
            </div>
        </SidebarTrigger>
        <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">Example's Team</span>
            <span className="truncate text-xs"> Trial Plan </span>
        </div>
    </div>
  )
}
