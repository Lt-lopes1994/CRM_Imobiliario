"use client";

import { useEffect, useState } from "react";
import { Search, MapPin, Home, Building } from "lucide-react";

interface UFOption {
  id: number;
  sigla: string;
  nome: string;
}

interface CityOption {
  id: number;
  nome: string;
}

export function Hero() {
  const [searchTerm, setSearchTerm] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [ufs, setUfs] = useState<UFOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);
  const [loadingUfs, setLoadingUfs] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const loadUfs = async () => {
      try {
        setLoadingUfs(true);
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
        );

        if (!response.ok) {
          throw new Error("Falha ao carregar UFs");
        }

        const data: UFOption[] = await response.json();
        setUfs(data);
      } catch (error) {
        console.error("Erro ao carregar UFs:", error);
      } finally {
        setLoadingUfs(false);
      }
    };

    loadUfs();
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      if (!state) {
        setCities([]);
        setCity("");
        return;
      }

      try {
        setLoadingCities(true);
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`,
        );

        if (!response.ok) {
          throw new Error("Falha ao carregar cidades");
        }

        const data: CityOption[] = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    loadCities();
  }, [state]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar lógica de busca
    console.log("Busca por:", searchTerm, "UF:", state, "Cidade:", city);
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                />
              </div>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <select
                  value={state}
                  onChange={(e) => {
                    setState(e.target.value);
                    setCity("");
                  }}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  disabled={loadingUfs}
                >
                  <option value="">
                    {loadingUfs ? "Carregando UFs..." : "UF"}
                  </option>
                  {ufs.map((uf) => (
                    <option key={uf.id} value={uf.sigla}>
                      {uf.sigla}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative">
                <MapPin
                  className="absolute left-3 top-3 text-gray-400"
                  size={20}
                />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  disabled={!state || loadingCities}
                >
                  <option value="">
                    {!state
                      ? "Cidade"
                      : loadingCities
                        ? "Carregando cidades..."
                        : "Cidade"}
                  </option>
                  {cities.map((cityOption) => (
                    <option key={cityOption.id} value={cityOption.nome}>
                      {cityOption.nome}
                    </option>
                  ))}
                </select>
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
              <Home size={24} className="text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-2">500+</h3>
            <p className="opacity-90">Imóveis Disponíveis</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <Building size={24} className="text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-2">50+</h3>
            <p className="opacity-90">Construtoras Parceiras</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full mb-4">
              <MapPin size={24} className="text-black" />
            </div>
            <h3 className="text-2xl font-bold mb-2">10+</h3>
            <p className="opacity-90">Cidades Atendidas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
