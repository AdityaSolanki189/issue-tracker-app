import { issueSchema } from '@/app/FormValidationSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
    params: {
        id: string;
    };
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    const body = await request.json();
    console.log(body);

    const validated = issueSchema.safeParse(body);

    if (!validated.success) {
        return NextResponse.json({ error: validated.error }, { status: 400 });
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
            title: body.title,
            description: body.description,
        },
    });

    return NextResponse.json(updatedIssue, { status: 200 });
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
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
