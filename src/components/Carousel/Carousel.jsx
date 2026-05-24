import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Carousel.css';
import LeftNavButton from '../NavigationButtons/LeftNavButton';
import RightNavButton from '../NavigationButtons/RightNavButton';

const Carousel = ({ items, renderItem }) => {
  return (
    <div className="carouselWrapper">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: '.carousel-next',
          prevEl: '.carousel-prev',
        }}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 2 },
          900: { slidesPerView: 3 },
          1100: { slidesPerView: 4 },
        }}
        className="carousel"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id ?? item.title} className="carouselSlide">
            {renderItem(item)}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="carouselControls">
        <button type="button" className="carousel-prev carouselNavButton" aria-label="Previous slide">
          <LeftNavButton />
        </button>
        <button type="button" className="carousel-next carouselNavButton" aria-label="Next slide">
          <RightNavButton />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
