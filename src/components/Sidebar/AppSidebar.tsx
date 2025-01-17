import * as React from "react"
import {
  Settings2,
  Settings
} from "lucide-react"

import MainNav from "@/components/Sidebar/MainNav"
import NavUser from "@/components/Sidebar/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar"

import TeamHeader from "./TeamHeader"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  mainNav: [
    {
      title: "Application",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "Tasks",
          url: "#",
        }
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings, // Added gear icon here
      items: [
        {
          title: "Profile",
          url: "#",
        },
        {
          title: "Users",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        }
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamHeader />
      </SidebarHeader>
      <SidebarContent>
        <MainNav items={data.mainNav} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser/>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
