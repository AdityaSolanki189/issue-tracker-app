import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import Link from "next/link";

export default function EditIssueButton({ issueId }: { issueId: number}) {
    return (
        <Button className="gap-2 max-w-40">
            <SquarePen />
            <Link href={`/issues/${issueId}/edit`}>Edit Issue</Link>
        </Button>
    );
}
