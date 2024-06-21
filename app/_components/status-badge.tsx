import { Badge } from '@/components/ui/badge';
import { Status } from '@prisma/client';

const statusMap: Record<Status, { label: string; color: string }> = {
    OPEN: { label: 'Open', color: 'text-red-500' },
    DONE: { label: 'Done', color: 'text-green-500' },
    IN_PROGRESS: { label: 'In Progress', color: 'text-yellow-500' },
};

export function StatusBadge({ status }: { status: Status }) {
    return (
        <Badge variant={'outline'} className={`${statusMap[status].color}`}>
            {statusMap[status].label}
        </Badge>
    );
}
