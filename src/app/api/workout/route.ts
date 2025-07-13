import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import dayjs from 'dayjs';
import { WorkoutType } from '@/generated/prisma';

export async function POST(req: Request) {
  const { userId: clerkId } = await auth();
  if (!clerkId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { pushups, squats, burpees } = body;

  const user = await prisma.user.findUnique({ where: { clerkId } });
  if (!user) return NextResponse.json({ error: 'User not found in DB' }, { status: 404 });

  const todayStart = dayjs().startOf('day').toDate();
  const todayEnd = dayjs().endOf('day').toDate();

  // 1️⃣ Check if there's a workout already for today
  const existingWorkout = await prisma.workout.findFirst({
    where: {
      userId: user.id,
      date: {
        gte: todayStart,
        lte: todayEnd,
      },
    },
  });

  try {
    let workout;

    if (existingWorkout) {
      // 2️⃣ Append to existing workout
      workout = await prisma.workout.update({
        where: { id: existingWorkout.id },
        data: {
          entries: {
            create: [
              ...(pushups ? [{ type: WorkoutType.PUSHUPS, count: pushups }] : []),
              ...(squats ? [{ type: WorkoutType.SQUAT, count: squats }] : []),
              ...(burpees ? [{ type: WorkoutType.BURPEE, count: burpees }] : []),
            ],
          },
        },
        include: { entries: true },
      });
    } else {
      // 3️⃣ Create a new workout
      workout = await prisma.workout.create({
        data: {
          userId: user.id,
          date: new Date(),
          entries: {
            create: [
              ...(pushups ? [{ type: WorkoutType.PUSHUPS, count: pushups }] : []),
              ...(squats ? [{ type: WorkoutType.SQUAT, count: squats }] : []),
              ...(burpees ? [{ type: WorkoutType.BURPEE, count: burpees }] : []),
            ],
          },
        },
        include: { entries: true },
      });
    }

    return NextResponse.json(workout);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save workout' }, { status: 500 });
  }
}