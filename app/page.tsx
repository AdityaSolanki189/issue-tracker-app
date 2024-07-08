import prisma from '@/prisma/client';
import { IssueChart, IssuesSummary, LatestIssue } from './_components';

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
        // <div className="flex p-4">
        //     {/* <LatestIssue /> */}
        //     {/* <IssuesSummary
        //         open={open}
        //         inProgress={inProgress}
        //         closed={closed}
        //     ></IssuesSummary> */}
        //     <IssueChart
        //         open={open}
        //         inProgress={inProgress}
        //         closed={closed}
        //     ></IssueChart>
        // </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-6">
            <div className='flex flex-col gap-5 items-center'>
                <IssuesSummary
                    open={open}
                    inProgress={inProgress}
                    closed={closed}
                />
                <IssueChart
                    open={open}
                    inProgress={inProgress}
                    closed={closed}
                />
            </div>
            <LatestIssue />
        </div>
    );
}
