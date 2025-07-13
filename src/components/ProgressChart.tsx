'use client';

import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', pushups: 30, squats: 40, burpees: 15 },
  { name: 'Tue', pushups: 20, squats: 30, burpees: 10 },
  { name: 'Wed', pushups: 50, squats: 35, burpees: 25 },
  { name: 'Thu', pushups: 40, squats: 20, burpees: 18 },
  { name: 'Fri', pushups: 60, squats: 45, burpees: 30 },
  { name: 'Sat', pushups: 45, squats: 38, burpees: 22 },
  { name: 'Sun', pushups: 35, squats: 25, burpees: 15 },
];

export default function ProgressChart() {
  return (
    <div className="bg-[#1a1a1a] rounded-2xl p-4 shadow-lg">
      <h2 className="text-lg font-semibold mb-4">Weekly Progress</h2>
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={data}>
          <XAxis dataKey="name" stroke="#888" />
          <Tooltip />
          <Bar dataKey="pushups" stackId="a" fill="#32ffc3" radius={[4, 4, 0, 0]} />
          <Bar dataKey="squats" stackId="a" fill="#22c1c3" radius={[4, 4, 0, 0]} />
          <Bar dataKey="burpees" stackId="a" fill="#0c9b9b" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}