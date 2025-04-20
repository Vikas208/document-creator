import React from 'react';
import { TableElement as TableElementType } from '../../types';
import ContentEditable from 'react-contenteditable';
import { useDocumentStore } from '../../store/documentStore';

interface TableElementProps {
  element: TableElementType;
  preview?: boolean;
}

const TableElement: React.FC<TableElementProps> = ({ element, preview = false }) => {
  const { updateElement } = useDocumentStore();

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    if (preview) return;

    const newData = [...element.data];
    newData[rowIndex][colIndex] = value;

    updateElement(element.id, {
      ...element,
      data: newData
    });
  };

  const styles: React.CSSProperties = {
    width: `${element.size?.width || 400}px`,
    fontSize: element.styles.fontSize || '14px',
    borderCollapse: 'collapse' as const,
  };

  return (
    <table style={styles}>
      <tbody>
        {element.data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, colIndex) => (
              <td
                key={`${rowIndex}-${colIndex}`}
                style={{
                  border: `1px solid ${element.styles.borderColor || '#e2e8f0'}`,
                  padding: element.styles.cellPadding || '8px',
                  backgroundColor: rowIndex === 0 ? element.styles.headerBackgroundColor || '#f8fafc' : 'transparent',
                  textAlign: (element.styles.textAlign || 'left') as 'left' | 'center' | 'right',
                }}
              >
                {preview ? (
                  <div>{cell}</div>
                ) : (
                  <ContentEditable
                    html={cell}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    className="focus:outline-none w-full"
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableElement;