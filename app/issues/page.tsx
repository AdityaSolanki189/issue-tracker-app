'use client';

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
import { Issue } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Issues() {
    const [issues, setIssues] = useState<Issue[]>([]);
    const fetchAllIssues = async () => {
        const issues = await axios.get('/api/issues', {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (issues.status !== 200) {
            ErrorMessage({
                children: 'Failed to fetch issues',
            });
        }

        console.log(issues.data);
        setIssues(issues.data);
    };

    useEffect(() => {
        fetchAllIssues();
    }, []);

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
