import { columns, DataTable, ErrorMessage } from '@/app/_components';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import prisma from '@/prisma/client';
import Link from 'next/link';

export default async function Issues() {
    const issues = await prisma.issue.findMany();

    if (!issues) {
        ErrorMessage({
            children: 'Failed to fetch issues',
        });
    }

    return (
        <div className="grid gap-4 p-8">
            <div className="w-2/3 flex justify-between">
                <Button>
                    <Link href="/issues/new">New Issue</Link>
                </Button>

                <div className="flex gap-2 items-center">
                    <Label htmlFor="type-select">Status Filter</Label>
                    <Select>
                        <SelectTrigger id="type-select" className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ALL">All</SelectItem>
                            <SelectItem value="OPEN">Open</SelectItem>
                            <SelectItem value="IN_PROGRESS">
                                In Progress
                            </SelectItem>
                            <SelectItem value="CLOSED">Closed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="w-2/3 h-14">
                {/* TODO: add skeletons to the data table */}
                <DataTable columns={columns} data={issues} />
            </div>
        </div>
    );
}
