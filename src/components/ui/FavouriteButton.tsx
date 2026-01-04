'use client';

import { useCartStore } from '@/hooks/useCartStore';

type FavouriteButtonProps = {
    itemId: string;
    text?: string;
    className?: string;
};

export function FavouriteButton({ itemId, text = 'Favourite', className = '' }: FavouriteButtonProps) {
    const toggleFavourite = useCartStore((s) => s.toggleFavourite);

    // derive state directly from store
    const active = useCartStore((s) => s.cart.find((i) => i.id === itemId)?.favourite) ?? false;

    return (
        <button
            type='button'
            onClick={() => toggleFavourite(itemId)}
            className={`inline-flex cursor-pointer items-center gap-2 transition-all duration-200 select-none ${active ? 'scale-105 shadow-md' : ''} ${className} `}
            aria-pressed={active}>
            <span aria-hidden className={`text-lg leading-none transition-transform ${active ? 'scale-110' : ''}`}>
                {active ? '❤️' : '🤍'}
            </span>

            <span className='text-sm font-medium'>{text}</span>
        </button>
    );
}
