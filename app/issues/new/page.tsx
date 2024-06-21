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
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import axios from 'axios';

const FormSchema = z.object({
    title: z
        .string()
        .min(4, {
            message: 'Title must be at least 4 characters.',
        })
        .max(100, {
            message: 'Bio must not be longer than 100 characters.',
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

export default function NewIssuePage() {
    const router = useRouter();
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    });

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        try {
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

            form.reset();
        } catch (error: any) {
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
                                <FormDescription>
                                    You can <span>@mention</span> other users
                                    and organizations.
                                </FormDescription>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit New Issue</Button>
                </form>
            </Form>
        </div>
    );
}
