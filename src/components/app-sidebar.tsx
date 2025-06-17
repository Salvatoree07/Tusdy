import { FolderPlus, User, Search, PackageSearch, PencilRuler } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Nuova mappa",
    url: "/dashboard/crea",
    icon: PencilRuler,
  },
  {
    title: "Mappe",
    url: "/dashboard/visualizza",
    icon: FolderPlus,
  }
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup >
            
          <div className="flex space-x-2">
            <div className="size-10">
                <a href="">
                    <Image src={'/img/logo.png'} alt="logo" width={300} height={315} className="rounded-sm"></Image>
                </a>

            </div>
                <div>
                    <h3 className="font-bold text">Tusdy</h3>
                    <p className="text-gray-600 text-sm bold " >Student Application</p>

                </div>
          </div>
          <div className="relative">
            <a href="">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </a>
            <Input className="my-5 pl-9" placeholder="Search the docs..."/>  
          </div>
          <SidebarGroupContent>
            <SidebarMenu className="">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

