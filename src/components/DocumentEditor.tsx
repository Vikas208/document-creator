import React, { useRef, useEffect } from 'react';
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { restrictToParentElement } from '@dnd-kit/modifiers';
import { useDocumentStore } from '../store/documentStore';
import ElementRenderer from './elements/ElementRenderer';
import TextElement from './elements/TextElement';
import ImageElement from './elements/ImageElement';
import ShapeElement from './elements/ShapeElement';
import { PaperFormat } from '../types';

const DocumentEditor: React.FC = () => {
  const { 
    elements, 
    selectedElement, 
    setSelectedElement,
    moveElement,
    paperFormat
  } = useDocumentStore();
  
  const editorRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event;
    
    if (!active) return;
    
    moveElement(active.id as string, {
      x: delta.x,
      y: delta.y
    });
    
    setActiveId(null);
  };

  const getPaperDimensions = () => {
    switch (paperFormat) {
      case PaperFormat.A4:
        return { width: '210mm', height: '297mm' };
      case PaperFormat.A3:
        return { width: '297mm', height: '420mm' };
      case PaperFormat.LETTER:
        return { width: '215.9mm', height: '279.4mm' };
      case PaperFormat.LEGAL:
        return { width: '215.9mm', height: '355.6mm' };
      default:
        return { width: '210mm', height: '297mm' };
    }
  };

  const paperDimensions = getPaperDimensions();

  const handleClick = (e: React.MouseEvent) => {
    if (e.target === editorRef.current) {
      setSelectedElement(null);
    }
  };

  const getActiveElement = () => {
    if (!activeId) return null;
    
    const element = elements.find(el => el.id === activeId);
    if (!element) return null;
    
    switch (element.type) {
      case 'text':
        return <TextElement element={element} preview />;
      case 'image':
        return <ImageElement element={element} preview />;
      case 'shape':
        return <ShapeElement element={element} preview />;
      default:
        return null;
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToParentElement]}
    >
      <div 
        ref={editorRef}
        onClick={handleClick}
        className="editor-container bg-white shadow-lg rounded-lg overflow-hidden"
        style={{
          width: paperDimensions.width,
          height: paperDimensions.height,
          position: 'relative',
        }}
      >
        {elements.map((element) => (
          <ElementRenderer
            key={element.id}
            element={element}
            isSelected={selectedElement?.id === element.id}
            onClick={() => setSelectedElement(element)}
          />
        ))}
        <DragOverlay>
          {getActiveElement()}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default DocumentEditor;