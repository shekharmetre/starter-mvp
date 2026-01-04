import Image from 'next/image';

import { splitTextByWords } from '@/lib/helper';

export function SvGCardDesign({ data, color }: { data: any; color: string }) {
    const { firstLine, secondLine } = splitTextByWords(
        data?.title ?? 'shekhar metrevijay',
        16, // ⬅️ first line character limit
        14 // ⬅️ second line truncate limit (optional)
    );

    return (
        <div className='relative mb-20'>
            <svg
                xmlns='http://www.w3.org/2000/svg'
                className='rounded-md'
                width='170'
                height='240'
                fill='none'
                viewBox='0 0 250 385'>
                <path fill='#fff' d='M0 0h271v385H0z' />
                <path fill={color} d='M0 0h274v129L0 237V0Z' />
                <circle cx='153.5' cy='217.5' r='93.5' fill='#D9D9D9' />
                <rect width='188.508' height='187' x='53' y='134' fill='url(#a)' rx='93.5' />
                <circle cx='5' cy='5' r='5' fill='#FF859C' transform='matrix(-1 0 0 1 18 353)' />
                <circle cx='5' cy='5' r='5' fill='#FF859C' transform='matrix(-1 0 0 1 35 353)' />
                <circle cx='5' cy='5' r='5' fill='#FF859C' transform='matrix(-1 0 0 1 52 353)' />
                <circle cx='5' cy='5' r='5' fill='#FFD7CB' transform='matrix(-1 0 0 1 69 353)' />
                <circle cx='5' cy='5' r='5' fill='#FFD7CB' transform='matrix(-1 0 0 1 86 353)' />
                <text
                    x='83'
                    y='35' // ⬅️ adjusted UP from 51.5
                    textAnchor='middle'
                    fill='#000'
                    fontSize='20'
                    fontWeight='600'
                    fontFamily='Inter, system-ui, sans-serif'>
                    <tspan x='90' fontSize='22' fontWeight='600'>
                        {firstLine}
                    </tspan>
                    <tspan x='90' dy={24} fontSize='22' fontWeight='600'>
                        {secondLine}
                    </tspan>
                </text>
                <circle cx='213.5' cy='51.5' r='38.5' fill='#FFDACB' />
                <text x='213.5' y='60' textAnchor='middle' fill='#000' fontFamily='Inter, system-ui, sans-serif'>
                    <tspan x='215.5' fontSize='20' fontWeight='600'>
                        {/* Line 1 text */}₹ {data?.price}
                    </tspan>
                </text>

                <defs>
                    <pattern id='a' width='1' height='1' patternContentUnits='objectBoundingBox'>
                        <use href='#b' transform='scale(.002 .00202)' />
                    </pattern>
                </defs>
            </svg>
            <Image
                src={data?.image || ''}
                alt='dynamic'
                width={500}
                height={500}
                className='absolute top-20 left-10 h-[7em] w-[7em] rounded-full object-cover'
            />
            <button className='absolute right-7 bottom-2 rounded-md bg-[#0A4178] p-1 px-2 text-[10px] font-semibold text-white italic'>
                ADD TO CART
            </button>
        </div>
    );
}

{
    /*  */
}
