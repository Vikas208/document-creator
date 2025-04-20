import React from 'react';
import { TemplateElement as TemplateElementType } from '../../types';
import ElementRenderer from './ElementRenderer';
import { useDocumentStore } from '../../store/documentStore';

interface TemplateElementProps {
  element: TemplateElementType;
  preview?: boolean;
}

const TemplateElement: React.FC<TemplateElementProps> = ({ element, preview = false }) => {
  const { selectedElement } = useDocumentStore();

  const styles: React.CSSProperties = {
    width: `${element.size?.width || '100%'}`,
    minHeight: `${element.size?.height || 100}px`,
    backgroundColor: element.styles.backgroundColor || 'transparent',
    padding: element.styles.padding || '16px',
    position: 'relative',
  };

  return (
    <div style={styles}>
      {element.elements.map((childElement) => (
        <ElementRenderer
          key={childElement.id}
          element={childElement}
          isSelected={selectedElement?.id === childElement.id}
          onClick={() => {}}
        />
      ))}
    </div>
  );
};

export default TemplateElement;