'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';

export default function DashboardCard() {
  const [data, setData] = useState({ pushups: 0, squats: 0, burpees: 0 });

  useEffect(() => {
    const fetchWorkout = async () => {
      const res = await fetch('/api/workout/today');
      if (res.ok) {
        const result = await res.json();
        setData(result);
      }
    };
    fetchWorkout();
  }, []);

  return (
    <Card className="bg-[#1a1a1a] text-white shadow-xl w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-xl font-semibold">Today's Workout</h2>
      </CardHeader>
      <CardContent className="grid grid-cols-3 text-center gap-4">
        <div>
          <p className="text-sm text-gray-400">Pushups</p>
          <p className="text-2xl font-bold text-[#32ffc3]">{data.pushups}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Squats</p>
          <p className="text-2xl font-bold text-[#32ffc3]">{data.squats}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Burpees</p>
          <p className="text-2xl font-bold text-[#32ffc3]">{data.burpees}</p>
        </div>
      </CardContent>
    </Card>
  );
}