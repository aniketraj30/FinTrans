import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarSeparator,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart3, FolderKanban, FileText, Upload, Settings, Home } from "lucide-react";
import { useMemo } from "react";

const menu = [
  { to: "/dashboard", label: "Dashboard", icon: Home },
  { to: "/projects", label: "Projects", icon: FolderKanban },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/sops", label: "SOPs", icon: FileText },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function AppLayout() {
  const location = useLocation();
  const title = useMemo(() => {
    const found = menu.find((m) => location.pathname.startsWith(m.to));
    return found?.label ?? "FinTrans";
  }, [location.pathname]);

  return (
    <SidebarProvider>
      <Sidebar className="border-r">
        <SidebarHeader>
          <div className="flex items-center justify-between px-2 py-2">
            <div className="text-sm font-semibold">FinTrans</div>
            <Badge variant="secondary">v0.1</Badge>
          </div>
          <Input placeholder="Search…" aria-label="Search" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.to}>
                  <SidebarMenuButton asChild isActive={location.pathname.startsWith(item.to)}>
                    <NavLink to={item.to} className={({ isActive }) => cn("flex items-center gap-2", isActive && "font-medium") }>
                      <Icon />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter>
          <div className="px-2 text-xs text-muted-foreground">
            Role: <span className="font-medium">Analyst</span>
          </div>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 items-center gap-3 px-4">
            <SidebarTrigger />
            <div className="text-sm text-muted-foreground">FinTrans</div>
            <div className="h-6 w-px bg-border" />
            <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
            <div className="ml-auto">
              <Button size="sm" variant="outline">New Project</Button>
            </div>
          </div>
        </header>
        <main className="container py-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
