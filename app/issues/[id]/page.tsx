import { StatusBadge } from '@/app/_components';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import prisma from '@/prisma/client';
import { SquarePen } from 'lucide-react';
import Link from 'next/link';
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
        <div className="grid gap-6 p-8 w-3/5">
            <div className="flex justify-between items-center">
                <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-4xl">
                    {issue.title}
                </h1>
                <Button className='gap-2'>
                    <SquarePen/>
                    <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
                </Button>
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
    );
}
