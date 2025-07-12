"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, LogOut, Settings } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

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
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-900">Olá, {session.user.name}</span>
                {session.user.role === "ADMIN" && (
                  <Link
                    href="/admin"
                    className="flex items-center space-x-1 text-gray-900 hover:text-blue-600"
                  >
                    <Settings size={16} />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-1 text-gray-900 hover:text-red-600"
                >
                  <LogOut size={16} />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
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
              {session ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <span className="text-gray-900">
                    Olá, {session.user.name}
                  </span>
                  {session.user.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      className="flex items-center space-x-1 text-gray-900 hover:text-blue-600"
                    >
                      <Settings size={16} />
                      <span>Admin</span>
                    </Link>
                  )}
                  <button
                    onClick={() => signOut()}
                    className="flex items-center space-x-1 text-gray-900 hover:text-red-600"
                  >
                    <LogOut size={16} />
                    <span>Sair</span>
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-center"
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
