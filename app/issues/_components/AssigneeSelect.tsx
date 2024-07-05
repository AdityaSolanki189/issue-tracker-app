'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { Issue, User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = useUsers();

    if (isLoading) {
        return <Skeleton />;
    }

    if (error) {
        return null;
    }

    const assignIssue = (userId: string) => {
        axios
            .patch(`/api/issues/${issue.id}`, {
                assignedToUserId: userId,
            })
            .catch(() => {
                toast({
                    title: 'Failed to assign user',
                    description:
                        'Changes could not be saved, Please try again later.',
                    variant: 'destructive',
                });
            });
    };

    return (
        <div className="flex gap-2 flex-col max-w-fit">
            <label htmlFor="type-select">Assigned to</label>
            <Select
                defaultValue={issue.assignedToUserId || '0'}
                onValueChange={assignIssue}
            >
                <SelectTrigger id="type-select" className="w-[180px]">
                    <SelectValue placeholder="Assign to..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Suggestions</SelectLabel>
                        <SelectItem value="0">Unassigned</SelectItem>
                        {users?.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                                {user.name}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

const useUsers = () => {
    return useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then((res) => res.data),
        staleTime: 1000 * 60 * 5,
        retry: 2,
    });
};

export default AssigneeSelect;
