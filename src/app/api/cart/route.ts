import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const getCartSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required').default('default-session'),
});

const addToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().int().positive().default(1),
  sessionId: z.string().default('default-session'),
});

const removeFromCartSchema = z.object({
  id: z.string().min(1, 'Cart Item ID is required'),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = getCartSchema.safeParse({ sessionId: searchParams.get('sessionId') || undefined });
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: { message: 'Validation failed', details: parsed.error.flatten().fieldErrors, code: 'VALIDATION_ERROR' } },
        { status: 422 }
      );
    }

    const { sessionId } = parsed.data;

    const items = await prisma.cartItem.findMany({
      where: { sessionId },
      include: { product: true },
    });
    
    return NextResponse.json({ data: { items } }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: 'Failed to fetch cart', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = addToCartSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: { message: 'Validation failed', details: parsed.error.flatten().fieldErrors, code: 'VALIDATION_ERROR' } },
        { status: 422 }
      );
    }

    const { productId, quantity, sessionId } = parsed.data;

    const existing = await prisma.cartItem.findFirst({
      where: { productId, sessionId },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
      return NextResponse.json({ data: { item: updated } }, { status: 200 });
    }

    const newItem = await prisma.cartItem.create({
      data: {
        productId,
        quantity,
        sessionId,
      },
    });

    return NextResponse.json({ data: { item: newItem } }, { status: 201 });
  } catch (error) {
    console.error('CART POST ERROR:', error);
    return NextResponse.json(
      { error: { message: 'Failed to add to cart', code: 'INTERNAL_ERROR', details: String(error) } },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = removeFromCartSchema.safeParse({ id: searchParams.get('id') });
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: { message: 'Validation failed', details: parsed.error.flatten().fieldErrors, code: 'VALIDATION_ERROR' } },
        { status: 422 }
      );
    }

    const { id } = parsed.data;

    await prisma.cartItem.delete({
      where: { id },
    });

    return NextResponse.json({ data: { success: true } }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: 'Failed to remove from cart', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}
