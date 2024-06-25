import React, { forwardRef } from 'react';
import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
    ssr: false,
});

const SimpleMDEWrapper = forwardRef<HTMLDivElement, any>(function SimpleMDEWrapper(props, ref) {
    return <SimpleMDE {...props} ref={ref} />;
});

SimpleMDEWrapper.displayName = 'SimpleMDEWrapper';

export default SimpleMDEWrapper;
