'use client';

import { useEffect, useRef, useState } from 'react';

import Image from 'next/image';

const searchHeroData = [
    { productName: 'add1', image: '/accessories-banner/accessories.png' },
    { productName: 'add2', image: '/accessories-banner/techno.png' },
    { productName: 'add3', image: '/accessories-banner/monday.png' }
];

export function SearchHero() {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const isAutoScrolling = useRef(false);

    /* 🔁 Auto scroll every 5 seconds */
    useEffect(() => {
        const interval = setInterval(() => {
            isAutoScrolling.current = true;
            setActiveIndex((prev) => (prev === searchHeroData.length - 1 ? 0 : prev + 1));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    /* 🎯 Scroll active slide to CENTER */
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const slide = container.children[activeIndex] as HTMLElement;
        if (!slide) return;

        const containerWidth = container.clientWidth;
        const slideWidth = slide.clientWidth;

        const scrollLeft = slide.offsetLeft - (containerWidth - slideWidth) / 2;

        container.scrollTo({
            left: scrollLeft,
            behavior: 'smooth'
        });

        setTimeout(() => {
            isAutoScrolling.current = false;
        }, 500);
    }, [activeIndex]);

    /* 🧠 Detect manual scroll */
    const handleScroll = () => {
        if (!containerRef.current || isAutoScrolling.current) return;

        const container = containerRef.current;
        const children = Array.from(container.children) as HTMLElement[];

        const center = container.scrollLeft + container.clientWidth / 2;

        const closestIndex = children.reduce(
            (closest, child, index) => {
                const childCenter = child.offsetLeft + child.clientWidth / 2;
                const diff = Math.abs(center - childCenter);

                return diff < closest.diff ? { index, diff } : closest;
            },
            { index: 0, diff: Infinity }
        ).index;

        setActiveIndex(closestIndex);
    };

    return (
        <div className='w-full'>
            {/* HERO SCROLLER */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className={`no-scrollbar flex w-full gap-3 overflow-x-auto scroll-smooth`}>
                {searchHeroData.map((item, index) => (
                    <div key={index} className={`relative h-50 shrink-0 ${index === 0 ? 'w-full' : 'w-[95%]'}`}>
                        <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            priority={index === 0}
                            className='rounded-xl object-cover'
                        />
                    </div>
                ))}
            </div>

            {/* DOT INDICATORS */}
            <div className='mt-3 flex justify-center gap-2'>
                {searchHeroData.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveIndex(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            activeIndex === index ? 'w-4 bg-black' : 'w-2 bg-gray-300'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
