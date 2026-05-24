import { useEffect, useMemo, useState } from 'react';
import './Carousel.css';
import LeftNavButton from '../NavigationButtons/LeftNavButton';
import RightNavButton from '../NavigationButtons/RightNavButton';

const getVisibleCount = () => {
  if (typeof window === 'undefined') {
    return 4;
  }

  if (window.innerWidth >= 1100) {
    return 4;
  }

  if (window.innerWidth >= 900) {
    return 3;
  }

  return 2;
};

const Carousel = ({ items, renderItem }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() => getVisibleCount());

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      setCurrentIndex((prev) => Math.min(prev, Math.max(0, items.length - getVisibleCount())));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [items.length]);

  const visibleItems = useMemo(() => {
    const end = Math.min(items.length, currentIndex + visibleCount);
    return items.slice(currentIndex, end);
  }, [currentIndex, items, visibleCount]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + visibleCount < items.length;

  const goPrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - visibleCount));
  };

  const goNext = () => {
    setCurrentIndex((prev) => Math.min(items.length - visibleCount, prev + visibleCount));
  };

  return (
    <div className="carouselWrapper">
      <div className="carousel">
        {visibleItems.map((item) => (
          <div key={item.id ?? item.title} className="carouselItem">
            {renderItem(item)}
          </div>
        ))}
      </div>

      <div className="carouselControls">
        <button
          type="button"
          className="carousel-prev carouselNavButton"
          aria-label="Previous slide"
          onClick={goPrev}
          disabled={!canGoPrev}
        >
          <LeftNavButton />
        </button>
        <button
          type="button"
          className="carousel-next carouselNavButton"
          aria-label="Next slide"
          onClick={goNext}
          disabled={!canGoNext}
        >
          <RightNavButton />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
