'use client';

import { useState } from 'react';
import DashboardCard from '@/components/DashboardCard';
import ProgressChart from '@/components/ProgressChart';
import LogWorkoutCard from '@/components/LogWorkoutCard';

export default function HomePage() {
  const [workout, setWorkout] = useState({ pushups: 0, squats: 0, burpees: 0 });
  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <DashboardCard />
        <LogWorkoutCard onLog={(data) => setWorkout(data)} />
        <ProgressChart />
      </div>
    </main>
  );
}