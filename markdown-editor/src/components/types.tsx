import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';

// Define a type for custom elements
export type CustomElement = 
  | { type: 'paragraph'; children: CustomText[] }
  | { type: 'heading-one'; children: CustomText[] }
  | { type: 'heading-two'; children: CustomText[] }
  | { type: 'heading-three'; children: CustomText[] }
  | { type: 'list-item'; children: CustomText[] }
  | { type: 'numbered-list'; children: CustomText[] }
  | { type: 'bulleted-list'; children: CustomText[] }
  | { type: 'divider'; children: CustomText[] }
  | { type: 'link'; url: string; children: CustomText[] };

// Define a type for custom text nodes
export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  highlight?: boolean;
  link?: string; // Representing the URL of the link
  orderedList?: boolean;
  unorderedList?: boolean;
};

// Extend the Slate types to include your custom types
declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}
