import { useEffect, useState } from 'react';
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

const Carousel = ({ items, renderItem, showControls = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(() => getVisibleCount());
  const [showAllTitles, setShowAllTitles] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
      setCurrentIndex((prev) => Math.min(prev, Math.max(0, items.length - getVisibleCount())));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [items.length]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex + visibleCount < items.length;

  const goPrev = () => {
    setShowAllTitles(false);
    setCurrentIndex((prev) => Math.max(0, prev - visibleCount));
  };

  const goNext = () => {
    setShowAllTitles(false);
    setCurrentIndex((prev) => Math.min(items.length - visibleCount, prev + visibleCount));
  };

  const isVisible = (index) => index >= currentIndex && index < currentIndex + visibleCount;

  return (
    <div className="carouselWrapper">
      <div className="carousel">
        {items.map((item, index) => (
          <div
            key={item.id ?? item.title}
            className="carouselItem"
            style={{ display: isVisible(index) ? 'flex' : 'none' }}
          >
            {renderItem(item, showAllTitles || isVisible(index))}
          </div>
        ))}
      </div>

      {showControls ? (
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
      ) : null}
    </div>
  );
};

export default Carousel;
