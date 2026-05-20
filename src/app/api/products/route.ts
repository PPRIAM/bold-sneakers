import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json({ data: { products } }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: 'Failed to fetch products', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}
