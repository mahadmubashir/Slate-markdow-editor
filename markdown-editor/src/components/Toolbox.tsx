import React from 'react';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Text } from 'slate';
import { CustomText } from './types';

// Type guard to check if a Node has a specific property
const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => Text.isText(n) && n[format as keyof CustomText] === true,
    universal: true,
  });

  return !!match;
};

const applyFormat = (editor: Editor, format: string, value?: string) => {
  const isActive = isFormatActive(editor, format);

  if (format === 'link' && value) {
    Transforms.setNodes(
      editor,
      { [format]: value },
      { match: n => Text.isText(n), split: true }
    );
  } else {
    Transforms.setNodes(
      editor,
      { [format]: isActive ? null : true } as Partial<CustomText>,
      { match: n => Text.isText(n), split: true }
    );
  }
};

const Toolbox: React.FC = () => {
  const editor = useSlate();

  return (
    <div className="toolbox">
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'bold');
        }}
      >
        Bold
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'italic');
        }}
      >
        Italic
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'underline');
        }}
      >
        Underline
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'strikethrough');
        }}
      >
        Strike through
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'heading-one', 'block');
        }}
      >
        H1
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'heading-two', 'block');
        }}
      >
        H2
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'heading-three', 'block');
        }}
      >
        H3
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'heading-four', 'block');
        }}
      >
        H4
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'link', 'mark');
        }}
      >
        Link
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'numbered-list', 'block');
        }}
      >
        Ordered list
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'bulleted-list', 'block');
        }}
      >
        Unordered list
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'highlight');
        }}
      >
        Highlight
      </button>
      <button
        onMouseDown={event => {
          event.preventDefault();
          applyFormat(editor, 'divider', 'block');
        }}
      >
        Divider
      </button>
    </div>
  );
};

export default Toolbox;