import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { useDocumentStore } from '../store/documentStore';
import { PaperFormat } from '../types';

export const exportToPdf = async (): Promise<void> => {
  const store = useDocumentStore.getState();
  const { paperFormat, title } = store;
  
  // Find the editor container
  const editorContainer = document.querySelector('.editor-container') as HTMLElement;
  
  if (!editorContainer) {
    throw new Error('Editor container not found');
  }
  
  try {
    // Temporarily remove selection highlights
    const selectedElements = document.querySelectorAll('.ring-2');
    selectedElements.forEach(el => {
      (el as HTMLElement).style.boxShadow = 'none';
      (el as HTMLElement).style.outline = 'none';
    });
    
    // Wait for any animations to complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // Capture the canvas
    const canvas = await html2canvas(editorContainer, {
      scale: 2, // Higher scale for better quality
      useCORS: true, // Enable CORS for images
      allowTaint: true,
      backgroundColor: '#ffffff',
    });
    
    // Create PDF with the appropriate dimensions
    const pdf = getPdfForFormat(paperFormat);
    
    // Add the canvas as an image to the PDF
    const imgData = canvas.toDataURL('image/png');
    pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
    
    // Save the PDF
    pdf.save(`${title || 'document'}.pdf`);
    
    // Restore selection highlights
    selectedElements.forEach(el => {
      (el as HTMLElement).style.removeProperty('box-shadow');
      (el as HTMLElement).style.removeProperty('outline');
    });
    
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    throw error;
  }
};

const getPdfForFormat = (format: PaperFormat): jsPDF => {
  switch (format) {
    case PaperFormat.A4:
      return new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
    case PaperFormat.A3:
      return new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a3'
      });
    case PaperFormat.LETTER:
      return new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'letter'
      });
    case PaperFormat.LEGAL:
      return new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'legal'
      });
    default:
      return new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
  }
};