import React, { useState } from 'react';
import { Type, Image, Layout, Grid, Box, Circle, Triangle } from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';

const Toolbar: React.FC = () => {
  const { addElement } = useDocumentStore();
  const [showShapeMenu, setShowShapeMenu] = useState(false);

  const tools = [
    { id: 'text', name: 'Text', icon: Type, type: 'text' },
    { id: 'image', name: 'Image', icon: Image, type: 'image' },
    { id: 'shape', name: 'Shape', icon: Box, type: 'shape' },
    { id: 'template', name: 'Template', icon: Layout, type: 'template' },
    { id: 'table', name: 'Table', icon: Grid, type: 'table' }
  ];

  const shapes = [
    { id: 'rectangle', name: 'Rectangle', icon: Box, type: 'rectangle' },
    { id: 'circle', name: 'Circle', icon: Circle, type: 'circle' },
    { id: 'triangle', name: 'Triangle', icon: Triangle, type: 'triangle' }
  ];

  const handleAddElement = (type: string) => {
    if (type === 'shape') {
      setShowShapeMenu(true);
      return;
    }

    if (type === 'table') {
      addElement('table', { rows: 3, columns: 3 });
      return;
    }

    addElement(type);
  };

  const handleAddShape = (shapeType: string) => {
    addElement('shape', { shapeType });
    setShowShapeMenu(false);
  };

  return (
    <div className="w-full md:w-16 bg-white border-r border-gray-200 md:flex flex-col items-center py-4">
      <div className="flex md:flex-col items-center justify-around md:space-y-6 w-full md:w-auto">
        {tools.map((tool) => (
          <div key={tool.id} className="relative">
            <button
              onClick={() => handleAddElement(tool.type)}
              className="group flex flex-col items-center justify-center p-2 rounded-lg hover:bg-blue-50 transition-colors"
              title={tool.name}
            >
              <tool.icon className="h-6 w-6 text-gray-600 group-hover:text-blue-500" />
              <span className="text-xs mt-1 text-gray-500 group-hover:text-blue-500 hidden md:block">
                {tool.name}
              </span>
            </button>

            {tool.id === 'shape' && showShapeMenu && (
              <div className="absolute left-full ml-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                {shapes.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => handleAddShape(shape.type)}
                    className="flex items-center w-full p-2 hover:bg-blue-50 rounded transition-colors"
                  >
                    <shape.icon className="h-4 w-4 mr-2 text-gray-600" />
                    <span className="text-sm text-gray-700">{shape.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;