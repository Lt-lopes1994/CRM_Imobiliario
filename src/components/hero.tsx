"use client";

import { useState } from "react";
import { Search, MapPin, Home, Building } from "lucide-react";

export function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log("Busca por:", searchTerm, "em", location);
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Encontre o Imóvel dos Seus Sonhos
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Descubra as melhores oportunidades do mercado imobiliário
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="O que você está procurando?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Localização"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Buscar
              </button>
            </div>
          </form>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <Home size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">500+</h3>
            <p className="opacity-90">Imóveis Disponíveis</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <Building size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">50+</h3>
            <p className="opacity-90">Construtoras Parceiras</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-2">10+</h3>
            <p className="opacity-90">Cidades Atendidas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
