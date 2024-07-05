'use client';

import { Button } from '@/components/ui/button';
import { Issue } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import moment from 'moment';
import Link from 'next/link';
import StatusBadge from './status-badge';

export const columns: ColumnDef<Issue>[] = [
    {
        accessorKey: 'title',
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-grey-200"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Issue
                    <ArrowUpDown className="hidden ml-2 h-4 w-4 hover:visible" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <Link href={`/issues/${row.original.id}`}>
                    {row.original.title}
                </Link>
            );
        },
    },
    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-grey-200"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Status
                    <ArrowUpDown className="hidden ml-2 h-4 w-4 hover:visible" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return StatusBadge({
                status: row.original.status,
            });
        },
    },
    {
        accessorKey: 'createdAt',
        header: ({ column }) => {
            return (
                <Button
                    className="p-0 hover:bg-grey-200"
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === 'asc')
                    }
                >
                    Created
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return moment(row.original.createdAt).fromNow();
        },
    },
];

export default columns;
