'use client';

import { issueSchema } from '@/app/FormValidationSchema';
import { ErrorMessage } from '@/app/_components';
import Spinner from '@/app/_components/spinner';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import SimpleMDE from '../_components/SimpleMDE';

export default function IssueForm({
    header,
    issue,
}: {
    header: string;
    issue?: Issue;
}) {
    const router = useRouter();
    const form = useForm<z.infer<typeof issueSchema>>({
        resolver: zodResolver(issueSchema),
        defaultValues: {
            title: issue?.title || '',
            description: issue?.description || '',
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log(issue);

    const onSubmit = async (data: z.infer<typeof issueSchema>) => {
        try {
            setIsSubmitting(true);

            if (issue) {
                const response = await axios.patch(
                    `/api/issues/${issue.id}`,
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );

                if (response.status !== 200) {
                    toast({
                        variant: 'destructive',
                        title: 'Failed to update issue',
                        description: 'Please try again later.',
                    });

                    throw new Error('Failed to update issue');
                }

                toast({
                    variant: 'success',
                    title: 'Issue Updated Successfully!',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                {JSON.stringify(data, null, 2)}
                            </code>
                        </pre>
                    ),
                });

                router.push('/issues');
            } else {
                const response = await axios.post('/api/issues', data, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status !== 201) {
                    toast({
                        variant: 'destructive',
                        title: 'Failed to create issue',
                        description: 'Please try again later.',
                    });

                    throw new Error('Failed to create issue');
                }

                toast({
                    variant: 'success',
                    title: 'Issue Created Successfully!',
                    description: (
                        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                            <code className="text-white">
                                {JSON.stringify(data, null, 2)}
                            </code>
                        </pre>
                    ),
                });

                router.push('/issues');
            }
        } catch (error: any) {
            setIsSubmitting(false);
            console.log('Error creating issue: ', error.message);

            toast({
                variant: 'destructive',
                title: 'Failed to create issue',
                description: 'Please try again later.',
            });
        }
    };

    return (
        <div className="grid gap-4 p-8">
            <div className="font-bold text-4xl pb-4">
                {issue ? `Edit Issue #${issue.id}` : 'Create New Issue'}
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-w-xl gap-4 grid grid-cols-1"
                >
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem className="">
                                <Label className="text-xl">Title</Label>
                                <FormControl>
                                    <Input
                                        placeholder="Give a title to your issue"
                                        {...field}
                                    />
                                </FormControl>
                                {form.formState.errors.title &&
                                    ErrorMessage({
                                        children:
                                            form.formState.errors.title
                                                ?.message,
                                    })}
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="">
                                <Label className="text-xl">Description</Label>
                                <FormControl>
                                    <SimpleMDE
                                        placeholder="Give a description to your issue"
                                        {...field}
                                    />
                                </FormControl>
                                {form.formState.errors.title &&
                                    ErrorMessage({
                                        children:
                                            form.formState.errors.description
                                                ?.message,
                                    })}
                                <FormDescription>
                                    You can <span>@mention</span> other users
                                    and organizations.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={isSubmitting}>
                        {issue ? 'Update Issue' : 'Submit New Issue'}
                        {isSubmitting && <Spinner />}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
