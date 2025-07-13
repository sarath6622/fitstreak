// app/api/workout/week/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import dayjs from 'dayjs';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const start = dayjs().subtract(6, 'day').startOf('day').toDate();
  const end = dayjs().endOf('day').toDate();

  const workouts = await prisma.workout.findMany({
    where: {
      user: { clerkId: userId },
      date: { gte: start, lte: end },
    },
    include: { entries: true },
  });

  // Aggregate by day
  const result: Record<string, { name: string; pushups: number; squats: number; burpees: number }> = {};

  for (const workout of workouts) {
    const day = dayjs(workout.date).format('ddd');
    if (!result[day]) result[day] = { name: day, pushups: 0, squats: 0, burpees: 0 };

    for (const entry of workout.entries) {
      if (entry.type === 'PUSHUPS') result[day].pushups += entry.count;
      if (entry.type === 'SQUAT') result[day].squats += entry.count;
      if (entry.type === 'BURPEE') result[day].burpees += entry.count;
    }
  }

  return NextResponse.json(Object.values(result));
}