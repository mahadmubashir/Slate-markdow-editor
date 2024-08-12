import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

// Define a type for custom elements
export type CustomElement = {
  type: 'paragraph' | 'heading-one' | 'heading-two' | 'heading-three';
  children: CustomText[];
};

// Define a type for custom text nodes
export type CustomText = { text: string; bold?: boolean; italic?: boolean };

// Extend the Slate types to include your custom types
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}