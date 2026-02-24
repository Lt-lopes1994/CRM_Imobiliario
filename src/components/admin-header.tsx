"use client";

import { Bell, User, LogOut, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import {
  clearAuthSession,
  getCurrentUser,
  onAuthChanged,
  type AuthUser,
} from "@/lib/auth-client";

export function AdminHeader() {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const syncUser = () => setAuthUser(getCurrentUser());
    syncUser();

    const unsubscribe = onAuthChanged(syncUser);
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    setShowDropdown(false);
  };

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Painel Administrativo
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell size={20} className="text-gray-900" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-gray-900">
                  {authUser?.name}
                </div>
                <div className="text-xs text-gray-900 font-medium">
                  Administrador
                </div>
              </div>
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                  onClick={() => setShowDropdown(false)}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                >
                  <Settings size={16} className="mr-2" />
                  Configurações
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                >
                  <LogOut size={16} className="mr-2" />
                  Sair
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
