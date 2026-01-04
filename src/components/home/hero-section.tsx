'use client';

import MoodSelector from './emoji-component';
import { Variants, motion } from 'framer-motion';

const text = 'Welcome To Bhagyawanti Mobile';

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.06 // smooth left → right
        }
    }
};

const word: Variants = {
    hidden: { opacity: 0, x: -10 },
    show: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            stiffness: 120,
            damping: 18
        }
    }
};

export default function HeroSection() {
    return (
        <section
            className='-z-10 h-[300px] w-full bg-cover bg-center bg-no-repeat p-2'
            style={{ backgroundImage: "url('/hero-back.png')" }}>
            {/* Heading */}
            <motion.h1
                className='pt-6 font-serif text-2xl font-semibold text-white'
                variants={container}
                initial='hidden'
                animate='show'>
                {text.split(' ')?.map((w, i) => (
                    <motion.span key={i} variants={word} className='mr-2 inline-block will-change-transform'>
                        {w}
                    </motion.span>
                ))}
            </motion.h1>

            {/* Subheading (simple fade, no delay) */}
            <motion.p
                className='text-md mt-1 font-medium text-white italic'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}>
                How are you feeling today?
            </motion.p>

            {/* Mood selector (no animation = max smoothness) */}
            <div className='mt-4'>
                <MoodSelector />
            </div>
        </section>
    );
}
