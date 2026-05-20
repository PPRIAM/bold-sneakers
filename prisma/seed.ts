import { PrismaClient } from '@prisma/client'
import products from '../src/data/products.json'

const prisma = new PrismaClient()

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { id: p.id.toString() },
      update: {
        name: p.name,
        price: p.price,
        imageUrl: p.image,
        description: `${p.category} - ${p.color}`,
      },
      create: {
        id: p.id.toString(),
        name: p.name,
        price: p.price,
        imageUrl: p.image,
        description: `${p.category} - ${p.color}`,
      },
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
