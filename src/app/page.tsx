import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { PropertyGrid } from "@/components/property-grid";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-8">
        <PropertyGrid />
      </main>
      <Footer />
    </div>
  );
}
