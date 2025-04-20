export enum PaperFormat {
  A4 = 'a4',
  A3 = 'a3',
  LETTER = 'letter',
  LEGAL = 'legal'
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface BaseElement {
  id: string;
  type: string;
  position: Position;
  size?: Size;
  styles: Record<string, any>;
}

export interface TextElement extends BaseElement {
  type: 'text';
  content: string;
  styles: {
    color?: string;
    fontSize?: string;
    textAlign?: 'left' | 'center' | 'right';
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
    backgroundColor?: string;
    borderRadius?: string;
  };
}

export interface ImageElement extends BaseElement {
  type: 'image';
  src: string;
  alt?: string;
  styles: {
    borderRadius?: string;
    border?: string;
  };
}

export interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'triangle';
  styles: {
    backgroundColor?: string;
    borderRadius?: string;
    border?: string;
    opacity?: number;
    rotate?: number;
  };
}

export interface TableElement extends BaseElement {
  type: 'table';
  rows: number;
  columns: number;
  data: string[][];
  styles: {
    borderColor?: string;
    headerBackgroundColor?: string;
    cellPadding?: string;
    fontSize?: string;
    textAlign?: 'left' | 'center' | 'right';
  };
}

export interface TemplateElement extends BaseElement {
  type: 'template';
  templateType: 'header' | 'content' | 'footer';
  elements: Element[];
  styles: {
    backgroundColor?: string;
    padding?: string;
  };
}

export type Element = TextElement | ImageElement | ShapeElement | TableElement | TemplateElement;

export interface DocumentSettings {
  title: string;
  paperFormat: PaperFormat;
  elements: Element[];
}

export interface Template {
  id: string;
  name: string;
  elements: Element[];
  thumbnail: string;
}