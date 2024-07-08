import {
    Table,
    TableBody,
    TableCaption,
    TableRow,
} from '@/components/ui/table';
import { Issue } from '@prisma/client';
import Link from 'next/link';
import StatusBadge from './status-badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import prisma from '@/prisma/client';
import { Card } from '@/components/ui/card';

export default async function LatestIssue() {
    const issues = await prisma.issue.findMany({
        orderBy: {
            createdAt: 'desc',
        },
        take: 5,
        include: {
            assignedToUser: true,
        },
    });
    return (
        <Card className="flex p-4 w-full">
            <Table className="flex flex-col gap-2 w-full">
                <div className="font-semibold text-lg">Latest Issues</div>
                <TableBody className="flex flex-col gap-3">
                    {issues.map((issue) => (
                        <TableRow key={issue.id}>
                            <div className="flex justify-between items-center p-2">
                                <div className="flex flex-col gap-2 items-start">
                                    <Link href={`/issues/${issue.id}`}>
                                        {issue.title}
                                    </Link>
                                    <StatusBadge status={issue.status} />
                                </div>
                                {issue.assignedToUser && (
                                    <Avatar>
                                        <AvatarImage
                                            src={issue.assignedToUser.image!}
                                            referrerPolicy="no-referrer"
                                        />
                                        <AvatarFallback>
                                            {issue.assignedToUser.name![0]}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                            </div>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}
