// src/actions/user.action.ts
'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function syncUserToDatabase() {
  const clerkUser = await currentUser();

  if (!clerkUser) return { error: 'Unauthorized' };

  const existingUser = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        name: clerkUser.firstName ?? '',
      },
    });
  }

  return { success: true };
}