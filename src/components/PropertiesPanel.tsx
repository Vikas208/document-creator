import React from 'react';
import { 
  AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, 
  Type, Image, Palette
} from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';
import ColorPicker from './ColorPicker';

const PropertiesPanel: React.FC = () => {
  const { selectedElement, updateElement } = useDocumentStore();

  if (!selectedElement) {
    return (
      <div className="p-4 text-center text-gray-500">
        <p>Select an element to edit its properties</p>
      </div>
    );
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (selectedElement.type === 'text') {
      updateElement(selectedElement.id, {
        ...selectedElement,
        content: e.target.value
      });
    }
  };

  const toggleTextStyle = (style: 'bold' | 'italic' | 'underline') => {
    if (selectedElement.type === 'text') {
      updateElement(selectedElement.id, {
        ...selectedElement,
        styles: {
          ...selectedElement.styles,
          [style]: !selectedElement.styles[style]
        }
      });
    }
  };

  const handleAlignmentChange = (alignment: 'left' | 'center' | 'right') => {
    if (selectedElement.type === 'text') {
      updateElement(selectedElement.id, {
        ...selectedElement,
        styles: {
          ...selectedElement.styles,
          textAlign: alignment
        }
      });
    }
  };

  const handleColorChange = (color: string) => {
    if (selectedElement) {
      updateElement(selectedElement.id, {
        ...selectedElement,
        styles: {
          ...selectedElement.styles,
          color
        }
      });
    }
  };

  const handleSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (selectedElement) {
      updateElement(selectedElement.id, {
        ...selectedElement,
        styles: {
          ...selectedElement.styles,
          fontSize: `${value}px`
        }
      });
    }
  };

  const renderTextProperties = () => {
    if (selectedElement.type !== 'text') return null;
    
    return (
      <>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Text Content</label>
          <textarea
            value={selectedElement.content}
            onChange={handleTextChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={3}
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Text Style</label>
          <div className="flex space-x-2">
            <button
              onClick={() => toggleTextStyle('bold')}
              className={`p-2 rounded ${selectedElement.styles.bold ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Bold size={16} />
            </button>
            <button
              onClick={() => toggleTextStyle('italic')}
              className={`p-2 rounded ${selectedElement.styles.italic ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Italic size={16} />
            </button>
            <button
              onClick={() => toggleTextStyle('underline')}
              className={`p-2 rounded ${selectedElement.styles.underline ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Underline size={16} />
            </button>
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Text Alignment</label>
          <div className="flex space-x-2">
            <button
              onClick={() => handleAlignmentChange('left')}
              className={`p-2 rounded ${selectedElement.styles.textAlign === 'left' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <AlignLeft size={16} />
            </button>
            <button
              onClick={() => handleAlignmentChange('center')}
              className={`p-2 rounded ${selectedElement.styles.textAlign === 'center' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <AlignCenter size={16} />
            </button>
            <button
              onClick={() => handleAlignmentChange('right')}
              className={`p-2 rounded ${selectedElement.styles.textAlign === 'right' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <AlignRight size={16} />
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderImageProperties = () => {
    if (selectedElement.type !== 'image') return null;
    
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
        <input
          type="text"
          value={selectedElement.src}
          onChange={(e) => updateElement(selectedElement.id, { ...selectedElement, src: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <p className="mt-1 text-xs text-gray-500">Enter a valid image URL</p>
      </div>
    );
  };

  const renderShapeProperties = () => {
    if (selectedElement.type !== 'shape') return null;
    
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Shape Background</label>
        <ColorPicker 
          color={selectedElement.styles.backgroundColor || '#e2e8f0'} 
          onChange={(color) => updateElement(selectedElement.id, {
            ...selectedElement,
            styles: {
              ...selectedElement.styles,
              backgroundColor: color
            }
          })}
        />
      </div>
    );
  };

  return (
    <div className="p-4 border-b border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Properties</h3>
      
      <div className="mb-4">
        <div className="flex items-center mb-2">
          {selectedElement.type === 'text' && <Type size={16} className="mr-2 text-blue-500" />}
          {selectedElement.type === 'image' && <Image size={16} className="mr-2 text-blue-500" />}
          {selectedElement.type === 'shape' && <Palette size={16} className="mr-2 text-blue-500" />}
          <span className="text-sm font-medium text-gray-700 capitalize">{selectedElement.type} Element</span>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500">X</label>
            <input
              type="number"
              value={Math.round(selectedElement.position.x)}
              onChange={(e) => updateElement(selectedElement.id, {
                ...selectedElement,
                position: {
                  ...selectedElement.position,
                  x: parseInt(e.target.value) || 0
                }
              })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Y</label>
            <input
              type="number"
              value={Math.round(selectedElement.position.y)}
              onChange={(e) => updateElement(selectedElement.id, {
                ...selectedElement,
                position: {
                  ...selectedElement.position,
                  y: parseInt(e.target.value) || 0
                }
              })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs text-gray-500">Width</label>
            <input
              type="number"
              value={selectedElement.size?.width || 100}
              onChange={(e) => updateElement(selectedElement.id, {
                ...selectedElement,
                size: {
                  ...selectedElement.size,
                  width: parseInt(e.target.value) || 100
                }
              })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500">Height</label>
            <input
              type="number"
              value={selectedElement.size?.height || 100}
              onChange={(e) => updateElement(selectedElement.id, {
                ...selectedElement,
                size: {
                  ...selectedElement.size,
                  height: parseInt(e.target.value) || 100
                }
              })}
              className="w-full px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
      
      {renderTextProperties()}
      {renderImageProperties()}
      {renderShapeProperties()}
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Text Color</label>
        <ColorPicker 
          color={selectedElement.styles.color || '#000000'} 
          onChange={handleColorChange}
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Font Size</label>
        <input
          type="range"
          min="8"
          max="72"
          value={parseInt((selectedElement.styles.fontSize || '16px').replace('px', ''))}
          onChange={handleSizeChange}
          className="w-full"
        />
        <div className="text-center text-sm text-gray-600">
          {selectedElement.styles.fontSize || '16px'}
        </div>
      </div>
    </div>
  );
};

export default PropertiesPanel;