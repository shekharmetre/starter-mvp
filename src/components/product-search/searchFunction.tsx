'use client';

import { useMemo, useState } from 'react';

import { Mic, Search } from 'lucide-react';

type SearchSelectProps<T> = {
    data: T[];
    labelKey: keyof T;
    placeholder?: string;
    onQueryChange: (value: string) => void; // ✅ realtime
    onSelect?: (item: T) => void; // ✅ optional
    className?: string;
};

export function SearchSelect<T>({
    data,
    labelKey,
    placeholder = 'Search...',
    onQueryChange,
    onSelect,
    className = ''
}: SearchSelectProps<T>) {
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);

    const filtered = useMemo(() => {
        if (!query.trim()) return [];

        return data.filter((item) => String(item[labelKey]).toLowerCase().includes(query.toLowerCase()));
    }, [query, data, labelKey]);

    const handleChange = (value: string) => {
        setQuery(value);
        onQueryChange(value); // ✅ SEND TO PARENT
        setOpen(true);
    };

    const handleSelect = (item: T) => {
        const value = String(item[labelKey]);
        setQuery(value); // ✅ autofill ONLY here
        onSelect?.(item); // ✅ send full object
        setOpen(false);
    };

    return (
        <div className={`relative w-[320px] ${className}`}>
            {/* Input */}
            <div className='relative'>
                <Search size={16} className='absolute top-1/2 left-2 -translate-y-1/2 text-gray-400' />

                <input
                    type='text'
                    value={query}
                    placeholder={placeholder}
                    onChange={(e) => handleChange(e.target.value)}
                    onFocus={() => setOpen(true)}
                    className='w-full rounded-2xl border border-gray-300 bg-white p-3 pr-10 pl-8 text-sm'
                />

                <div className='absolute top-1/2 right-2 -translate-y-1/2 rounded-full bg-slate-200 p-2'>
                    <Mic size={16} className='text-slate-700' />
                </div>
            </div>

            {/* Dropdown (OPTIONAL UX) */}
            {/* {open && filtered.length > 0 && (
                <ul className='absolute z-50 mt-1 max-h-48 w-full overflow-auto rounded-md border bg-white shadow'>
                    {filtered.map((item, index) => (
                        <li
                            key={index}
                            onClick={() => handleSelect(item)}
                            className='cursor-pointer px-3 py-2 text-sm hover:bg-gray-100'>
                            {String(item[labelKey])}
                        </li>
                    ))}
                </ul>
            )} */}
        </div>
    );
}
