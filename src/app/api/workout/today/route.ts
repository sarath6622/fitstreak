// GET today's workout for the logged-in user
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import { startOfDay, endOfDay } from 'date-fns';

export async function GET() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const today = new Date();
  const workout = await prisma.workout.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: startOfDay(today),
        lte: endOfDay(today),
      },
    },
    include: {
      entries: true,
    },
  });

  const counts = {
    pushups: 0,
    squats: 0,
    burpees: 0,
  };

  workout?.entries.forEach((entry) => {
    if (entry.type === 'PUSHUPS') counts.pushups += entry.count;
    if (entry.type === 'SQUAT') counts.squats += entry.count;
    if (entry.type === 'BURPEE') counts.burpees += entry.count;
  });

  return NextResponse.json(counts);
}