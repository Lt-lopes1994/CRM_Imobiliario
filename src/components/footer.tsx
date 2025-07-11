import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">CRM Imobiliária</h3>
            <p className="text-gray-400 mb-4">
              Sua parceira na busca pelo imóvel perfeito. Oferecemos as melhores
              oportunidades do mercado com atendimento personalizado.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Navegação</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis"
                  className="text-gray-400 hover:text-white"
                >
                  Imóveis
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="text-gray-400 hover:text-white">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="text-gray-400 hover:text-white"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/imoveis?type=HOUSE"
                  className="text-gray-400 hover:text-white"
                >
                  Casas
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?type=APARTMENT"
                  className="text-gray-400 hover:text-white"
                >
                  Apartamentos
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?type=COMMERCIAL"
                  className="text-gray-400 hover:text-white"
                >
                  Comerciais
                </Link>
              </li>
              <li>
                <Link
                  href="/imoveis?type=LAND"
                  className="text-gray-400 hover:text-white"
                >
                  Terrenos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone size={16} className="text-gray-400" />
                <span className="text-gray-400">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail size={16} className="text-gray-400" />
                <span className="text-gray-400">
                  contato@crmimobiliaria.com
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={16} className="text-gray-400" />
                <span className="text-gray-400">São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 CRM Imobiliária. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
