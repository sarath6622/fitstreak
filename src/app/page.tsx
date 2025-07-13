import DashboardCard from '@/components/DashboardCard';
import ProgressChart from '@/components/ProgressChart';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Welcome back 👋</h1>
        <DashboardCard />
        <ProgressChart />
      </div>
    </main>
  );
}