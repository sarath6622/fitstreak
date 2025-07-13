import Link from 'next/link';
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export default function NavBar() {
  return (
<header className="w-full h-16 bg-black dark:bg-black dark:border-neutral-800  px-4 sm:px-8">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        
        {/* Left: Logo / App Name */}
        <Link href="/" className="text-xl font-bold text-[#6c47ff] dark:text-[#6c47ff]">
          FitStreak
        </Link>

        {/* Center: Nav Links */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 dark:text-gray-300">
          <Link href="/" className="hover:text-[#6c47ff]">Dashboard</Link>
          <Link href="/leaderboard" className="hover:text-[#6c47ff]">Leaderboard</Link>
          <Link href="/workout" className="hover:text-[#6c47ff]">Log Workout</Link>
          <Link href="/friends" className="hover:text-[#6c47ff]">Friends</Link>
        </nav>

        {/* Right: Auth / User */}
        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-[#6c47ff] transition">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-[#6c47ff] text-white text-sm font-semibold px-4 py-2 rounded-full hover:bg-[#5a39e0] transition">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}