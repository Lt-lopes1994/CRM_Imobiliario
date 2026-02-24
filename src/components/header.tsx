"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, LogOut, Settings } from "lucide-react";
import {
  clearAuthSession,
  getCurrentUser,
  onAuthChanged,
  type AuthUser,
} from "@/lib/auth-client";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const syncUser = () => setUser(getCurrentUser());
    syncUser();

    const unsubscribe = onAuthChanged(syncUser);
    return unsubscribe;
  }, []);

  const handleLogout = () => {
    clearAuthSession();
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold text-blue-600">
            CRM Imobiliária
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-900 hover:text-blue-600">
              Início
            </Link>
            <Link href="/imoveis" className="text-gray-900 hover:text-blue-600">
              Imóveis
            </Link>
            <Link href="/contato" className="text-gray-900 hover:text-blue-600">
              Contato
            </Link>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-900">Olá, {user.name}</span>
                {user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-1 text-gray-900 hover:text-blue-600"
                  >
                    <Settings size={16} />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-900 hover:text-red-600"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 rounded-md border  hover:scale-105 transition-transform"
              >
                Entrar
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-900 hover:text-blue-600">
                Início
              </Link>
              <Link
                href="/imoveis"
                className="text-gray-900 hover:text-blue-600"
              >
                Imóveis
              </Link>
              <Link
                href="/contato"
                className="text-gray-900 hover:text-blue-600"
              >
                Contato
              </Link>
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <span className="text-gray-900">Olá, {user.name}</span>
                  {user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-1 text-gray-900 hover:text-blue-600"
                    >
                      <Settings size={16} />
                      <span>Admin</span>
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-1 text-gray-900 hover:text-red-600"
                  >
                    <LogOut size={16} />
                    <span>Sair</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md border hover:scale-105 transition-transform"
                >
                  Entrar
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
