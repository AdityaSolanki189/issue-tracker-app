import { StatusBadge } from '@/app/_components';
import { Card } from '@/components/ui/card';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import DeleteIssueButton from '../_components/DeleteIssueButton';
import EditIssueButton from '../_components/EditIssueButton';

interface Props {
    params: {
        id: string;
    };
}

export default async function IssueDetailsPage({ params }: Props) {
    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) {
        notFound();
    }

    return (
        // TODO: Add a loading page for when the issue is being fetched
        <div className="grid gap-6 p-8 w-3/4 grid-flow-col">
            <div className="grid gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
                        {issue.title}
                    </h1>
                </div>
                <div className="box flex space-x-6">
                    <StatusBadge status={issue.status} />
                    <h2>
                        #{issue.id} created at {issue.createdAt.toDateString()}.
                    </h2>
                </div>
                <Card className="p-4 prose min-w-full">
                    <ReactMarkdown>{issue.description}</ReactMarkdown>
                </Card>
            </div>
            <div>
                <div className="flex justify-center flex-col gap-2">
                    <EditIssueButton issueId={issue.id} />
                    <DeleteIssueButton issueId={issue.id} />
                </div>
            </div>
        </div>
    );
}
