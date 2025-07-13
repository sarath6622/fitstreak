'use server';

import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export async function syncUserToDatabase() {
  try {
    const clerkUser = await currentUser();
    console.log("Clerk User:", clerkUser);
    if (!clerkUser) {
      return { error: 'Unauthorized - No Clerk user' };
    }

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
  } catch (error) {
    console.error('User sync failed:', error);
    return { error: 'Failed to sync user' };
  }
}