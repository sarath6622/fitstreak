'use client';

import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { useEffect, useState } from 'react';

interface WorkoutMetric {
  type: string;
  count: number;
}

export default function TodayRadarChart() {
  const [data, setData] = useState<WorkoutMetric[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/workout/today');
      const result = await res.json();

      const formatted: WorkoutMetric[] = [
        { type: 'Pushups', count: result.pushups || 0 },
        { type: 'Squats', count: result.squats || 0 },
        { type: 'Burpees', count: result.burpees || 0 },
      ];

      setData(formatted);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-[#1a1a1a] text-white p-4 rounded-2xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-semibold mb-4 text-center">Today’s Workout Radar</h2>
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart outerRadius={90} data={data}>
          <PolarGrid stroke="#444" />
          <PolarAngleAxis dataKey="type" stroke="#ccc" />
          <PolarRadiusAxis angle={30} stroke="#666" />
          <Radar
            name="Workout"
            dataKey="count"
            stroke="#32ffc3"
            fill="#32ffc3"
            fillOpacity={0.6}
          />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}