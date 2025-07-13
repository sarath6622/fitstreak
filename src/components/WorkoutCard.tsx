export default function WorkoutCard() {
    return (
      <div className="p-4 bg-white shadow rounded-xl">
        <h3 className="text-lg font-medium mb-2">Today's Workout</h3>
        <p>Pushups: 50</p>
        <p>Squats: 30</p>
        <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          + Log New Workout
        </button>
      </div>
    );
  }