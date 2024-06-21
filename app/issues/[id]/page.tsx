import { StatusBadge } from '@/app/_components';
import { Card } from '@/components/ui/card';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

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
        <div className=" grid gap-6 p-8 w-2/3">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                {issue.title}
            </h1>
            <div className="flex space-x-6">
                <StatusBadge status={issue.status} />
                <h2>
                    #{issue.id} created at {issue.createdAt.toDateString()}.
                </h2>
            </div>
            <Card className="p-8 prose">
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    );
}
