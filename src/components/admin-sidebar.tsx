"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Building,
  Users,
  MessageSquare,
  Settings,
  BarChart3,
  Menu,
  X,
  UserCheck,
  TrendingUp,
} from "lucide-react";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/leads", label: "Leads", icon: TrendingUp },
  { href: "/admin/clients", label: "Clientes", icon: UserCheck },
  { href: "/admin/properties", label: "Imóveis", icon: Building },
  { href: "/admin/users", label: "Usuários", icon: Users },
  { href: "/admin/messages", label: "Mensagens", icon: MessageSquare },
  { href: "/admin/analytics", label: "Relatórios", icon: BarChart3 },
  { href: "/admin/settings", label: "Configurações", icon: Settings },
];

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 bg-gray-800">
            <h1 className="text-xl font-bold">Admin CRM</h1>
          </div>

          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-4 border-t border-gray-700">
            <Link
              href="/"
              className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <Home size={20} className="mr-3" />
              Ver Site
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
