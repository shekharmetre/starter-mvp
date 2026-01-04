'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import { SelectOption } from '@/lib/types';

import { Check, ChevronDown, Plus, RefreshCcw, Search } from 'lucide-react';

type Props = {
    options: SelectOption[];
    value: SelectOption | null;
    onSelect: (option: SelectOption) => void;
    onCreate?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;

    showSearch?: boolean;
    showChevron?: boolean;
    showRefresh?: boolean;

    onReset?: () => void;

    /* 🎨 Styling overrides (SAFE) */
    wrapperClassName?: string;
    inputClassName?: string;
    dropdownClassName?: string;
    optionClassName?: string;
    createOptionClassName?: string;

    /* 📍 Position overrides (ONLY positioning allowed) */
    searchIconPositionClass?: string;
    chevronPositionClass?: string;
    refreshIconPositionClass?: string;
};

export default function SearchableCreatableSelect({
    options,
    value,
    onSelect,
    onCreate,
    placeholder = 'Search or add...',
    disabled = false,

    showSearch = true,
    showChevron = true,
    showRefresh = true,

    onReset,

    wrapperClassName = '',
    inputClassName = '',
    dropdownClassName = '',
    optionClassName = '',
    createOptionClassName = '',

    searchIconPositionClass = '',
    chevronPositionClass = '',
    refreshIconPositionClass = ''
}: Props) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [isRefreshing, setIsRefreshing] = useState(false);

    const wrapperRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const filteredOptions = useMemo(() => {
        return options.filter((opt) => opt.label.toLowerCase().includes(query.toLowerCase()));
    }, [query, options]);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (!wrapperRef.current?.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);

        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const canCreate = query.length > 0 && !options.some((o) => o.label.toLowerCase() === query.toLowerCase());

    const handleRefresh = () => {
        if (isRefreshing) return;
        setIsRefreshing(true);

        setTimeout(() => {
            setQuery('');
            setOpen(false);
            onReset?.();
            setIsRefreshing(false);
        }, 600);
    };
    console.log(showSearch);

    return (
        <div ref={wrapperRef} className={`relative w-full ${wrapperClassName}`}>
            {/* Input */}
            <input
                ref={inputRef}
                disabled={disabled}
                value={open ? query : value?.label || ''}
                onClick={() => setOpen(true)}
                onFocus={() => setOpen(true)}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className={`w-[80%] rounded-md border border-black/40 ${showSearch ? 'px-8' : 'px-1.5'} py-2 ${inputClassName}`}
            />

            {/* 🔍 Search */}
            {showSearch && (
                <Search
                    className={`absolute top-2 left-1.5 cursor-pointer text-slate-700 ${searchIconPositionClass}`}
                    onClick={() => {
                        inputRef.current?.focus();
                        setOpen(true);
                    }}
                />
            )}

            {/* ⬇ Chevron */}
            {showChevron && (
                <ChevronDown
                    className={`absolute top-2 right-16 cursor-pointer transition ${
                        open ? 'rotate-180' : ''
                    } ${chevronPositionClass}`}
                    onClick={() => setOpen((prev) => !prev)}
                />
            )}

            {/* 🔄 Refresh */}
            {showRefresh && (
                <RefreshCcw
                    className={`absolute top-2 right-5 cursor-pointer text-slate-700 ${
                        isRefreshing ? 'animate-spin' : ''
                    } ${refreshIconPositionClass}`}
                    onClick={handleRefresh}
                />
            )}

            {/* Dropdown */}
            {open && (
                <div
                    className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white shadow ${dropdownClassName}`}>
                    {filteredOptions.map((opt) => (
                        <div
                            key={opt.value}
                            onClick={() => {
                                onSelect(opt);
                                setQuery('');
                                setOpen(false);
                            }}
                            className={`flex cursor-pointer items-center justify-between px-3 py-2 hover:bg-gray-100 ${optionClassName}`}>
                            <span>{opt.label}</span>
                            {value?.value === opt.value && <Check size={16} />}
                        </div>
                    ))}

                    {canCreate && onCreate && (
                        <div
                            onClick={() => {
                                onCreate(query);
                                setQuery('');
                                setOpen(false);
                            }}
                            className={`flex cursor-pointer items-center gap-2 px-3 py-2 text-green-600 hover:bg-green-50 ${createOptionClassName}`}>
                            <Plus size={16} />
                            Add “{query}”
                        </div>
                    )}

                    {filteredOptions.length === 0 && !canCreate && (
                        <p className='px-3 py-2 text-sm text-gray-400'>No results found</p>
                    )}
                </div>
            )}
        </div>
    );
}
