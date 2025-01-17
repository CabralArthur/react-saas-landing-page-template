import { Outlet } from 'react-router-dom'
import { AppSidebar } from "@/components/Sidebar/AppSidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar"
import { PanelLeft } from "lucide-react";

export const App = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <SidebarTrigger className="md:hidden ml-2 fixed top-2 left-2">
            <PanelLeft />
        </SidebarTrigger>
        <div className="flex flex-1 flex-col gap-4 pt-0 p-10">
          <div className="min-h-screen">
            <div className="mx-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
