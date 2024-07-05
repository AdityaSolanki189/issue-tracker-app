import { z } from 'zod';

export const issueSchema = z.object({
    title: z
        .string()
        .min(4, {
            message: 'Title must be at least 4 characters.',
        })
        .max(100, {
            message: 'Title must not be longer than 100 characters.',
        }),
    description: z
        .string()
        .min(4, {
            message: 'Description must be at least 4 characters.',
        })
        .max(1000, {
            message: 'Description must not be longer than 1000 characters.',
        }),
});

export const patchIssueSchema = z.object({
    title: z
        .string()
        .min(4, {
            message: 'Title must be at least 4 characters.',
        })
        .max(100, {
            message: 'Title must not be longer than 100 characters.',
        })
        .optional(),
    description: z
        .string()
        .min(4, {
            message: 'Description must be at least 4 characters.',
        })
        .max(1000, {
            message: 'Description must not be longer than 1000 characters.',
        })
        .optional(),
    assignedToUserId: z
        .string()
        .min(1, {
            message: 'AssignedToUserId is required.',
        })
        .max(255)
        .optional()
        .nullable(),
});
