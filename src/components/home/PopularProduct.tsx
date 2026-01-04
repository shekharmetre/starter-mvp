'use client';

import { screenProtectorProducts } from '@/assets/data';
import { HorizontalScrollOne } from '@/hooks/cardWrapper';

import ProductCard from '../ui/product-card';
import { motion } from 'framer-motion';

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06 // subtle
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 8 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 140,
            damping: 20
        }
    }
};

export default function PopularProduct({ className = 'mt-4 px-2 py-2' }: { className?: string }) {
    return (
        <section id='popular-product' className={className}>
            {/* Title */}
            <motion.h1
                className='header-main mb-4'
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 18
                }}>
                Popular Products
            </motion.h1>

            {/* Product list */}
            <motion.div variants={container} initial='hidden' animate='show'>
                <HorizontalScrollOne>
                    {screenProtectorProducts.map((itemData, index) => (
                        <motion.div key={itemData.id} className='will-change-transform'>
                            <ProductCard item={itemData} index={index} />
                        </motion.div>
                    ))}
                </HorizontalScrollOne>
            </motion.div>
        </section>
    );
}
