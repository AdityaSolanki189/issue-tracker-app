'use client';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Status } from '@prisma/client';
import { useRouter } from 'next/navigation';

const statuses: { label: string; value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
];

const IssueStatusFilter = () => {
    const router = useRouter();

    const handleFilterChange = (status: string) => {
        const query = status === '0' ? '' : `?status=${status}`;
        router.push('/issues/list' + query);
    };

    return (
        <Select onValueChange={handleFilterChange} defaultValue={undefined}>
            <SelectTrigger id="type-select" className="w-[180px]">
                <SelectValue placeholder="Filter by status..." />
            </SelectTrigger>
            <SelectContent>
                {statuses.map((status) => (
                    <SelectItem key={status.value} value={status.value || '0'}>
                        {status.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default IssueStatusFilter;
