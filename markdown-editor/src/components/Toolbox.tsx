import React from 'react';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Range, Element as SlateElement, Path, Node } from 'slate';
import { CustomText } from './types';

// Type aliases for formats
type BlockFormat = 'heading-one' | 'heading-two' | 'heading-three' | 'bulleted-list' | 'numbered-list' | 'divider';
type MarkFormat = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'highlight' | 'link';

// Check if a block format is active
const isBlockActive = (editor: Editor, format: BlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => SlateElement.isElement(n) && n.type === format,
  });
  return !!match;
};

// Check if a mark format is active
const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const marks = Editor.marks(editor) as Partial<CustomText>;
  return marks[format as keyof CustomText] === true;
};

const insertDivider = (editor: Editor) => {
  const { selection } = editor;
  console.log('Selection:', selection);

  if (selection) {
    const [node] = Editor.node(editor, selection.anchor.path);
    console.log('Current Node:', node);

    // Insert the divider at the current selection's path
    const currentPath = selection.anchor.path;
    console.log('Inserting divider at path:', currentPath);

    Transforms.insertNodes(editor, { type: 'divider', children: [{ text: '' }] }, { at: currentPath });
  } else {
    console.log('No selection found');
  }
};

// Toggle block formatting
const toggleBlock = (editor: Editor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format);
  const isList = format === 'numbered-list' || format === 'bulleted-list';

  if (format === 'divider') {
    // Insert a divider element at the current selection or cursor position
    console.log('heyy')
    insertDivider(editor);
    return;
  }

  // Unwrap existing lists if necessary
  if (isList) {
    Transforms.unwrapNodes(editor, {
      match: n => SlateElement.isElement(n) && (n.type === 'bulleted-list' || n.type === 'numbered-list'),
      split: true,
    });
  }

  // Set new block type
  const newType = isActive ? 'paragraph' : isList ? 'list-item' : format;
  Transforms.setNodes(editor, { type: newType });

  // Wrap in a list if necessary
  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

// Toggle mark formatting
const toggleMark = (editor: Editor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);
  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const Toolbox: React.FC = () => {
  const editor = useSlate();

  return (
    <div className="toolbox">
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, 'bold');
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, 'italic');
        }}
      >
        Italic
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, 'underline');
        }}
      >
        Underline
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, 'strikethrough');
        }}
      >
        Strike through
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, 'heading-one');
        }}
      >
        H1
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, 'heading-two');
        }}
      >
        H2
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, 'heading-three');
        }}
      >
        H3
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, 'bulleted-list');
        }}
      >
        Unordered list
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, 'numbered-list');
        }}
      >
        Ordered list
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleBlock(editor, 'divider');
        }}
      >
        Divider
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, 'highlight');
        }}
      >
        Highlight
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          // Handle link formatting if needed
        }}
      >
        Link
      </button>
    </div>
  );
};

export default Toolbox;
