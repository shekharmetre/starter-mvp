'use client';

type Props = {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    className?: string;
};

export default function QuantitySelector({ value, min = 1, max = 10, onChange, className = '' }: Props) {
    const increase = () => {
        if (value < max) onChange(value + 1);
    };

    const decrease = () => {
        if (value > min) onChange(value - 1);
    };

    return (
        <div className={`flex items-center gap-2 rounded-full border px-2 py-1 ${className}`}>
            <button type='button' onClick={decrease} className='px-2 text-lg font-bold'>
                −
            </button>

            <span className='min-w-[20px] text-center'>{value}</span>

            <button type='button' onClick={increase} className='px-2 text-lg font-bold'>
                +
            </button>
        </div>
    );
}
