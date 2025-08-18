"use client";

import { useState } from "react";

type OsRadioProps = {
  options: string[];
  onSelect: (option: string) => void;
  defaultSelected?: string;
  className?: string;
};

export default function OsRadio({
  options,
  onSelect,
  defaultSelected,
  className = "",
}: OsRadioProps) {
  const [selected, setSelected] = useState(defaultSelected || options[0]);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative bg-nebula-purple/20 border border-nebula-purple/30 rounded-lg p-1">
        {/* Background highlight bar */}
        <div
          className="absolute top-1 bottom-1 bg-starlight-yellow rounded-md transition-all duration-300 ease-in-out"
          style={{
            width: `${100 / options.length}%`,
            left: `${(options.findIndex(opt => opt === selected) / options.length) * 100}%`,
          }}
        />
        
        {/* Options */}
        <div className="relative flex">
          {options.map((option, index) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`
                flex-1 relative z-10 px-4 py-2 text-sm font-medium rounded-md transition-all duration-300 ease-in-out
                ${selected === option 
                  ? 'text-cosmic-black font-semibold' 
                  : 'text-milky-white hover:text-starlight-yellow'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
