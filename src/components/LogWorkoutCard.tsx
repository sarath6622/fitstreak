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
import { toast } from 'sonner'; // ✅ using sonner
import { cn } from '@/lib/utils';

interface Props {
  onLog: (data: { pushups: number; squats: number; burpees: number }) => void;
}

export default function LogWorkoutCard({ onLog }: Props) {
  const [open, setOpen] = useState(false); // ✅ to control modal state
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
      toast.success('Workout logged successfully! 💪');
      onLog(data);
      setOpen(false); // ✅ close modal
      setPushups(0);
      setSquats(0);
      setBurpees(0);
    } else {
      toast.error('Failed to log workout');
    }
  };

  const renderDropdown = (
    label: string,
    value: number,
    onChange: (val: number) => void
  ) => (
    <div className="space-y-1 w-full">
      <Label className="text-sm">{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(+e.target.value)}
        className={cn(
          'bg-neutral-900 border border-neutral-700 text-white text-sm rounded-md p-2 w-full',
          'focus:outline-none focus:ring-2 focus:ring-[#32ffc3]'
        )}
      >
        {Array.from({ length: 101 }, (_, i) => (
          <option key={i} value={i}>
            {i}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-[#32ffc3] to-[#22c1c3] text-black font-bold w-full">
          + Log Workout
        </Button>
      </DialogTrigger>

      <DialogContent
        className="bg-[#1a1a1a] text-white backdrop-blur-md sm:max-w-[90%] max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle className="text-xl">Log Workout</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-2">
          {renderDropdown('Pushups', pushups, setPushups)}
          {renderDropdown('Squats', squats, setSquats)}
          {renderDropdown('Burpees', burpees, setBurpees)}
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