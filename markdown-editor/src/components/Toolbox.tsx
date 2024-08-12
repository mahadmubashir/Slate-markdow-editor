import React from 'react';
import { useSlate } from 'slate-react';
import { Editor, Transforms, Text, Node } from 'slate';

// Type guard to check if a Node has a specific property
const isFormatActive = (editor: Editor, format: string) => {
  const [match] = Editor.nodes(editor, {
    match: n => Text.isText(n) && n[format as keyof Node] === true,
    universal: true,
  });

  return !!match;
};

const applyFormat = (editor: Editor, format: string) => {
  const isActive = isFormatActive(editor, format);

  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true } as Partial<Node>,
    { match: n => Text.isText(n), split: true }
  );
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
        {/* Add more buttons for other formats */}
        <button
          onMouseDown={event => {
            event.preventDefault();
            applyFormat(editor, 'underline');
          }}
        >
          Underline
        </button>
        {/* Example for adding a heading */}
        <button
          onMouseDown={event => {
            event.preventDefault();
            applyFormat(editor, 'heading-one');
          }}
        >
          H1
        </button>
      </div>
    );
  };
  
  export default Toolbox;