'use client';

import { Issue } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import moment from 'moment';

export const columns: ColumnDef<Issue>[] = [
    {
        accessorKey: 'title',
        header: 'Issue',
    },
    {
        header: 'Status',
        cell: ({ row }) => {
            return (
                <div>
                    {row.original.status === 'OPEN' ? (
                        <span>Open</span>
                    ) : row.original.status === 'DONE' ? (
                        <span>Done</span>
                    ) : (
                        <span>In Progress</span>
                    )}
                </div>
            );
        },
    },
    {
        header: 'Created',
        cell: ({ row }) => {
            return (
                <div>
                    {moment(row.original.createdAt).format(
                        'dddd, MMMM Do YYYY'
                    )}
                </div>
            );
        },
    },
];
