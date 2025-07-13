export default function DashboardCard() {
    return (
      <div className="bg-[#1a1a1a] rounded-2xl p-6 shadow-lg space-y-4">
        <h2 className="text-lg font-semibold">Today's Workout</h2>
        <div className="grid grid-cols-3 text-center gap-4">
          <div>
            <p className="text-sm text-gray-400">Pushups</p>
            <p className="text-2xl font-bold text-[#32ffc3]">50</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Squats</p>
            <p className="text-2xl font-bold text-[#32ffc3]">40</p>
          </div>
          <div>
            <p className="text-sm text-gray-400">Burpees</p>
            <p className="text-2xl font-bold text-[#32ffc3]">30</p>
          </div>
        </div>
        <button className="w-full mt-4 bg-gradient-to-r from-[#32ffc3] to-[#22c1c3] px-4 py-2 rounded-lg font-semibold">
          + Log Workout
        </button>
      </div>
    );
  }