'use client';

import { useState } from 'react';

type CategorySelectorProps = {
    onSelect: (category: string) => void;
    className?: string;
};

const categories = [
    'All',
    'Chargers',
    'Glasses',
    'Covers',
    'Earphones',
    'Power Banks',
    'Cables',
    'Adapters',
    'Speakers'
];

export function CategorySelector({ onSelect, className = '' }: CategorySelectorProps) {
    const [active, setActive] = useState('All');

    const handleSelect = (category: string) => {
        setActive(category);
        onSelect(category); // ✅ send to parent
    };

    return (
        <div className={`w-40 overflow-y-auto rounded-lg p-2 ${className} `}>
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleSelect(category)}
                    className={`mb-1 w-full rounded-2xl px-3 text-left text-xs transition-colors duration-400 ${
                        active === category ? 'bg-black text-white' : 'bg-[#D9D9D9] text-gray-800 hover:bg-black/10'
                    } `}>
                    {category}
                </button>
            ))}
        </div>
    );
}
