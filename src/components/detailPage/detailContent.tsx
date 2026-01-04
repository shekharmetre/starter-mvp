'use client';

import { useState } from 'react';

import { AllProduct } from '@/assets/data';
import { HorizontalScrollOne } from '@/hooks/cardWrapper';
import QuantitySelector from '@/hooks/quatntiySelector';
import { useCartStore } from '@/hooks/useCartStore';
import { Product } from '@/lib/types';

import PopularProduct from '../home/PopularProduct';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { SvGCardDesign } from './svgCardDesign';
import { type Variants, motion } from 'framer-motion';

/* ---------------- Animation Variants (TYPE SAFE) ---------------- */

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12
        }
    }
};

const itemLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1] // easeOut (type-safe)
        }
    }
};

const itemRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

const cardItem: Variants = {
    hidden: { opacity: 0, y: 16 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

export function DetailContaint({ getALlDetail }: { getALlDetail: Product }) {
    const [qty, setQty] = useState(1);
    const colors = ['#FFA400', '#FF859C', '#00B3C5'];

    const addItemAsync = useCartStore((s) => s.addItemAsync);
    const isAdding = useCartStore((s) => s.isAdding);

    const handleAddToCart = () => {
        addItemAsync({
            id: getALlDetail.id,
            itemName: getALlDetail.name,
            itemImage: getALlDetail.image,
            qty,
            favourite: false,
            scratched: false,
            originalPrice: getALlDetail.basePrice,
            discountPercentage: Math.round(
                ((getALlDetail.basePrice - getALlDetail.discountedPrice) / getALlDetail.basePrice) * 100
            ),
            description: getALlDetail.description
        });
    };

    return (
        <motion.div
            className='contain relative px-4 py-2'
            variants={container}
            initial='hidden'
            whileInView='show'
            viewport={{ once: true }}>
            {/* Title */}
            <motion.h1 variants={itemLeft} className='header-main font-sans'>
                {getALlDetail.name}
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={itemRight} className='text-md'>
                {getALlDetail.title}
            </motion.p>

            {/* Price */}
            <motion.p variants={itemLeft} className='ml-1 flex items-center gap-1 text-2xl font-semibold'>
                <span className='currency'>₹</span>
                <span className='amount'>{getALlDetail.discountedPrice}/-</span>
                <del className='mt-2 ml-2 text-sm text-gray-400'>₹{getALlDetail.basePrice}</del>
            </motion.p>

            {/* Quantity */}
            <motion.div variants={itemRight}>
                <QuantitySelector
                    className='absolute right-2 inline-flex items-center rounded-full'
                    value={qty}
                    onChange={setQty}
                    min={1}
                    max={10}
                />
            </motion.div>

            {/* Separator */}
            <motion.div variants={itemLeft}>
                <Separator className='mt-14' />
            </motion.div>

            {/* Description */}
            <motion.h3 variants={itemRight} className='header-main mt-4'>
                Description
            </motion.h3>

            <motion.p variants={itemLeft} className='mt-1 text-gray-500'>
                {getALlDetail.description}
            </motion.p>

            {/* Button */}
            <motion.div variants={itemRight}>
                <Button
                    disabled={isAdding}
                    onClick={handleAddToCart}
                    className='mt-4 w-full bg-[#FF7200] p-6 font-sans text-xl font-bold disabled:opacity-70'>
                    {isAdding ? 'Adding...' : 'Add To Cart'}
                </Button>
            </motion.div>

            {/* Recommended */}
            <motion.div variants={itemLeft}>
                <h2 className='header-main mt-4'>Recommended</h2>

                <HorizontalScrollOne>
                    {AllProduct.map((itemData, index) => (
                        <motion.div
                            key={itemData.title}
                            variants={cardItem}
                            initial='hidden'
                            whileInView='show'
                            viewport={{ once: true }}
                            className='mt-5'>
                            <SvGCardDesign data={itemData} color={colors[index % colors.length]} />
                        </motion.div>
                    ))}
                </HorizontalScrollOne>
            </motion.div>

            {/* Popular */}
            <motion.div variants={itemRight}>
                <PopularProduct className='-mt-10' />
            </motion.div>
        </motion.div>
    );
}
