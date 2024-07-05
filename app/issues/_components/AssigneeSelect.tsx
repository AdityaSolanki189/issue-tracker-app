'use client';
import React, { useEffect, useState } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { User } from '@prisma/client';
import axios from 'axios';

const AssigneeSelect = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get<User[]>('/api/users');
            setUsers(response.data);
        };

        fetchUsers();
    }, []);

    return (
        <div className="flex gap-2 flex-col max-w-fit">
            <Select>
                <SelectTrigger id="type-select" className="w-[180px]">
                    <SelectValue placeholder="Assign to..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Suggestions</SelectLabel>
                        {users.map((user) => (
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

export default AssigneeSelect;
