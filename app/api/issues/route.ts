import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "@/app/FormValidationSchema";

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log(body);

    const validated = createIssueSchema.safeParse(body);

    if(!validated.success) {
        return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    });

    return NextResponse.json(newIssue, { status: 201 });
}
