import prisma from '@/prisma/client';
import { LatestIssue } from './_components';

export default function Home() {
    
    return (
        <div className='flex p-4'>
            <LatestIssue  />
        </div>
    );
}
