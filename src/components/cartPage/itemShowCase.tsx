'use client';

import Image from 'next/image';

import QuantitySelector from '@/hooks/quatntiySelector';
import { useCartStore } from '@/hooks/useCartStore';

import { FavouriteButton } from '../ui/FavouriteButton';
import { RemoveButton } from '../ui/removecart';
import { MobileOrderSummary } from './order-summary';
import { type Variants, motion } from 'framer-motion';
import ScratchCard from 'react-scratchcard-v2';

/* ---------------- Animations ---------------- */

const container: Variants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15
        }
    }
};

const itemLeft: Variants = {
    hidden: { opacity: 0, x: -40 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

const itemRight: Variants = {
    hidden: { opacity: 0, x: 40 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

const cartItem: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.45,
            ease: [0.25, 0.1, 0.25, 1]
        }
    }
};

export function CartItemShow() {
    const cartItems = useCartStore((s) => s.cart);
    const updateQty = useCartStore((s) => s.updateQty);

    const summaryItems = cartItems.map((item) => {
        const basePrice = item.qty * item.originalPrice;
        const discount = item.discountPercentage > 0 ? (basePrice * item.discountPercentage) / 100 : 0;

        return {
            name: item.itemName,
            qty: item.qty,
            price: Math.round(basePrice - discount)
        };
    });

    const subTotal = summaryItems.reduce((sum, i) => sum + i.price, 0);
    const GST_PERCENT = 18;
    const gst = Math.round((subTotal * GST_PERCENT) / 100);
    const total = subTotal + gst;

    return (
        <motion.div className='pb-28' variants={container} initial='hidden' animate='show'>
            {/* Title */}
            <motion.h2 variants={itemLeft} className='text-2xl font-bold'>
                Shopping Cart
            </motion.h2>

            {/* Empty Cart */}
            {cartItems.length === 0 && (
                <motion.p variants={itemRight} className='mt-4 text-sm text-gray-500'>
                    Cart is empty
                </motion.p>
            )}

            {/* Cart Items (ONE BY ONE) */}
            {cartItems.map((item) => (
                <motion.div
                    key={item.id}
                    variants={cartItem}
                    className='relative mt-2 flex items-center justify-between rounded-md px-2 pb-2 shadow'>
                    <div className='image-and-qty relative'>
                        <Image
                            src={item.itemImage}
                            alt={item.itemName}
                            width={500}
                            height={500}
                            className='h-24 w-38 rounded-xl object-contain'
                        />

                        <div className='flex items-center justify-between gap-2'>
                            <QuantitySelector
                                className='w-fit'
                                value={item.qty}
                                min={1}
                                max={10}
                                onChange={(val) => updateQty(item.id, val)}
                            />

                            <p className='mr-5'>
                                <span className='text-xl font-semibold'>Rs.{item.originalPrice}/-</span>
                            </p>
                        </div>

                        <p className='text-md mt-2 font-semibold'>{item.itemName}</p>

                        <span className='text-[11px] font-medium text-gray-700'>{item.description}</span>

                        <div className='mt-3 flex gap-3'>
                            <FavouriteButton
                                itemId={item.id}
                                className='text-gray-600 hover:text-red-500'
                                text='Add to Favourites'
                            />
                            <RemoveButton itemId={item.id} className='ml-3' />
                        </div>
                    </div>

                    {/* Scratch Card */}
                    <motion.div variants={itemRight} className='absolute top-0 right-0 rounded-md'>
                        <ScratchCard
                            width={130}
                            height={100}
                            image='/hero-back.png'
                            finishPercent={60}
                            onComplete={() => alert('🎉 You won!')}>
                            <div className='flex h-full items-center justify-center rounded-lg bg-green-500 text-white'>
                                <h2 className='text-xl font-bold'>₹50 OFF</h2>
                            </div>
                        </ScratchCard>
                    </motion.div>
                </motion.div>
            ))}

            {/* Order Summary */}
            {cartItems.length > 0 && (
                <motion.div variants={itemLeft}>
                    <MobileOrderSummary items={summaryItems} subTotal={subTotal} gst={gst} total={total} />
                </motion.div>
            )}
        </motion.div>
    );
}
