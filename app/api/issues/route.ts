import authOptions from '@/app/auth/AuthOptions';
import { issueSchema } from '@/app/FormValidationSchema';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    console.log(body);

    const validated = issueSchema.safeParse(body);

    if (!validated.success) {
        return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description,
        },
    });

    return NextResponse.json(newIssue, { status: 201 });
}
