"use client";

import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  Settings,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/sidebar/use-sidebar";

const navItems = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
    label: "Dashboard",
  },
  {
    href: "/users",
    icon: Users,
    label: "Users",
  },
  {
    href: "/products",
    icon: ShoppingBag,
    label: "Products",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
  },
];

const Sidebar = () => {
  const { isOpen, setIsOpen } = useSidebar();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 256 : 80 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 left-0 h-full bg-background border-r flex flex-col z-20"
    >
      <div className="p-4 flex items-center justify-between h-16 border-b">
        <AnimatePresence>
          {isOpen && (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-2xl font-bold text-primary"
            >
              Izgara
            </motion.h1>
          )}
        </AnimatePresence>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-full"
        >
          {isOpen ? <ChevronLeft /> : <Menu />}
        </Button>
      </div>
      <nav className="flex-1 mt-4 space-y-2 px-2">
        {navItems.map((item) => (
          <NavLink
            to={item.href}
            key={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center p-3 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground",
                isActive && "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground",
                !isOpen && "justify-center"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <AnimatePresence>
              {isOpen && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="ml-4"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
};

export default Sidebar;