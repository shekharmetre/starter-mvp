'use client';

import { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

const moods = [
    { emoji: '😀', label: 'Happy', message: "Great! We're glad you're feeling happy 😊" },
    { emoji: '😌', label: 'Calm', message: 'Nice! Calm minds do great work 😌' },
    { emoji: '😐', label: 'Neutral', message: 'Thanks for sharing how you feel 🙂' },
    { emoji: '😔', label: 'Sad', message: "We're here for you. Hope things get better 💙" },
    { emoji: '😡', label: 'Angry', message: 'Sorry about that. Let us know what went wrong 😔' }
];

export default function MoodSelector() {
    const [selected, setSelected] = useState<number | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const handleSelect = (index: number) => {
        setSelected(index);
        setShowPopup(true);
    };

    return (
        <>
            {/* Mood selector */}
            <motion.div
                className='mt-5 w-[80%] px-2'
                initial='hidden'
                animate='show'
                variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: 0.08 } }
                }}>
                <div className='flex justify-between gap-2'>
                    {moods.map((mood, index) => (
                        <motion.button
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                show: {
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        type: 'spring',
                                        stiffness: 120,
                                        damping: 18
                                    }
                                }
                            }}
                            whileTap={{ scale: 0.92 }}
                            onClick={() => handleSelect(index)}
                            className='flex flex-col items-center gap-2'>
                            {/* Emoji */}
                            <div className='z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow shadow-white will-change-transform'>
                                <span className='text-2xl'>{mood.emoji}</span>
                            </div>

                            {/* Label */}
                            <span className='text-md font-sans text-black'>{mood.label}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.div>

            {/* Popup */}
            <AnimatePresence>
                {showPopup && selected !== null && (
                    <motion.div
                        className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                        <motion.div
                            className='w-[90%] max-w-sm rounded-xl bg-white p-6 text-center'
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            transition={{ type: 'spring', stiffness: 140, damping: 20 }}>
                            <div className='mb-2 text-4xl'>{moods[selected].emoji}</div>
                            <h2 className='mb-2 text-lg font-semibold'>{moods[selected].label}</h2>
                            <p className='mb-4 text-gray-600'>{moods[selected].message}</p>
                            <button
                                onClick={() => setShowPopup(false)}
                                className='w-full rounded-lg bg-black py-2 text-white'>
                                Done
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
