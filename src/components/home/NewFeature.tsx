'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

export default function NewFeature() {
    return (
        <section className='relative overflow-hidden'>
            {/* Text block */}
            <div className='relative'>
                {/* Heading → TOP to BOTTOM */}
                <motion.h1
                    className='mt-4 ml-2 font-serif text-xl font-bold'
                    initial={{ opacity: 0, y: -12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 20
                    }}>
                    Custom Mobile & Laptop Skin
                </motion.h1>

                {/* Paragraph → BOTTOM to TOP */}
                <motion.p
                    className='ml-2 text-[13px] text-gray-500'
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{
                        type: 'spring',
                        stiffness: 110,
                        damping: 18
                    }}>
                    Premium textures including matte, carbon fiber, leather and more. Custom cut for your device
                    instantly. Available soon at our stall.
                </motion.p>
            </div>

            {/* Image (same as before) */}
            <motion.div
                className='mt-10 flex justify-center will-change-transform'
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                    type: 'spring',
                    stiffness: 100,
                    damping: 18
                }}>
                <Image src='/laptop.png' alt='laptop skin preview' width={500} height={500} priority />
            </motion.div>
        </section>
    );
}
