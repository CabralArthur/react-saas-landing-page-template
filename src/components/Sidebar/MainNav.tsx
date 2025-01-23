"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Can } from "@/providers/AbilityProvider"
import { Subjects } from "@/config/ability"
import { Actions } from "@/config/ability"

export default function MainNav({
  items,
  onItemClick,
}: {
  onItemClick: (url: string) => void
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    can?: Actions
    module?: Subjects
    items?: {
      title: string
      url: string,
      can?: Actions
      module?: Subjects
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item,) => (
            <Can I={item.can as Actions} a={item.module as Subjects} key={item.title}>
                {item.items && (
                    <Collapsible
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={item.title}>
                            {item.icon && <item.icon />}
                                <span>{item.title}</span>
                            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <SidebarMenuSub>
                                {item.items?.map((subItem) => (
                                    <Can I={subItem.can as Actions} a={subItem.module as Subjects} key={subItem.title}>
                                        <SidebarMenuSubItem>
                                            <SidebarMenuSubButton asChild onClick={() => onItemClick(subItem.url)}>
                                                <span>{subItem.title}</span>
                                            </SidebarMenuSubButton>
                                        </SidebarMenuSubItem>
                                    </Can>
                                ))}
                            </SidebarMenuSub>
                        </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ) || (
                    <SidebarMenuItem>
                        <SidebarMenuButton tooltip={item.title} onClick={() => onItemClick(item.url)}>
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )}
            </Can>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
