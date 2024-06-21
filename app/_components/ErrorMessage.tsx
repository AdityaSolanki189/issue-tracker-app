import React, { PropsWithChildren } from 'react';

export default function ErrorMessage({ children }: PropsWithChildren) {
    return (
        <div className="flex items-center space-x-2 text-red-500">
            {children}
        </div>
    );
}
