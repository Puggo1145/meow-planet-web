'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import type { PropsWithChildren } from 'react';

export const ProgressBarProvider: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            {children}
            <ProgressBar
                height="8px"
                color="#f97316"
                options={{ showSpinner: true }}
                shallowRouting
            />
        </>
    );
};
