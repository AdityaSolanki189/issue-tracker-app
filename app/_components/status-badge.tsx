import { Badge } from '@/components/ui/badge';
import { Status } from '@prisma/client';

const statusMap: Record<Status, { label: string; color: string }> = {
    OPEN: { label: 'Open', color: 'text-red-500 bg-red-100' },
    CLOSED: { label: 'Closed', color: 'text-green-500 bg-green-100' },
    IN_PROGRESS: { label: 'In Progress', color: 'text-purple-500 bg-purple-100' },
};

export function StatusBadge({ status }: { status: Status }) {
    return (
        <Badge variant={'outline'} className={`${statusMap[status].color}`}>
            {statusMap[status].label}
        </Badge>
    );
}
