'use client';

import { Bug } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function NavBar() {
    const pathName = usePathname();
    const { status, data: session } = useSession();

    const Links = [
        {
            href: '/',
            label: 'Dashboard',
        },
        {
            href: '/issues/list',
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
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className={`${
                                pathName === link.href
                                    ? 'text-slate-900 font-semibold underline'
                                    : 'text-slate-500'
                            } hover:text-zinc-900 transition-colors`}
                        >
                            {link.label}
                        </Link>
                    </li>
                ))}
            </ul>

            <div
                className="
                ml-auto
                flex
                space-x-8
                items-center
                pr-8
            "
            >
                {status === 'authenticated' ? (
                    <div>
                        <Link href="/api/auth/signout">Sign Out</Link>
                    </div>
                ) : (
                    <div>
                        <Link href="/api/auth/signin">Sign In</Link>
                    </div>
                )}
            </div>
        </nav>
    );
}
