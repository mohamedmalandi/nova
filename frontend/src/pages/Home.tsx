import { useState } from 'react';
import Hero from '../components/ui/Hero';
import Store from '../components/sections/Store';
import Events from '../components/sections/Events';
import TrustFAQ from '../components/sections/TrustFAQ';
import About from '../components/sections/About';
import OurClan from '../components/sections/OurClan';
import SocialPlatforms from '../components/sections/SocialPlatforms';
import OrderModal from '../components/ui/OrderModal';

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    const handleOrderClick = (product: any) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <section id="home">
                <Hero />
            </section>
            <section id="products">
                <Store onOrderClick={handleOrderClick} />
            </section>
            <section id="events">
                <Events />
            </section>
            <section id="community">
                <About />
                <TrustFAQ />
            </section>
            <section id="clan">
                <OurClan />
                <SocialPlatforms />
            </section>

            <OrderModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                product={selectedProduct}
            />
        </div>
    );
};

export default Home;
