import { columns, DataTable, ErrorMessage } from '@/app/_components';
import { Button } from '@/components/ui/button';
import prisma from '@/prisma/client';
import { Status } from '@prisma/client';
import Link from 'next/link';
import IssueStatusFilter from '../_components/IssueStatusFilter';

export default async function Issues({
    searchParams,
}: {
    searchParams: { status: Status };
}) {
    const statuses = Object.values(Status);
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined;
    const issues = await prisma.issue.findMany({
        where: { status },
    });

    if (!issues) {
        ErrorMessage({
            children: 'Failed to fetch issues',
        });
    }

    return (
        <div className="grid gap-4 p-8">
            <div className="w-full md:w-2/3 flex justify-between">
                <div className="flex gap-2 items-center">
                    <IssueStatusFilter />
                </div>
                <Button>
                    <Link href="/issues/new">New Issue</Link>
                </Button>
            </div>
            <div className="w-full md:w-2/3 h-14">
                {/* TODO: add skeletons to the data table */}
                <DataTable columns={columns} data={issues} />
            </div>
        </div>
    );
}
