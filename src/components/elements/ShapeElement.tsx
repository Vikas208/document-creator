import React from 'react';
import { ShapeElement as ShapeElementType } from '../../types';

interface ShapeElementProps {
  element: ShapeElementType;
  preview?: boolean;
}

const ShapeElement: React.FC<ShapeElementProps> = ({ element, preview = false }) => {
  const styles: React.CSSProperties = {
    width: `${element.size?.width || 100}px`,
    height: `${element.size?.height || 100}px`,
    backgroundColor: element.styles.backgroundColor || '#e2e8f0',
    borderRadius: element.shapeType === 'circle' ? '50%' : element.styles.borderRadius || '0px',
    border: element.styles.border || 'none',
    opacity: element.styles.opacity || 1,
    transform: `rotate(${element.styles.rotate || 0}deg)`,
  };

  if (element.shapeType === 'triangle') {
    return (
      <div
        style={{
          width: 0,
          height: 0,
          borderLeft: `${(element.size?.width || 100) / 2}px solid transparent`,
          borderRight: `${(element.size?.width || 100) / 2}px solid transparent`,
          borderBottom: `${element.size?.height || 100}px solid ${element.styles.backgroundColor || '#e2e8f0'}`,
          opacity: element.styles.opacity || 1,
          transform: `rotate(${element.styles.rotate || 0}deg)`,
        }}
      />
    );
  }
  
  return <div style={styles} />;
};

export default ShapeElement;