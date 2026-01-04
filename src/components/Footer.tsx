'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 }
};

const fadeLeft = {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 }
};

const fadeRight = {
    hidden: { opacity: 0, x: 32 },
    visible: { opacity: 1, x: 0 }
};

const stagger = {
    visible: {
        transition: {
            staggerChildren: 0.12
        }
    }
};

const footerLinks = [
    {
        title: 'Company',
        items: [
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about' },
            { label: 'Pricing', href: '/pricing' }
        ]
    },
    {
        title: 'Products',
        items: [
            { label: 'Accessories', href: '/products/accessories' },
            { label: 'Repairs', href: '/products/repairs' },
            { label: 'Smart Solutions', href: '/products/solutions' }
        ]
    },
    {
        title: 'Support',
        items: [
            { label: 'Customer Support', href: '/support' },
            { label: 'Terms', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' }
        ]
    }
];

export default function Footer() {
    return (
        <footer className='my-12 w-full bg-white'>
            {/* Brand Banner */}
            <motion.div
                variants={fadeUp}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className='mx-auto w-[90%] rounded-xl bg-[#7C66EC] p-6 text-white'>
                <div className='grid place-items-center gap-6 text-center'>
                    {/* SVG Logo */}
                    <svg width='240' height='48' viewBox='0 0 260 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <rect x='2' y='2' width='28' height='44' rx='6' stroke='white' strokeWidth='2'>
                            <animate
                                attributeName='stroke-opacity'
                                values='0.4;1;0.4'
                                dur='2s'
                                repeatCount='indefinite'
                            />
                        </rect>

                        <rect x='11' y='6' width='10' height='2' rx='1' fill='white' />

                        <circle cx='16' cy='40' r='1.5' fill='white'>
                            <animate attributeName='r' values='1.5;2.5;1.5' dur='1.5s' repeatCount='indefinite' />
                        </circle>

                        <text
                            x='42'
                            y='30'
                            fill='white'
                            fontSize='18'
                            fontWeight='700'
                            fontFamily='Inter, system-ui, sans-serif'>
                            Bhagyawanti
                            <tspan dx='6'>Mobile</tspan>
                        </text>

                        <line x1='42' y1='36' x2='42' y2='36' stroke='#E0E7FF' strokeWidth='2'>
                            <animate attributeName='x2' from='42' to='230' dur='1.2s' repeatCount='indefinite' />
                        </line>
                    </svg>

                    <motion.p variants={fadeUp} className='max-w-md text-sm leading-relaxed text-indigo-50'>
                        Trusted mobile accessories, honest service, and future-ready solutions — empowering customers
                        and shop owners with the right mobile experience.
                    </motion.p>

                    {/* Social Icons */}
                    <motion.div
                        variants={stagger}
                        initial='hidden'
                        whileInView='visible'
                        viewport={{ once: true }}
                        className='flex gap-4'>
                        {[
                            { icon: Twitter, color: '#33CCFF' },
                            { icon: Instagram, color: '#E1306C' },
                            { icon: Facebook, color: '#337FFF' },
                            { icon: Youtube, color: '#FF0000' }
                        ].map(({ icon: Icon, color }, i) => (
                            <motion.div
                                key={i}
                                variants={fadeUp}
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                whileTap={{ scale: 0.95 }}
                                className='flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-white shadow-sm'
                                style={{ backgroundColor: color }}>
                                <Icon size={18} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.div>

            {/* Main Footer */}
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                {/* Links */}
                <motion.div
                    variants={stagger}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    className='mt-12 grid max-w-sm grid-cols-2 gap-8 sm:max-w-3xl sm:grid-cols-4 lg:max-w-full lg:grid-cols-6'>
                    {footerLinks.map((section) => (
                        <motion.div key={section.title} variants={fadeLeft} className='lg:mx-auto'>
                            {/* Title (NO underline) */}
                            <motion.h4 variants={fadeUp} className='mb-5 text-lg font-semibold text-gray-900'>
                                {section.title}
                            </motion.h4>

                            {/* Links */}
                            <motion.ul variants={stagger} className='space-y-4 text-sm'>
                                {section.items.map((item) => (
                                    <motion.li key={item.label} variants={fadeUp}>
                                        <Link
                                            href={item.href}
                                            className='group inline-block text-gray-600 transition hover:text-gray-900'>
                                            {item.label}
                                            {/* underline animation */}
                                            <span className='block h-[1px] w-0 bg-gray-900 transition-all duration-300 group-hover:w-full' />
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    ))}

                    {/* Subscribe */}
                    <motion.div variants={fadeRight} className='lg:mx-auto'>
                        <motion.h4 variants={fadeUp} className='mb-5 text-lg font-semibold text-gray-900'>
                            Subscribe
                        </motion.h4>
                        <motion.p variants={fadeUp} className='mb-5 text-sm text-gray-500'>
                            Get updates, offers & future mobile solutions.
                        </motion.p>
                        <motion.button
                            variants={fadeUp}
                            whileHover={{ scale: 1.05 }}
                            className='rounded-full border border-indigo-600 px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50'>
                            Subscribe →
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Bottom Bar */}
                <motion.div
                    variants={fadeUp}
                    initial='hidden'
                    whileInView='visible'
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className='mt-12 border-t border-gray-200 py-6'>
                    <div className='flex flex-col items-center justify-between gap-6 lg:flex-row'>
                        <span className='text-sm text-gray-500'>© 2026 Bhagyawanti Mobile. All rights reserved.</span>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}
