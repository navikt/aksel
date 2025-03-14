import { createContext, useContext } from "react";

const SidebarContext = createContext<"sidebar" | "mobile" | null>(null);

function useSidebarLayout() {
  const context = useContext(SidebarContext);
  if (context === null) {
    throw new Error("useSidebarLayout must be used within a SidebarProvider");
  }

  return context;
}

export { SidebarContext, useSidebarLayout };
