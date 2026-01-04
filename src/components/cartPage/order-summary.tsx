'use client';

import { useState } from 'react';

import { ChevronDown, ChevronUp } from 'lucide-react';

type SummaryItem = {
    name: string;
    qty: number;
    price: number;
};

type Props = {
    items: SummaryItem[];
    subTotal: number;
    gst: number;
    total: number;
};

export function MobileOrderSummary({ items, subTotal, gst, total }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* BOTTOM SHEET */}
            <div
                className={`fixed inset-x-0 bottom-0 z-50 bg-white transition-transform duration-300 ease-in-out ${open ? 'translate-y-0' : 'translate-y-[70%]'} rounded-t-2xl shadow-[0_-10px_30px_rgba(0,0,0,0.15)]`}>
                {/* HEADER */}
                <button onClick={() => setOpen(!open)} className='flex w-full items-center justify-between px-4 py-3'>
                    <div>
                        <p className='text-xs text-gray-500'>Total Amount</p>
                        <p className='text-lg font-bold'>₹{total}</p>
                    </div>

                    {open ? <ChevronDown /> : <ChevronUp />}
                </button>

                <div className='h-px bg-gray-200' />

                {/* CONTENT */}
                <div className='max-h-[60vh] overflow-y-auto px-4 py-3'>
                    <h3 className='mb-3 text-sm font-semibold text-gray-700'>Order Summary</h3>

                    <div className='space-y-2'>
                        {items.map((item, i) => (
                            <div key={i} className='flex justify-between text-sm text-gray-700'>
                                <span>
                                    {item.name} × {item.qty}
                                </span>
                                <span>₹{item.price}</span>
                            </div>
                        ))}
                    </div>

                    <div className='my-4 h-px bg-gray-200' />

                    <div className='space-y-1 text-sm'>
                        <div className='flex justify-between'>
                            <span>Subtotal</span>
                            <span>₹{subTotal}</span>
                        </div>
                        <div className='flex justify-between'>
                            <span>GST (18%)</span>
                            <span>₹{gst}</span>
                        </div>
                    </div>

                    <div className='mt-3 flex justify-between text-lg font-bold'>
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                    <button className='mt-4 w-full rounded-xl bg-black py-3 font-semibold text-white active:scale-[0.98]'>
                        Proceed to Checkout
                    </button>
                </div>
            </div>

            {/* Spacer */}
            <div className='h-28' />
        </>
    );
}
