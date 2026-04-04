import { useState } from 'react';

export function AdminCard({ image, name, title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative mb-6 w-full max-w-xs transition-transform duration-500 ease-in-out"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow background */}
        <div
          className={`absolute inset-0 rounded-lg transition-all duration-700 ease-in-out ${
            isHovered
              ? 'opacity-100 blur-xl scale-105'
              : 'opacity-0 blur-3xl scale-100'
          }`}
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, #990404 0%, #c5a059 100%)'
              : 'transparent',
          }}
        />

        {/* Image container */}
        <div className="relative rounded-lg overflow-hidden aspect-[4/5] shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105">
          <img
            src={image}
            alt={name}
            className={`w-full h-full object-cover transition-all duration-700 ease-in-out ${
              isHovered ? 'grayscale-0' : 'grayscale'
            }`}
          />

          {/* Overlay glow effect on hover */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              isHovered ? 'opacity-50' : 'opacity-0'
            }`}
            style={{
              background:
                'linear-gradient(to top, rgba(153,4,4,0.2), rgba(197,160,89,0.2))',
            }}
          />
        </div>
      </div>

      {/* Text content */}
      <div className="text-center w-full transition-colors duration-500 ease-in-out">
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-1">
          {name}
        </h3>
        <p
          className={`text-sm md:text-base font-semibold mb-3 transition-colors duration-500 ${
            isHovered ? 'text-red-700' : 'text-[#990404]'
          }`}
        >
          {title}
        </p>
        <p className="text-sm md:text-base text-gray-500 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
