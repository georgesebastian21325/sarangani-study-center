import { useState, useEffect, useCallback } from 'react';
import img1 from '../../../public/gallery-picture-1.jpg';
import img2 from '../../../public/gallery-picture-2.jpg';
import img3 from '../../../public/gallery-picture-3.jpg';
import img4 from '../../../public/gallery-picture-4.jpg';
import img5 from '../../../public/gallery-picture-5.jpg';

const images = [img1, img2, img3, img4, img5];

export default function GallerySection() {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getPosition = (index) => {
    const isActive = index === current;
    const isLeft = index === (current - 1 + images.length) % images.length;
    const isRight = index === (current + 1) % images.length;
    return { isActive, isLeft, isRight };
  };

  return (
    <section className="w-full py-24 flex flex-col items-center bg-gradient-to-b from-primary to-tertiary">
      {/* Section Header */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl md:text-4xl  font-bold text-white mb-4">
          Highlights
        </h2>
        <p className="text-gray-300 max-w-4xl mx-auto text-sm md:text-base">
          A glimpse into the life of our community—events, formation, and shared
          experiences that bring us closer to our mission.
        </p>
      </div>

      {/* Carousel wrapper — fixed height so all cards sit on the same baseline */}
      <div
        className="relative w-full max-w-5xl px-10"
        style={{ height: '380px' }}
      >
        {/* Track */}
        <div className="absolute inset-0 flex items-center justify-center">
          {images.map((img, index) => {
            const { isActive, isLeft, isRight } = getPosition(index);
            const visible = isActive || isLeft || isRight;

            return (
              <div
                key={index}
                className="absolute transition-all duration-700 ease-in-out rounded-xl overflow-hidden shadow-2xl"
                style={{
                  /* Fixed dimensions for every card */
                  width: isActive ? '54%' : '36%',
                  height: isActive ? '340px' : '280px',

                  /* Center all cards, then shift left/right ones */
                  left: '50%',
                  top: '50%',
                  transform: `
                    translate(-50%, -50%)
                    translateX(${
                      isActive ? '0%' : isLeft ? '-82%' : isRight ? '82%' : '0%'
                    })
                  `,

                  opacity: isActive ? 1 : isLeft || isRight ? 0.45 : 0,
                  filter: isLeft || isRight ? 'blur(1px)' : 'none',
                  zIndex: isActive ? 30 : visible ? 20 : 10,
                  pointerEvents: visible ? 'auto' : 'none',
                }}
              >
                <img
                  src={img}
                  alt={`gallery-${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Left Arrow */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center text-white text-4xl hover:text-[#c5a059] transition-colors duration-200 select-none"
          aria-label="Previous"
        >
          ‹
        </button>

        {/* Right Arrow */}
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-40 w-10 h-10 flex items-center justify-center text-white text-4xl hover:text-[#c5a059] transition-colors duration-200 select-none"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex items-center gap-3 mt-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full cursor-pointer transition-all duration-300
              ${current === index ? 'w-8 bg-[#c5a059]' : 'w-2 bg-white/40'}
            `}
          />
        ))}
      </div>
    </section>
  );
}
