import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Trash2 } from 'lucide-react';
import TextElement from './TextElement';
import ImageElement from './ImageElement';
import ShapeElement from './ShapeElement';
import TableElement from './TableElement';
import TemplateElement from './TemplateElement';
import { Element } from '../../types';
import { useDocumentStore } from '../../store/documentStore';

interface ElementRendererProps {
  element: Element;
  isSelected: boolean;
  onClick: () => void;
}

const ElementRenderer: React.FC<ElementRendererProps> = ({ 
  element, 
  isSelected,
  onClick 
}) => {
  const { removeElement } = useDocumentStore();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: element.id,
  });
  
  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${element.position.x}px`,
    top: `${element.position.y}px`,
    transform: transform ? 
      `translate3d(${transform.x}px, ${transform.y}px, 0)` : 
      undefined,
    zIndex: isSelected ? 10 : 1,
    cursor: 'move'
  };

  let ElementComponent;
  switch (element.type) {
    case 'text':
      ElementComponent = TextElement;
      break;
    case 'image':
      ElementComponent = ImageElement;
      break;
    case 'shape':
      ElementComponent = ShapeElement;
      break;
    case 'table':
      ElementComponent = TableElement;
      break;
    case 'template':
      ElementComponent = TemplateElement;
      break;
    default:
      return null;
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeElement(element.id);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`element-wrapper group ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
      {...attributes}
      {...listeners}
    >
      <ElementComponent element={element} />
      
      {isSelected && (
        <>
          <div className="absolute -top-2 -left-2 -right-2 -bottom-2 border-2 border-blue-500 border-dashed rounded-sm pointer-events-none" />
          <button
            onClick={handleDelete}
            className="absolute -top-3 -right-3 p-1 bg-red-500 text-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            title="Delete element"
          >
            <Trash2 size={14} />
          </button>
        </>
      )}
    </div>
  );
};

export default ElementRenderer;