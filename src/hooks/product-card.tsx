'use client';

import { useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import StarRating from '@/components/home/star-rating';
import UniversalDialog from '@/components/ui/universal-dialogBox';

import gift from '../../public/gift-box.json';
import LottiePlayer from './lottiplayer';
import { ChevronDown } from 'lucide-react';
import ScratchCard from 'react-scratchcard-v2';

type Product = {
    title: string;
    desc: string;
    rating: number;
    price: number;
    image: string;
    slug?: string;
};

export default function ProductCard({ item }: { item: Product }) {
    const [openBox, setOpenBox] = useState(false);
    console.log(openBox, 'openBox');

    return (
        <div className='flex items-center'>
            <Link href={`/product-detail/${item.slug}`}>
                <Image src={item.image} alt={item.title} width={200} height={200} className='h-32 w-32 object-cover' />
            </Link>
            <div className='relative p-1'>
                <h2 className='font-sans font-semibold'>{item.title}</h2>

                <div className='flex gap-1 text-xs'>
                    <Image src='/images/ok.png' alt='ok' width={15} height={15} className='mt-1 h-4 w-4' />
                    <p className='flex items-start text-gray-500'>{item.desc}</p>
                </div>

                <p className='ml-1 flex items-center gap-1 text-xl font-semibold'>
                    <span className='currency'>₹</span>
                    <span className='amount'>{item.price}/-</span>
                </p>

                {/* scratch card */}
                <button className='absolute top-8 right-0' onClick={() => setOpenBox(true)}>
                    <LottiePlayer animationData={gift} className='h-18 w-18' loop={true} />
                </button>

                {/* dialogbox */}
                <UniversalDialog className='bg-white' open={openBox} onClose={() => setOpenBox(false)}>
                    <div className='touch-none overscroll-none select-none'>
                        <ScratchCard
                            width={250}
                            height={150}
                            image='/hero-back.png'
                            finishPercent={60}
                            onComplete={() => alert('🎉 You won!')}>
                            <div className='flex h-full items-center justify-center rounded-lg bg-green-500 text-white'>
                                <h2 className='text-xl font-bold'>₹50 OFF</h2>
                            </div>
                        </ScratchCard>
                    </div>
                </UniversalDialog>

                <div className='flex items-center gap-1'>
                    <span className='rounded-sm bg-green-700 px-1.5 text-xs font-semibold text-white'>
                        {item.rating}
                    </span>

                    <StarRating rating={item.rating} />

                    <Image src='/trust.png' alt='trust' width={200} height={200} className='h-5 w-8' />

                    <Image
                        src='/verfieid.png'
                        alt='verified'
                        width={200}
                        height={200}
                        className='h-6 w-14 object-cover'
                    />
                </div>

                <div className='flex items-center gap-1 text-gray-800'>
                    <span className='text-xs'>🇮🇳 IND | Bangalore</span>

                    <Link
                        href={`/detail/${item.title}`}
                        className='ml-2 flex items-center font-sans text-sm text-blue-700'>
                        <span>View More</span>
                        <ChevronDown />
                    </Link>
                </div>
            </div>
        </div>
    );
}
