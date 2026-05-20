import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductGrid from "@/components/shop/ProductGrid";
import prisma from "@/lib/prisma";

async function getProducts() {
  const products = await prisma.product.findMany();
  // Map Prisma models to the shape expected by ProductGrid
  return products.map(p => {
    const [category, color] = (p.description || "Lifestyle - Black").split(" - ");
    return {
      id: p.id,
      name: p.name,
      price: p.price,
      image: p.imageUrl || "/hero.png",
      category,
      color,
    };
  });
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
