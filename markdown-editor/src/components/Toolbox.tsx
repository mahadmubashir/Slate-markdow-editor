import React from 'react';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Element as SlateElement, Text } from 'slate';
import { CustomText, CustomElement } from './types';

// Define allowed formats for text and block types
type MarkFormat = 'bold' | 'italic' | 'underline' | 'strikethrough' | 'highlight' | 'link';
type BlockFormat = 'paragraph' | 'heading-one' | 'heading-two' | 'heading-three' | 'list-item' | 'numbered-list' | 'bulleted-list' | 'divider';

// Check if a specific mark format is active
const isMarkActive = (editor: Editor, format: MarkFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => Text.isText(n) && n[format as keyof CustomText] === true,
    universal: true,
  });
  return !!match;
};

// Check if a specific block format is active
const isBlockActive = (editor: Editor, format: BlockFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => SlateElement.isElement(n) && n.type === format,
  });
  return !!match;
};

// Apply a mark format
const toggleMark = (editor: Editor, format: MarkFormat) => {
  const isActive = isMarkActive(editor, format);
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true } as Partial<CustomText>,
    { match: n => Text.isText(n), split: true }
  );
};

// Apply a block format
const toggleBlock = (editor: Editor, format: BlockFormat) => {
  const isActive = isBlockActive(editor, format);
  Transforms.setNodes(
    editor,
    { type: isActive ? 'paragraph' : format },
    { match: n => SlateElement.isElement(n) }
  );
};

const Toolbox: React.FC = () => {
  const editor = useSlate();

  return (
    <div className="toolbox">
      {/* Mark Formats */}
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
          toggleMark(editor, 'highlight');
        }}
      >
        Highlight
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          toggleMark(editor, 'link');
        }}
      >
        Link
      </button>

      {/* Block Formats */}
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
          toggleBlock(editor, 'numbered-list');
        }}
      >
        Ordered list
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
          toggleBlock(editor, 'divider');
        }}
      >
        Divider
      </button>
    </div>
  );
};

export default Toolbox;
