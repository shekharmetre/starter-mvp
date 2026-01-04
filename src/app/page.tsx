import AllProducts from '@/components/home/AllProducts';
import NewFeature from '@/components/home/NewFeature';
import PopularProduct from '@/components/home/PopularProduct';
import HeroSection from '@/components/home/hero-section';
import LottiePlayer from '@/hooks/lottiplayer';

import dangling from '../../public/dangling.json';

/**
 * The main page component that renders the HomePage component.
 *
 * @returns {JSX.Element} The rendered HomePage component.
 */
const Page = () => {
    return (
        <section id='home-page' className='relative w-full'>
            {' '}
            <LottiePlayer animationData={dangling} className='absolute left-14 h-[250px] w-full' loop={true} />
            <HeroSection />
            <PopularProduct />
            <NewFeature />
            <AllProducts />
        </section>
    );
};

export default Page;
