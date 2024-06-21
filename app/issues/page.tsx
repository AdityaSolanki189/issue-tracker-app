'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Issues() {
    return (
        <div className="space-x-8">
            <h1>Issues</h1>
            <p>Welcome to the issues page!</p>
            <Button>
                <Link href="/issues/new">New Issue</Link>
            </Button>
        </div>
    );
}
