'use client';

import { Spinner } from '@/app/_components';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState(false);
    const [error, setError] = useState(false);

    const deleteIssue = async () => {
        try {
            throw new Error('This is a test error');
            setIsDeleting(true);
            await axios.delete('/api/issues/' + issueId);
            router.push('/issues');
            router.refresh();
        } catch (error) {
            setIsDeleting(false);
            setError(true);
            console.error(error);
        }
    };

    return (
        <Button
            className="gap-2 max-w-40 bg-destructive hover:bg-destructive"
            disabled={isDeleting}
        >
            <Trash2 />
            {isDeleting ? (
                <Spinner />
            ) : (
                <>
                    <AlertDialog>
                        <AlertDialogTrigger>Delete Issue</AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your issue and remove
                                    your data from our servers.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-destructive hover:bg-destructive"
                                    onClick={deleteIssue}
                                >
                                    Delete Issue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    <AlertDialog open={error}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    An error occurred
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    There was an error deleting your issue. Please
                                    try again later.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogAction
                                    className="bg-destructive hover:bg-destructive"
                                    onClick={() => setError(false)}
                                >
                                    Ok
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </>
            )}
        </Button>
    );
};

export default DeleteIssueButton;
