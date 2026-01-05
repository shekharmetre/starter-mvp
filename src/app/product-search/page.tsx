'use client';

import { useEffect, useMemo, useState } from 'react';

import Image from 'next/image';

import { AllProduct } from '@/assets/data';
import { CategorySelector } from '@/components/product-search/VerticalCategorySelection';
import { SearchProduct } from '@/components/product-search/search-product';
import { SearchSelect } from '@/components/product-search/searchFunction';
import { SearchHero } from '@/components/product-search/searchHero';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ui/product-card';
import { HorizontalScrollOne, HorizontalScrollTwo } from '@/hooks/cardWrapper';
import { useCartStore } from '@/hooks/useCartStore';
import { Product } from '@/lib/types';

import { ShoppingCart } from 'lucide-react';

function CartWithSearch() {
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>('All');
    const [filteredData, setFilteredData] = useState<any>([]);
    const addItemAsync = useCartStore((s) => s.addItemAsync);
    const isAdding = useCartStore((s) => s.isAdding);

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        // ❌ Nothing selected → no filtered data
        if ((!query.trim() && !selectedCategory) || selectedCategory === 'All') {
            setFilteredData([]);

            return;
        }

        let data = AllProduct;

        // 🔍 Search works for ALL products
        if (query.trim()) {
            data = data.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()));

            return setFilteredData(data);
        }

        // 🧩 Category narrows result (optional)
        if (selectedCategory) {
            data = data.filter((item) => item.type?.toLowerCase() + 's' === selectedCategory.toLowerCase());

            return setFilteredData(data);
        }

        // ✅ Single state update
        // setFilteredData(data);
    }, [query, selectedCategory]);

    const { firstHalf, secondHalf } = useMemo(() => {
        const mid = Math.ceil(AllProduct.length / 2);

        return {
            firstHalf: AllProduct.slice(0, mid),
            secondHalf: AllProduct.slice(mid)
        };
    }, [AllProduct]);

    function handleAddToCart(item: Product) {
        addItemAsync({
            id: item.id,
            itemName: item.name,
            itemImage: item.image,
            qty: 1,
            favourite: false,
            scratched: false,
            originalPrice: item.basePrice,
            discountPercentage: Math.round(((item.basePrice - item.discountedPrice) / item.basePrice) * 100),
            description: item.description
        });
    }

    return (
        <div className='min-h-screen bg-[#FAF3F0] p-4'>
            <SearchSelect
                data={AllProduct}
                labelKey='title'
                placeholder='Search products'
                className='mx-auto'
                onQueryChange={setQuery} // ✅ THIS FIXES EVERYTHING
                onSelect={(item) => {
                    console.log('Selected item:', item);
                }}
            />
            <div className='mt-4'>
                <SearchHero />
            </div>
            <div className='flex gap-2'>
                <CategorySelector className='flex w-full gap-2' onSelect={handleCategoryChange} />
            </div>

            {/* when handleselected category shown then show that filtered one  */}
            {filteredData.length >= 1 ? (
                <section>
                    <div className='mt-4 grid grid-cols-3 gap-2'>
                        {filteredData.map((item: any, index: number) => (
                            <>
                                <SearchProduct key={index} item={item} />
                            </>
                        ))}
                    </div>
                    <Button variant='link' className='flex w-full justify-center text-blue-500 underline'>
                        View More
                    </Button>
                </section>
            ) : (
                <>
                    <section id='top-product' className=''>
                        <h1 className='my-4 text-2xl font-bold'>Top today products</h1>
                        <HorizontalScrollOne>
                            {AllProduct.filter((item) => item.isTopProduct).map((item, index) => (
                                <div className='ml-2' key={item.title}>
                                    <Image
                                        className='rounded-t-2xl'
                                        src={item.image}
                                        alt={item.title}
                                        width={500}
                                        height={500}
                                    />
                                    <h1 className='text-md mt-2 font-sans font-semibold'>{item.title}</h1>
                                    <p className='text-[9px]'>{item.desc}</p>
                                    <p className='ml-1 flex items-center gap-1 text-xl font-semibold'>
                                        <span className='currency'>₹</span>
                                        <span className='amount'>{item.price - 20}/-</span>
                                        <del className='mt-2 ml-2 text-sm text-gray-400'>₹{item.price + 20}</del>
                                    </p>
                                    <div className='grid place-content-end'>
                                        <button
                                            onClick={() => {
                                                handleAddToCart(item);
                                            }}
                                            disabled={isAdding}
                                            className='mt-5 flex items-center justify-end gap-2 rounded-xl bg-[#FFC4FF] px-3 py-2 text-end font-sans text-sm font-semibold'>
                                            <ShoppingCart />
                                            {isAdding ? 'Adding...' : 'Add to Cart'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </HorizontalScrollOne>
                    </section>
                    <section className='my-10'>
                        <h2 className='header-main'>New Products</h2>
                        <HorizontalScrollTwo classNames='mt-2'>
                            {firstHalf.map((item, index) => (
                                <div key={index} className='flex flex-col'>
                                    <ProductCard
                                        shoppingCartIsTrue={false}
                                        exporeButtonIsTrue={false}
                                        classNames={{
                                            image: 'w-full h-28 objet-contain',
                                            title: 'text-md',
                                            subtitle: 'text-[9px]'
                                        }}
                                        index={index}
                                        item={item}
                                        key={item.title}
                                    />
                                    <Button className='mx-auto w-[90%] bg-[#c76767]'>
                                        <ShoppingCart /> Buy Now
                                    </Button>
                                </div>
                            ))}
                        </HorizontalScrollTwo>
                        <HorizontalScrollTwo classNames='mt-5'>
                            {secondHalf.map((item, index) => (
                                <div key={index} className='flex flex-col'>
                                    <ProductCard
                                        shoppingCartIsTrue={false}
                                        exporeButtonIsTrue={false}
                                        classNames={{
                                            image: 'w-full h-28 objet-contain',
                                            title: 'text-md',
                                            subtitle: 'text-[12px]'
                                        }}
                                        index={index}
                                        item={item}
                                        key={item.title}
                                    />
                                    <Button className='mx-auto w-[90%] bg-[#c76767]'>
                                        <ShoppingCart /> Buy Now
                                    </Button>
                                </div>
                            ))}
                        </HorizontalScrollTwo>
                    </section>
                </>
            )}
            {/* in the above when user clidin on handlcategory then show that product and if ther euser search then show search prodct between them should show priority first handleselcte category */}
            {/* Top today products */}
        </div>
    );
}

export default CartWithSearch;
