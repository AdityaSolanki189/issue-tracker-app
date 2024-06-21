'use client';

import { useRouter } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
} from '@/components/ui/form';
import { set, z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import axios from 'axios';
import { createIssueSchema } from '@/app/FormValidationSchema';
import ErrorMessage from '@/app/_components/ErrorMessage';
import { useState } from 'react';
import Spinner from '@/app/_components/Spinner';

export default function NewIssuePage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof createIssueSchema>>({
        resolver: zodResolver(createIssueSchema),
        defaultValues: {
            title: '',
            description: '',
        },
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (data: z.infer<typeof createIssueSchema>) => {
        try {
            setIsSubmitting(true);
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
        <div className="p-8">
            <div className="font-bold text-4xl pb-8">Create new issue</div>
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
                        Submit New Issue {isSubmitting && <Spinner />}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
