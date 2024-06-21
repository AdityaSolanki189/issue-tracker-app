'use client';

import { Button } from '@/components/ui/button';
import { Issue } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { set } from 'zod';
import { DataTable } from '../_components/data-table';
import { columns } from '../_components/columns';

export default function Issues() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const fetchAllIssues = async () => {
        const issues = await axios.get('/api/issues', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (issues.status !== 200) {
            throw new Error('Failed to fetch issues');
        }

        console.log(issues.data);
        setIssues(issues.data);
    };

    useEffect(() => {
        fetchAllIssues();
    }, []);

    return (
        <div className="grid gap-4 p-8">
            <div>
                <Button>
                    <Link href="/issues/new">New Issue</Link>
                </Button>
            </div>
            <div className="w-2/3 h-14">
                <DataTable columns={columns} data={issues} />
            </div>
        </div>
    );
}
