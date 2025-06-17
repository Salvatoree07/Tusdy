import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator"
import { NavigationEvents } from "@/components/navigation-events";
import { Suspense } from 'react'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], //serve per caricare le sotofamiglie di font latini
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
      <html lang="it">
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}>
            <SidebarProvider>
              <AppSidebar />
                <main className="w-screen">
                    <div className="flex items-center space-x-3.5">
                      <SidebarTrigger className="p-5 " />
                      <Breadcrumb>
                        <BreadcrumbList>
                          <BreadcrumbItem>
                            <BreadcrumbLink href="/dashboard">Dasboard</BreadcrumbLink>
                          </BreadcrumbItem>
                          <BreadcrumbSeparator />
                          <BreadcrumbItem>
                            <BreadcrumbPage>
                            <Suspense fallback={null}>
                              <NavigationEvents />
                            </Suspense>
                            </BreadcrumbPage>
                          </BreadcrumbItem>
                        </BreadcrumbList>
                      </Breadcrumb>
                    </div>
                    <Separator className=""/>
                    <div className="p-10">
                        {children}
                    </div>
                </main>
            </SidebarProvider>
            
          </body>
      </html>
    );
}