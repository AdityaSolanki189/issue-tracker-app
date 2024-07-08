import prisma from '@/prisma/client';
import { IssuesSummary, LatestIssue } from './_components';

export default async function Home() {
    const open = await prisma.issue.count({
        where: {
            status: 'OPEN',
        },
    });
    const inProgress = await prisma.issue.count({
        where: {
            status: 'IN_PROGRESS',
        },
    });
    const closed = await prisma.issue.count({
        where: {
            status: 'CLOSED',
        },
    });

    return (
        <div className="flex p-4">
            <LatestIssue />
            <IssuesSummary
                open={open}
                inProgress={inProgress}
                closed={closed}
            ></IssuesSummary>
        </div>
    );
}
