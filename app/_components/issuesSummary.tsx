import { Card } from '@/components/ui/card';
import { Status } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
    open: number;
    inProgress: number;
    closed: number;
}

export default function IssuesSummary({ open, inProgress, closed }: Props) {
    const containers: {
        label: string;
        value: number;
        status: Status;
    }[] = [
        {
            label: 'Open Issues',
            value: open,
            status: 'OPEN',
        },
        {
            label: 'In-Progress Issues',
            value: inProgress,
            status: 'IN_PROGRESS',
        },
        {
            label: 'Closed Issues',
            value: closed,
            status: 'CLOSED',
        },
    ];

    return (
        <div>
            <h1>Issues Summary Report</h1>
            <div className='flex gap-4 mt-4'>
                {containers.map((container) => (
                    <Card className='flex flex-col gap-2 p-4 items-center' key={container.status}>
                        <Link href={`/issues/list?status=${container.status}`}>{container.label}</Link>
                        <div className='text-xl font-extrabold'>{container.value}</div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
