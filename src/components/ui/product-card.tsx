'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { SelectOption } from '@/lib/types';

import StarRating from '../home/star-rating';
import { LiveIndicator } from '../liveIndicating';
import { Button } from '../ui/button';
import SearchableCreatableSelect from './Input-searchable';
import { Dialog, DialogContent } from './dialog';
import UniversalDialog from './universal-dialogBox';
import { motion } from 'framer-motion';
import { CircleQuestionMark, ShoppingCart } from 'lucide-react';

type Product = {
    id: string;
    slug: string;
    name: string;
    image: string;
    type: string;
    title: string;
    rating: number;
    reviews: number;
    basePrice: number;
    discountedPrice: number;
};

type ProductCardClassNames = {
    root?: string;
    imageWrapper?: string;
    image?: string;
    badge?: string;
    content?: string;
    title?: string;
    subtitle?: string;
    ratingRow?: string;
    price?: string;
    dialog?: string;
    ctaWrapper?: string;
    exploreBtn?: string;
    cartBtn?: string;
};

type ProductCardProps = {
    item: Product;
    index: number;
    classNames?: ProductCardClassNames;
    shoppingCartIsTrue?: boolean;
    exporeButtonIsTrue?: boolean;
};

export default function ProductCard({
    item,
    index,
    classNames,
    shoppingCartIsTrue = true,
    exporeButtonIsTrue = true
}: ProductCardProps) {
    const [openBox, setOpenBox] = useState(false);

    const [brands, setBrands] = useState<SelectOption[]>([
        { label: 'Samsung', value: 'samsung' },
        { label: 'Apple', value: 'apple' },
        { label: 'Xiaomi', value: 'xiaomi' }
    ]);

    const [selectedBrand, setSelectedBrand] = useState<SelectOption | null>(null);

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ y: -4 }}
            className={`flex h-full flex-col overflow-hidden rounded-xl ${classNames?.root ?? 'mt-2'}`}>
            {/* Image */}
            <div className={`relative ${classNames?.imageWrapper ?? ''}`}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                    <Link href={`/product-detail/${item.slug}`}>
                        <Image
                            className={`rounded-xl object-cover ${classNames?.image ?? ''}`}
                            src={item.image}
                            alt={item.name}
                            width={200}
                            height={200}
                        />
                    </Link>
                </motion.div>

                <span
                    className={`absolute top-2 left-2 rounded-full bg-black/70 px-2 py-0.5 text-xs text-white ${classNames?.badge ?? ''}`}>
                    {item.type}
                </span>
            </div>

            {/* Content */}
            <div className={`flex flex-1 flex-col p-1 ${classNames?.content ?? 'mt-2'}`}>
                <h2 className={`w-full truncate font-sans font-semibold ${classNames?.title ?? 'text-xl'}`}>
                    {item.name}
                </h2>

                <p className={`w-[90%] ${classNames?.subtitle ?? 'text-xs'}`}>{item.title}</p>

                <p className={`flex items-center ${classNames?.ratingRow ?? ''}`}>
                    <StarRating rating={item.rating} />
                    <span className='ml-1 text-sm font-semibold'>{item.rating}</span>
                    <span className='ml-1 text-xs'>({item.reviews}) reviews</span>
                </p>

                <p className={`ml-1 flex items-center gap-1 text-xl font-semibold ${classNames?.price ?? ''}`}>
                    <span className='currency'>₹</span>
                    <span className='amount'>{item.discountedPrice}/-</span>
                    <del className='mt-2 ml-2 text-sm text-gray-400'>₹{item.basePrice}</del>
                </p>

                <Dialog open={openBox} onOpenChange={setOpenBox}>
                    <DialogContent className='w-full rounded-md bg-[#F5EDED]'>
                        <div>
                            <div className='mb-3 flex items-center gap-2'>
                                <h2 className='text-md font-serif font-semibold italic'>Check Availability</h2>
                                <CircleQuestionMark size={18} />
                            </div>

                            <SearchableCreatableSelect
                                options={brands}
                                showSearch={false}
                                showRefresh={false}
                                value={selectedBrand}
                                onSelect={setSelectedBrand}
                                onCreate={(value) => {
                                    const newBrand: SelectOption = {
                                        label: value,
                                        value: value.toLowerCase().replace(/\s+/g, '-')
                                    };
                                    setBrands((prev) => [...prev, newBrand]);
                                    setSelectedBrand(newBrand);
                                }}
                                onReset={() => setSelectedBrand(null)}
                            />

                            <div className='mt-2'>
                                <SearchableCreatableSelect
                                    inputClassName='w-[85%] relative'
                                    placeholder='search model & add....'
                                    chevronPositionClass='right-7'
                                    refreshIconPositionClass='-right-20 pl-1'
                                    options={brands}
                                    showRefresh
                                    value={selectedBrand}
                                    onSelect={setSelectedBrand}
                                    onCreate={(value) => {
                                        const newBrand: SelectOption = {
                                            label: value,
                                            value: value.toLowerCase().replace(/\s+/g, '-')
                                        };
                                        setBrands((prev) => [...prev, newBrand]);
                                        setSelectedBrand(newBrand);
                                    }}
                                    onReset={() => setSelectedBrand(null)}
                                />
                            </div>

                            <p className='m-4 bg-white p-2'>
                                <span className='font-serif font-semibold italic'>Availability</span>
                                <span className='flex gap-4'>
                                    <LiveIndicator />
                                    <strong className='font-sans text-sm text-gray-500'>20 Units available</strong>
                                </span>
                            </p>

                            <div className='flex justify-end gap-2'>
                                <Button variant='destructive'>Find Covers</Button>
                                <Button className='bg-[#A060FA]' onClick={() => setOpenBox(false)}>
                                    <ShoppingCart /> Add Cart
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Dialog */}

                {/* CTA */}
                <div
                    className={`mt-auto grid w-full gap-5 pt-4 ${
                        shoppingCartIsTrue ? 'grid-cols-3' : 'grid-cols-1 justify-items-end'
                    } ${classNames?.ctaWrapper ?? ''}`}>
                    {' '}
                    {exporeButtonIsTrue && (
                        <Button className={`col-span-2 bg-green-500 text-white ${classNames?.exploreBtn ?? ''}`}>
                            Explore
                        </Button>
                    )}
                    {shoppingCartIsTrue && (
                        <motion.div whileTap={{ scale: 0.9 }}>
                            <Button
                                className={`col-span-1 ${classNames?.cartBtn ?? ''}`}
                                onClick={() => setOpenBox(true)}>
                                <ShoppingCart />
                            </Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </motion.div>
    );
}
