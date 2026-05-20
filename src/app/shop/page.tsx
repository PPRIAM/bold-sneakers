import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import fs from "fs/promises";
import path from "path";

async function getProducts() {
  const dataPath = path.join(process.cwd(), "src/data/products.json");
  const data = await fs.readFile(dataPath, "utf8");
  return JSON.parse(data);
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <section className="px-6 pt-32 md:pt-40 pb-20 max-w-7xl mx-auto space-y-16">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic">The <span className="text-primary">Catalog</span></h1>
        </div>

        <ProductGrid products={products} />
      </section>

      <Footer />
    </main>
  );
}
