'use client';

import { AllProduct } from '@/assets/data';
import ProductCard from '@/hooks/product-card';

import { motion } from 'framer-motion';

export default function AllProducts({ productsName = 'All Products' }: { productsName?: string }) {
    return (
        <section className='mt-8 ml-1'>
            {/* Title */}
            <motion.h1
                className='header-main'
                initial={{ opacity: 0, y: -8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                    type: 'spring',
                    stiffness: 120,
                    damping: 20
                }}>
                {productsName}
            </motion.h1>

            {/* Product list */}
            <div className='mt-2 flex flex-col gap-2'>
                {AllProduct.filter((item) => item.type != 'Screen Protector').map((item) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{
                            once: true, // animate only once
                            amount: 0.25 // triggers when item is partially visible
                        }}
                        transition={{
                            type: 'spring',
                            stiffness: 110,
                            damping: 18
                        }}
                        className='will-change-transform'>
                        <ProductCard item={item} />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
