import React from 'react';
import { TextElement as TextElementType } from '../../types';
import ContentEditable from 'react-contenteditable';
import { useDocumentStore } from '../../store/documentStore';

interface TextElementProps {
  element: TextElementType;
  preview?: boolean;
}

const TextElement: React.FC<TextElementProps> = ({ element, preview = false }) => {
  const { updateElement } = useDocumentStore();
  const html = React.useRef(element.content);

  const handleChange = (e: { target: { value: string } }) => {
    html.current = e.target.value;
    updateElement(element.id, {
      ...element,
      content: e.target.value
    });
  };

  const styles: React.CSSProperties = {
    width: `${element.size?.width || 200}px`,
    minHeight: `${element.size?.height || 24}px`,
    color: element.styles.color || '#000',
    fontSize: element.styles.fontSize || '16px',
    fontWeight: element.styles.bold ? 'bold' : 'normal',
    fontStyle: element.styles.italic ? 'italic' : 'normal',
    textDecoration: element.styles.underline ? 'underline' : 'none',
    textAlign: element.styles.textAlign || 'left',
    padding: '4px',
    border: preview ? 'none' : '1px dashed transparent',
    outline: 'none',
    backgroundColor: element.styles.backgroundColor || 'transparent',
    borderRadius: element.styles.borderRadius || '0px',
  };

  if (preview) {
    return (
      <div
        style={styles}
        dangerouslySetInnerHTML={{ __html: element.content }}
      />
    );
  }

  return (
    <ContentEditable
      html={html.current}
      onChange={handleChange}
      style={styles}
      className="focus:border-blue-300 hover:border-gray-200"
    />
  );
};

export default TextElement;