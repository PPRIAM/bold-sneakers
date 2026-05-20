import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const checkoutSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  total: z.number().positive('Total must be positive'),
  sessionId: z.string().default('default-session'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    
    if (!parsed.success) {
      return NextResponse.json(
        { error: { message: 'Validation failed', details: parsed.error.flatten().fieldErrors, code: 'VALIDATION_ERROR' } },
        { status: 422 }
      );
    }

    const { userId, total, sessionId } = parsed.data;

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: 'paid', // mock instant payment
      },
    });

    await prisma.cartItem.deleteMany({
      where: { sessionId },
    });

    return NextResponse.json({ data: { success: true, order } }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: 'Checkout failed', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}
