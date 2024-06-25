'use client';

import { Bug } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    const pathName = usePathname();
    const Links = [
        {
            href: '/',
            label: 'Dashboard',
        },
        {
            href: '/issues',
            label: 'Issues',
        },
    ];

    return (
        <nav className="flex space-x-8 h-14 items-center pl-8 border-b font-medium">
            <Link href="/">
                <Bug />
            </Link>
            <ul className="flex space-x-8 ">
                {Links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`${
                            pathName === link.href
                                ? 'text-slate-900 font-semibold underline'
                                : 'text-slate-500'
                        } hover:text-zinc-900 transition-colors`}
                    >
                        {link.label}
                    </Link>
                ))}
            </ul>
        </nav>
    );
}
