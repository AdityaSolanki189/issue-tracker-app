import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';

interface Props {
    params: {
        id: string;
    };
}

export default async function IssueDetailsPage({ params }: Props) {
    if (typeof params.id !== 'number') {
        notFound();
    }
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
        <div className=" grid gap-4 p-8 ">
            <h1>{issue.title}</h1>
            <p>{issue.description}</p>
            <p>{issue.status}</p>
            <p>{issue.createdAt.toDateString()}</p>
        </div>
    );
}
