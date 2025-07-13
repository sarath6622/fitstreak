import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  const { userId: clerkId } = await auth(); // this is Clerk's user ID
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { pushups, squats, burpees } = body;

  // 🔍 Lookup internal DB user by Clerk ID
  const user = await prisma.user.findUnique({
    where: { clerkId }
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found in DB' }, { status: 404 });
  }

  try {
    const workout = await prisma.workout.create({
      data: {
        userId: user.id, // ✅ Use internal user ID
        entries: {
          create: [
            { type: 'PUSHUPS', count: pushups },
            { type: 'SQUAT', count: squats },
            { type: 'BURPEE', count: burpees },
          ],
        },
      },
      include: {
        entries: true,
      },
    });

    return NextResponse.json(workout);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save workout' }, { status: 500 });
  }
}