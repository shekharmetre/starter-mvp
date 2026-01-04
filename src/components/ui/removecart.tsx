'use client';

import { useCartStore } from '@/hooks/useCartStore';

import { Cross, Delete, LucideRemoveFormatting } from 'lucide-react';

type RemoveButtonProps = {
    itemId: string;
    text?: string;
    className?: string;
};

export function RemoveButton({ itemId, text = 'Remove', className = '' }: RemoveButtonProps) {
    const removeItem = useCartStore((s) => s.removeItem);

    return (
        <button
            type='button'
            onClick={() => removeItem(itemId)}
            className={`inline-flex cursor-pointer items-center gap-2 text-2xl font-semibold text-red-500 transition-all duration-200 select-none hover:text-red-600 ${className} `}>
            <span aria-hidden className='text-lg leading-none font-semibold'>
                X
            </span>

            <span className='text-sm'>{text}</span>
        </button>
    );
}
