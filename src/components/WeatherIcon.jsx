import React, { memo } from "react";

const WeatherIcon = memo(
  ({ name, className = "w-16 h-16", ariaHidden = true }) => {
    const icons = {
      Clear: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          <defs>
            <filter id="blur" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
              <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#blur)" transform="translate(5, 5)">
            <circle
              cx="24"
              cy="18"
              r="7"
              fill="#FDB813"
              stroke="#FDB813"
              strokeWidth="2"
            />
            <g className="am-weather-sun">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                <g key={i} transform={`rotate(${angle} 24 18)`}>
                  <line
                    fill="none"
                    stroke="#FDB813"
                    strokeLinecap="round"
                    strokeWidth="2"
                    x1="24"
                    y1="18"
                    x2="24"
                    y2="10"
                  />
                </g>
              ))}
            </g>
          </g>
        </svg>
      ),
      Clouds: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          <defs>
            <filter id="blur" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
              <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#blur)" transform="translate(5, 5)">
            <g transform="translate(0,16)">
              <path
                d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7
              c0,0.8,0.2,1.6,0.4,2.3c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
                fill="#E6E6E6"
                stroke="white"
                strokeLinejoin="round"
                strokeWidth="1.2"
              />
            </g>
          </g>
        </svg>
      ),
      Rain: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          <defs>
            <filter id="blur" width="200%" height="200%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
              <feOffset in="blur" dx="0" dy="4" result="offsetBlur" />
              <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.5" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#blur)" transform="translate(5, 5)">
            <g transform="translate(0,16)">
              <path
                d="M47.7,35.4c0-4.6-3.7-8.2-8.2-8.2c-1,0-1.9,0.2-2.8,0.5c-0.3-3.4-3.1-6.2-6.6-6.2c-3.7,0-6.7,3-6.7,6.7
              c0,0.8,0.2,1.6,0.4,2.3c-0.3-0.1-0.7-0.1-1-0.1c-3.7,0-6.7,3-6.7,6.7c0,3.6,2.9,6.6,6.5,6.7l17.2,0C44.2,43.3,47.7,39.8,47.7,35.4z"
                fill="#57A0EE"
                stroke="white"
                strokeLinejoin="round"
                strokeWidth="1.2"
              />
            </g>
            <g transform="translate(20, 35)">
              <line
                fill="none"
                stroke="#4B89D6"
                strokeLinecap="round"
                strokeWidth="2"
                x1="0"
                y1="0"
                x2="0"
                y2="5"
              />
              <line
                fill="none"
                stroke="#4B89D6"
                strokeLinecap="round"
                strokeWidth="2"
                x1="5"
                y1="0"
                x2="5"
                y2="5"
              />
              <line
                fill="none"
                stroke="#4B89D6"
                strokeLinecap="round"
                strokeWidth="2"
                x1="10"
                y1="0"
                x2="10"
                y2="5"
              />
            </g>
          </g>
        </svg>
      ),
      // ... include all other icon definitions from your original code
      Drizzle: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          {/* Drizzle SVG content */}
        </svg>
      ),
      Thunderstorm: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          {/* Thunderstorm SVG content */}
        </svg>
      ),
      Snow: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          {/* Snow SVG content */}
        </svg>
      ),
      Mist: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          {/* Mist SVG content */}
        </svg>
      ),
      Sunny: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          {/* Sunny SVG content */}
        </svg>
      ),
      CloudySun: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          {/* CloudySun SVG content */}
        </svg>
      ),
      PartlyCloudy: (
        <svg
          viewBox="0 0 64 64"
          className={className}
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden={ariaHidden}
        >
          {/* PartlyCloudy SVG content */}
        </svg>
      ),
    };

    return icons[name] || icons.Clouds;
  }
);

WeatherIcon.displayName = "WeatherIcon";

export default WeatherIcon;
