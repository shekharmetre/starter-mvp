'use client';

import { ComponentProps } from 'react';

import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

type LottiePlayerProps = {
    animationData: object;
    className?: string;
    loop?: boolean;
    autoplay?: boolean;
};

export default function LottiePlayer({
    animationData,
    className = '',
    loop = true,
    autoplay = true
}: LottiePlayerProps) {
    return <Lottie animationData={animationData} loop={loop} autoplay={autoplay} className={className} />;
}
