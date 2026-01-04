import { CartItemShow } from '@/components/cartPage/itemShowCase';

import { ArrowLeft } from 'lucide-react';

export default function CartPage() {
    return (
        <section id='cart-page' className='p-2'>
            <div>
                <ArrowLeft />
            </div>
            <CartItemShow />
        </section>
    );
}
