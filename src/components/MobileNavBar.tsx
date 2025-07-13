'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Trophy,
    Dumbbell,
    Users,
} from 'lucide-react';

const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/workout', label: 'Workout', icon: Dumbbell },
    { href: '/friends', label: 'Friends', icon: Users },
];

export default function MobileNavBar() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-black border-t border-neutral-800 md:hidden">
            <ul className="flex justify-around items-center h-14">
                {navItems.map(({ href, label, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                        <li key={href}>
                            <Link
                                href={href}
                                className={`flex flex-col items-center text-xs ${isActive ? 'text-[#6c47ff]' : 'text-neutral-400'
                                    }`}
                            >
                                <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
                                <span className="mt-1">{label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}