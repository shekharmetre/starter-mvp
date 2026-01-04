'use client';

import { Star } from 'lucide-react';

type StarRatingProps = {
    rating: number;
    max?: number;
};

function FullStar() {
    return <Star size={12} className='text-yellow-400' fill='currentColor' />;
}

function EmptyStar() {
    return <Star size={12} className='text-gray-300' fill='none' />;
}

function PartialStar({ percent }: { percent: number }) {
    return (
        <span className='relative inline-block h-4 w-4'>
            {/* Empty star */}
            <Star size={12} className='absolute inset-0 text-gray-300' fill='none' />

            {/* Filled portion */}
            <span className='absolute inset-0 overflow-hidden' style={{ width: `${percent}%` }}>
                <Star size={12} className='text-yellow-400' fill='currentColor' />
            </span>
        </span>
    );
}

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
    const fullStars = Math.floor(rating);
    const partial = rating - fullStars;

    return (
        <span className='inline-flex items-center gap-1'>
            {Array.from({ length: max }).map((_, index) => {
                if (index < fullStars) {
                    return <FullStar key={index} />;
                }

                if (index === fullStars && partial > 0) {
                    return <PartialStar key={index} percent={partial * 100} />;
                }

                return <EmptyStar key={index} />;
            })}
        </span>
    );
}
