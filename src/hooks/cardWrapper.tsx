'use client';

import { ReactNode } from 'react';

export function HorizontalScrollOne({ children }: { children: ReactNode }) {
    return (
        <div className='w-full overflow-x-auto overflow-y-hidden'>
            <div className='flex gap-1 py-2 *:w-[60%] *:shrink-0'>{children}</div>
        </div>
    );
}

export function HorizontalScrollTwo({ children, classNames }: { children: ReactNode; classNames?: string }) {
    return (
        <div className={`${classNames} w-full overflow-x-auto`}>
            <div className='flex gap-2 *:w-[45%] *:shrink-0'>{children}</div>
        </div>
    );
}
