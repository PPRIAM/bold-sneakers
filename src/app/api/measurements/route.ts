import { NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const getProfileSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
});

const saveProfileSchema = z.object({
  userId: z.string().min(1, 'User ID is required'),
  leftLength: z.number().positive().optional(),
  leftWidth: z.number().positive().optional(),
  rightLength: z.number().positive().optional(),
  rightWidth: z.number().positive().optional(),
  sizeRec: z.string().optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = getProfileSchema.safeParse({ userId: searchParams.get('userId') });

    if (!parsed.success) {
      return NextResponse.json(
        { error: { message: 'Validation failed', details: parsed.error.flatten().fieldErrors, code: 'VALIDATION_ERROR' } },
        { status: 422 }
      );
    }

    const { userId } = parsed.data;

    const profile = await prisma.measurementProfile.findUnique({
      where: { userId },
    });

    return NextResponse.json({ data: { profile } }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: 'Failed to fetch profile', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = saveProfileSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: { message: 'Validation failed', details: parsed.error.flatten().fieldErrors, code: 'VALIDATION_ERROR' } },
        { status: 422 }
      );
    }

    const { userId, leftLength, leftWidth, rightLength, rightWidth, sizeRec } = parsed.data;

    const profile = await prisma.measurementProfile.upsert({
      where: { userId },
      update: { leftLength, leftWidth, rightLength, rightWidth, sizeRec },
      create: { userId, leftLength, leftWidth, rightLength, rightWidth, sizeRec },
    });

    return NextResponse.json({ data: { success: true, profile } }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: 'Failed to save profile', code: 'INTERNAL_ERROR' } },
      { status: 500 }
    );
  }
}
