import Image from 'next/image';

import { screenProtectorProducts } from '@/assets/data';
import { DetailContaint } from '@/components/detailPage/detailContent';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/lib/types';

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id, 'sdfsdf');

    const getALlDetail = screenProtectorProducts.find((item) => item.slug === id);
    console.log(getALlDetail, 'getALlDetail');

    if (!getALlDetail) {
        return <div>Product not found</div>;
    }

    return (
        <section id='product-detail-page'>
            <div className='relative'>
                <Image
                    src={getALlDetail?.image || ''}
                    alt='product-image'
                    width={2000}
                    height={2000}
                    className='w-ful h-[250px] object-fill'
                />
                <Badge className='mx-6 mt-2 w-20 rounded-md bg-amber-800 p-1 px-2'>Scratch </Badge>
                <DetailContaint getALlDetail={getALlDetail} />
            </div>
        </section>
    );
}
