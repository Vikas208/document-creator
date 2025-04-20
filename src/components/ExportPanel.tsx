import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { useDocumentStore } from '../store/documentStore';
import { exportToPdf } from '../utils/exportUtils';
import { PaperFormat } from '../types';

const ExportPanel: React.FC = () => {
  const { paperFormat, setPaperFormat } = useDocumentStore();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportToPdf();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const paperFormats = [
    { value: PaperFormat.A4, label: 'A4' },
    { value: PaperFormat.A3, label: 'A3' },
    { value: PaperFormat.LETTER, label: 'Letter' },
    { value: PaperFormat.LEGAL, label: 'Legal' }
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Export</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Paper Format</label>
        <select
          value={paperFormat}
          onChange={(e) => setPaperFormat(e.target.value as PaperFormat)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        >
          {paperFormats.map((format) => (
            <option key={format.value} value={format.value}>
              {format.label}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={handleExport}
        disabled={isExporting}
        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
      >
        {isExporting ? (
          <span>Exporting...</span>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4" />
            Export as PDF
          </>
        )}
      </button>
      
      <div className="mt-4">
        <div className="flex items-center justify-center p-4 border border-gray-200 rounded-md bg-gray-50">
          <FileText className="h-8 w-8 text-gray-400" />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Your document</p>
            <p className="text-xs text-gray-500">Will be exported as PDF</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPanel;