import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Statistics from '../components/Statistics';

const carouselData = [
  {
    image: 'https://images.unsplash.com/photo-1623690542431-efd4c6cd1cd7?auto=format&fit=crop&q=80',
    quote: 'Welcome to Mohan Reddy Marriage Bureau',
    showButtons: true
  },
  {
    image: 'https://images.unsplash.com/photo-1583939411023-14783179e581?auto=format&fit=crop&q=80',
    quote: 'Find Your Perfect Match'
  },
  {
    image: 'https://images.unsplash.com/photo-1621886292650-520f76c747d6?auto=format&fit=crop&q=80',
    quote: 'Trusted Matrimonial Service'
  },
  {
    image: 'https://images.unsplash.com/photo-1620571514278-75eafd09ae80?auto=format&fit=crop&q=80',
    quote: 'Building Happy Families'
  }
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-red-50">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="h-[400px] md:h-[600px]"
      >
        {carouselData.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full">
              <img
                src={slide.image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white px-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-8 text-center">
                  {slide.quote}
                </h2>
                {slide.showButtons && (
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                    <Link
                      to="/grooms"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
                    >
                      <i className="fas fa-male text-xl"></i>
                      <span>Looking for Groom (వరుడు కావలెను)</span>
                    </Link>
                    <Link
                      to="/brides"
                      className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-6 py-3 rounded-full transition-all transform hover:scale-105"
                    >
                      <i className="fas fa-female text-xl"></i>
                      <span>Looking for Bride (వధువు కావలెను)</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <Statistics />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Welcome to Mohan Reddy Marriage Bureau, your trusted partner in finding the perfect life companion. 
            With over 15 years of dedicated service in matchmaking, we have successfully united thousands of 
            couples and families. Our personalized approach, understanding of traditional values, and commitment 
            to creating lasting relationships have made us a preferred choice in matrimonial services.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;