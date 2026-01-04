'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useLiveLocationWithAddress } from '@/hooks/location-finder';

import { AnimatePresence, motion } from 'framer-motion';

export function Header() {
    const { displayAddress, error, requestLocation } = useLiveLocationWithAddress();
    const router = useRouter();
    const locationText = displayAddress ?? 'Seeghelli, Whitefield';
    const subText = error ? 'Oppo, Lulu Mall' : 'Tap to change location';

    return (
        <motion.nav
            initial={{ y: -12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className='sticky top-0 z-50 w-full bg-white shadow-sm'
            onClick={() => router.push('/cart')}>
            <div className='flex items-center justify-between px-2'>
                {/* LEFT */}
                <div className='flex items-center gap-2 p-2 py-3'>
                    <Image className='h-6 w-6' src='/locate.svg' alt='location' width={24} height={24} />

                    <AnimatePresence mode='wait'>
                        {/* Get live location */}
                        {!displayAddress && !error && (
                            <motion.button
                                key='request'
                                onClick={requestLocation}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -4 }}
                                transition={{ duration: 0.25 }}
                                className='text-sm font-medium underline hover:opacity-70'>
                                Get live location
                            </motion.button>
                        )}

                        {/* Address / Error */}
                        {(displayAddress || error) && (
                            <motion.div
                                key='address'
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}>
                                <Link href='/nearby-location' className='group flex flex-col'>
                                    <span className='truncate text-sm font-semibold text-gray-900 transition-transform duration-300 group-hover:translate-x-0.5'>
                                        {locationText}
                                    </span>
                                    <span className='-mt-1 text-xs font-medium text-gray-600 italic transition-opacity duration-300 group-hover:opacity-80'>
                                        {subText}
                                    </span>
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* RIGHT */}
                <motion.div whileHover={{ scale: 1.08 }} transition={{ type: 'spring', stiffness: 300 }}>
                    <Image src='/bell.svg' alt='bell' width={40} height={40} className='h-10 w-10 p-2' />
                </motion.div>
            </div>
        </motion.nav>
    );
}
