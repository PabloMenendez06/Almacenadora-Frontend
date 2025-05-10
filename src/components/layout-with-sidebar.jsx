"use client"

import AppSidebar from "@/components/app-sidebar"

export default function LayoutWithSidebar({ children }) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <AppSidebar />
      <main className="flex flex-1 flex-col min-h-screen w-full">{children}</main>
    </div>
  )
}
