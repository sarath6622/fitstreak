'use client';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface Props {
  onLog: (data: { pushups: number; squats: number; burpees: number }) => void;
}

export default function LogWorkoutCard({ onLog }: Props) {
  const [pushups, setPushups] = useState(0);
  const [squats, setSquats] = useState(0);
  const [burpees, setBurpees] = useState(0);

  const handleSubmit = async () => {
    const data = { pushups, squats, burpees };

    const res = await fetch('/api/workout', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      onLog(data);
      setPushups(0);
      setSquats(0);
      setBurpees(0);
    } else {
      console.error('Failed to save workout');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[#32ffc3] to-[#22c1c3] text-black font-bold w-full">
          + Log Workout
        </Button>
      </DialogTrigger>

      <DialogContent className="bg-[#1a1a1a] text-white">
        <DialogHeader>
          <DialogTitle className="text-xl">Log Workout</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Pushups</Label>
            <select
              value={pushups}
              onChange={(e) => setPushups(+e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded-md p-2"
            >
              {Array.from({ length: 101 }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Squats</Label>
            <select
              value={squats}
              onChange={(e) => setSquats(+e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded-md p-2"
            >
              {Array.from({ length: 101 }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Burpees</Label>
            <select
              value={burpees}
              onChange={(e) => setBurpees(+e.target.value)}
              className="bg-neutral-900 border border-neutral-700 rounded-md p-2"
            >
              {Array.from({ length: 101 }, (_, i) => (
                <option key={i} value={i}>{i}</option>
              ))}
            </select>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="w-full mt-4 bg-gradient-to-r from-[#32ffc3] to-[#22c1c3] text-black font-bold"
          >
            Save Workout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}