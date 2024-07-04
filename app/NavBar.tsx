'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Bug } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
    return (
        <nav className="flex h-14 items-center pl-8 border-b font-medium justify-between">
            <div className="flex space-x-8">
                <Link href="/">
                    <Bug />
                </Link>
                <NavLinks />
            </div>

            <div className=" ml-auto flex space-x-8 items-center pr-8 ">
                <AuthStatus />
            </div>
        </nav>
    );
}

const NavLinks = () => {
    const pathName = usePathname();

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
    );
};

const AuthStatus = () => {
    const { status, data: session } = useSession();

    if (status === 'loading') {
        return <Skeleton className="w-[70px] h-[40px] rounded-full" />
    }

    if (status === 'unauthenticated') {
        return <Link href="/api/auth/signin">Sign In</Link>;
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <button className="text-slate-500 hover:text-zinc-900 transition-colors">
                    <Avatar>
                        <AvatarImage
                            src={session!.user!.image!}
                            referrerPolicy="no-referrer"
                        />
                        <AvatarFallback>
                            {session!.user!.name![0]}
                        </AvatarFallback>
                    </Avatar>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{session!.user!.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <Link href="/api/auth/signout">Sign Out</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
