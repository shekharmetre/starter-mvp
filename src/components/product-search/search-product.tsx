import Image from 'next/image';

import { Product } from '@/lib/types';

import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus } from 'lucide-react';

export function SearchProduct({ item, key }: { item: Product; key: any }) {
    return (
        <section id='search-product' key={key} className='relative my-4 w-full overflow-hidden'>
            <Image
                src={item.image}
                alt={item.title}
                width={500}
                height={500}
                className='h-24 w-full rounded-xl object-cover'
            />
            <h2 className='w-full truncate font-sans text-[12px] font-semibold'>{item.title}</h2>
            <p className='w-full truncate text-[10px] text-gray-600'>{item.description}</p>
            <div className='mx-1 mt-3 flex justify-between'>
                <span className='text-[13px] font-semibold'>Rs.{item.basePrice}</span>
                <Plus className='rounded-md bg-[#D28453] p-1 text-white' />
            </div>
            <span className='absolute -top-0.5 right-0 flex items-center gap-1 rounded-bl-2xl bg-[#4C4349] px-2 py-1 text-[8px] text-white'>
                <strong className='text-[9px]'>⭐</strong>
                {item.rating}
            </span>
        </section>
    );
}
