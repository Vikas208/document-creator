import React, { useState } from 'react';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const colors = [
    '#000000', '#ffffff', '#f44336', '#e91e63', '#9c27b0', '#673ab7',
    '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722',
    '#795548', '#9e9e9e', '#607d8b'
  ];

  return (
    <div className="relative">
      <div 
        className="w-full flex items-center border border-gray-300 rounded-md p-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div 
          className="w-6 h-6 rounded-md mr-2" 
          style={{ backgroundColor: color }}
        />
        <span className="text-sm text-gray-700">{color}</span>
      </div>
      
      {isOpen && (
        <div className="absolute left-0 right-0 mt-1 p-2 bg-white border border-gray-200 rounded-md shadow-lg z-10">
          <div className="grid grid-cols-7 gap-1">
            {colors.map((c) => (
              <div
                key={c}
                className={`w-6 h-6 rounded-md cursor-pointer transition-transform hover:scale-110 ${color === c ? 'ring-2 ring-blue-500' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => {
                  onChange(c);
                  setIsOpen(false);
                }}
              />
            ))}
          </div>
          <div className="mt-2">
            <input
              type="text"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ColorPicker;