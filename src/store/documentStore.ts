import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Element, TextElement, ImageElement, ShapeElement, TableElement, TemplateElement, Position, PaperFormat } from '../types';

interface DocumentState {
  title: string;
  elements: Element[];
  selectedElement: Element | null;
  paperFormat: PaperFormat;
  history: {
    past: Element[][];
    future: Element[][];
  };
  canUndo: boolean;
  canRedo: boolean;
  
  setTitle: (title: string) => void;
  setPaperFormat: (format: PaperFormat) => void;
  addElement: (type: string, options?: any) => void;
  updateElement: (id: string, element: Element) => void;
  removeElement: (id: string) => void;
  moveElement: (id: string, delta: Position) => void;
  setSelectedElement: (element: Element | null) => void;
  undo: () => void;
  redo: () => void;
}

export const useDocumentStore = create<DocumentState>((set, get) => ({
  title: 'Untitled Document',
  elements: [],
  selectedElement: null,
  paperFormat: PaperFormat.A4,
  history: {
    past: [],
    future: []
  },
  canUndo: false,
  canRedo: false,
  
  setTitle: (title) => set({ title }),
  
  setPaperFormat: (format) => set({ paperFormat: format }),
  
  addElement: (type, options = {}) => {
    const { elements } = get();
    const newElement = createNewElement(type, options);
    
    if (newElement) {
      set((state) => ({
        elements: [...state.elements, newElement],
        selectedElement: newElement,
        history: {
          past: [...state.history.past, elements],
          future: []
        },
        canUndo: true,
        canRedo: false
      }));
    }
  },
  
  updateElement: (id, updatedElement) => {
    const { elements } = get();
    
    set((state) => ({
      elements: state.elements.map((el) => 
        el.id === id ? updatedElement : el
      ),
      selectedElement: state.selectedElement?.id === id ? 
        updatedElement : state.selectedElement,
      history: {
        past: [...state.history.past, elements],
        future: []
      },
      canUndo: true,
      canRedo: false
    }));
  },
  
  removeElement: (id) => {
    const { elements, selectedElement } = get();
    
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== id),
      selectedElement: selectedElement?.id === id ? null : selectedElement,
      history: {
        past: [...state.history.past, elements],
        future: []
      },
      canUndo: true,
      canRedo: false
    }));
  },
  
  moveElement: (id, delta) => {
    const { elements } = get();
    const elementIndex = elements.findIndex((el) => el.id === id);
    
    if (elementIndex === -1) return;
    
    const updatedElements = [...elements];
    const element = { ...updatedElements[elementIndex] };
    
    element.position = {
      x: element.position.x + delta.x,
      y: element.position.y + delta.y
    };
    
    updatedElements[elementIndex] = element;
    
    set((state) => ({
      elements: updatedElements,
      selectedElement: state.selectedElement?.id === id ? 
        element : state.selectedElement,
      history: {
        past: [...state.history.past, elements],
        future: []
      },
      canUndo: true,
      canRedo: false
    }));
  },
  
  setSelectedElement: (element) => set({ selectedElement: element }),
  
  undo: () => {
    const { history } = get();
    
    if (history.past.length === 0) return;
    
    const newPast = [...history.past];
    const previousElements = newPast.pop();
    
    set((state) => ({
      elements: previousElements || [],
      selectedElement: null,
      history: {
        past: newPast,
        future: [state.elements, ...state.history.future]
      },
      canUndo: newPast.length > 0,
      canRedo: true
    }));
  },
  
  redo: () => {
    const { history } = get();
    
    if (history.future.length === 0) return;
    
    const newFuture = [...history.future];
    const nextElements = newFuture.shift();
    
    set((state) => ({
      elements: nextElements || [],
      selectedElement: null,
      history: {
        past: [...state.history.past, state.elements],
        future: newFuture
      },
      canUndo: true,
      canRedo: newFuture.length > 0
    }));
  }
}));

function createNewElement(type: string, options: any = {}): Element | null {
  const basePosition = { x: 100, y: 100 };
  const id = uuidv4();
  
  switch (type) {
    case 'text':
      return {
        id,
        type: 'text',
        content: 'Double-click to edit text',
        position: basePosition,
        size: { width: 200, height: 24 },
        styles: {
          color: '#000000',
          fontSize: '16px',
          textAlign: 'left',
          bold: false,
          italic: false,
          underline: false,
        }
      } as TextElement;
      
    case 'image':
      return {
        id,
        type: 'image',
        src: 'https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        alt: 'Image',
        position: basePosition,
        size: { width: 200, height: 150 },
        styles: {
          borderRadius: '0px',
        }
      } as ImageElement;
      
    case 'shape':
      return {
        id,
        type: 'shape',
        shapeType: options.shapeType || 'rectangle',
        position: basePosition,
        size: { width: 100, height: 100 },
        styles: {
          backgroundColor: '#e2e8f0',
          borderRadius: '0px',
          opacity: 1,
          rotate: 0,
        }
      } as ShapeElement;

    case 'table':
      const rows = options.rows || 3;
      const columns = options.columns || 3;
      const data = Array(rows).fill(null).map(() => 
        Array(columns).fill('Click to edit')
      );
      
      return {
        id,
        type: 'table',
        rows,
        columns,
        data,
        position: basePosition,
        size: { width: 400, height: rows * 40 },
        styles: {
          borderColor: '#e2e8f0',
          headerBackgroundColor: '#f8fafc',
          cellPadding: '8px',
          fontSize: '14px',
          textAlign: 'left',
        }
      } as TableElement;

    case 'template':
      return {
        id,
        type: 'template',
        templateType: options.templateType || 'content',
        elements: options.elements || [],
        position: basePosition,
        size: { width: '100%', height: 200 },
        styles: {
          backgroundColor: 'transparent',
          padding: '16px',
        }
      } as unknown as TemplateElement;
      
    default:
      return null;
  }
}