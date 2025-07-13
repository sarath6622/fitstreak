// components/UserSync.tsx
'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, startTransition } from 'react';
import { syncUserToDatabase } from '@/actions/user.action';

export default function UserSync() {
  const { isSignedIn } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      startTransition(() => {
        syncUserToDatabase();
      });
    }
  }, [isSignedIn]);

  return null;
}