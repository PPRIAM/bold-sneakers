import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { z } from "zod";

// Simple in-memory cache
let cachedProducts: any = null;
let lastFetch = 0;
const CACHE_TTL = 60 * 1000; // 1 minute

const ProductSchema = z.array(z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  category: z.string(),
  color: z.string(),
  image: z.string(),
}));

export async function GET() {
  try {
    const now = Date.now();
    if (cachedProducts && (now - lastFetch < CACHE_TTL)) {
      return NextResponse.json({ data: cachedProducts, source: "cache" });
    }

    const dataPath = path.join(process.cwd(), "src/data/products.json");
    const dataString = await fs.readFile(dataPath, "utf8");
    const jsonData = JSON.parse(dataString);
    
    // Validate data
    const validatedData = ProductSchema.parse(jsonData);
    
    cachedProducts = validatedData;
    lastFetch = now;

    return NextResponse.json({ data: validatedData, source: "disk" });
  } catch (error) {
    console.error("API Error:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: { message: "Data validation failed", details: error.issues } }, { status: 500 });
    }
    return NextResponse.json({ error: { message: "Failed to fetch products" } }, { status: 500 });
  }
}
