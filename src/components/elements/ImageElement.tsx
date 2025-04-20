import React from 'react';
import { ImageElement as ImageElementType } from '../../types';

interface ImageElementProps {
  element: ImageElementType;
  preview?: boolean;
}

const ImageElement: React.FC<ImageElementProps> = ({ element, preview = false }) => {
  const [error, setError] = React.useState(false);
  
  const handleError = () => {
    setError(true);
  };
  
  const styles: React.CSSProperties = {
    width: `${element.size?.width || 200}px`,
    height: `${element.size?.height || 200}px`,
    objectFit: 'cover',
    borderRadius: element.styles.borderRadius || '0px',
    border: element.styles.border || 'none',
  };
  
  if (error) {
    return (
      <div 
        style={{
          ...styles,
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#6b7280',
          fontSize: '14px',
          padding: '8px',
          textAlign: 'center'
        }}
      >
        Image could not be loaded
      </div>
    );
  }
  
  return (
    <img
      src={element.src}
      alt={element.alt || 'Document image'}
      style={styles}
      onError={handleError}
      draggable={false}
    />
  );
};

export default ImageElement;