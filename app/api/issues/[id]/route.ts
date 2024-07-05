import authOptions from '@/app/auth/AuthOptions';
import { patchIssueSchema } from '@/app/FormValidationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log(body);

    const validated = patchIssueSchema.safeParse(body);

    if (!validated.success) {
        return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const { assignedToUserId, title, description } = body;

    if (assignedToUserId) {
        const user = prisma.user.findUnique({
            where: {
                id: assignedToUserId,
            },
        });
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 400 }
            );
        }
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) {
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    const updatedIssue = await prisma.issue.update({
        where: {
            id: parseInt(params.id),
        },
        data: {
            title,
            description,
            assignedToUserId,
        },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id),
        },
    });

    if (!issue) {
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
    }

    await prisma.issue.delete({
        where: {
            id: issue.id,
        },
    });

    return NextResponse.json({ message: 'Issue deleted' }, { status: 200 });
}
