'use client';

import { Bug } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Session } from 'inspector';

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
        <nav className="flex h-14 items-center pl-8 border-b font-medium justify-between">
            <div className="flex space-x-8">
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
            </div>

            <div className=" ml-auto flex space-x-8 items-center pr-8 ">
                {status === 'authenticated' ? (
                    <div>
                        {/* <Link href="/api/auth/signout">Sign Out</Link> */}
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <button className="text-slate-500 hover:text-zinc-900 transition-colors">
                                    <Avatar>
                                        <AvatarImage
                                            src={session.user!.image!}
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>{session.user!.email}</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <Link href="/api/auth/signout">
                                        Sign Out
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
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
