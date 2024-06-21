'use client';

import { Issue } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';
import { StatusBadge } from './status-badge';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const columns: ColumnDef<Issue>[] = [
    {
        accessorKey: 'title',
        header: 'Issue',
    },
    {
        header: 'Status',
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
                    className="p-0"
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
        }
    },
];
