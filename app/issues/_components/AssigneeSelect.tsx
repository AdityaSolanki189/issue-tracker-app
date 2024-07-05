'use client';
import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectGroup,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const AssigneeSelect = () => {
    return (
        <div className="flex gap-2 flex-col max-w-fit">
            <Select>
                <SelectTrigger id="type-select" className="w-[180px]">
                    <SelectValue placeholder="Assign to..." />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Suggestions</SelectLabel>
                        <SelectItem value="1">Aditya Solanki</SelectItem>
                        <SelectItem value="2">Rohit</SelectItem>
                        <SelectItem value="3">Preksha</SelectItem>
                        <SelectItem value="4">Santosh</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default AssigneeSelect;
