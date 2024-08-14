import React, { useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant, Editor, Transforms, Range, Element as SlateElement } from 'slate';
import { withHistory } from 'slate-history';
import MarkdownElement from './MarkdownElement';
import Toolbox from './Toolbox';
import { CustomElement } from './types';
import MarkdownLeaf from './MarkdownLeaf';
import useHandleKeyDown from './HandleKeydown';

// Define the initial value for the editor
const initialValue: CustomElement[] = [
  {
    type: 'paragraph',
    children: [{ text: 'A line of text in a paragraph.' }],
  },
];

// The main MarkdownEditor component
const MarkdownEditor: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { key, ctrlKey } = event;
    if (ctrlKey) {
      switch (key) {
        case 'b':
          // Apply bold format
          console.log('Bold format');
          break;
        case 'i':
          // Apply italic format
          console.log('Italic format');
          break;
        // Add more shortcuts as needed
        default:
          break;
      }
    }

    if (key === 'Enter') {
      const [match] = Editor.nodes(editor, { match: n => SlateElement.isElement(n) && n.type === 'divider' });

      if (match) {
        Transforms.insertNodes(editor, { type: 'paragraph', children: [{ text: '' }] }, { at: Editor.after(editor, []), select: true });
        event.preventDefault(); // Prevent default behavior
      }
    }

    if (key === 'Backspace' || key === 'Delete') {
      const { selection } = editor;

      if (selection && Range.isCollapsed(selection)) {
        const [match] = Editor.nodes(editor, { match: n => SlateElement.isElement(n) && n.type === 'divider' });

        if (match) {
          Transforms.removeNodes(editor, { match: n => SlateElement.isElement(n) && n.type === 'divider' });
          event.preventDefault(); // Prevent default behavior
        }
      }
    }
  };
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Slate editor={editor} initialValue={value} onChange={(newValue) => setValue(newValue)}>
        <Editable 
          style={{ flex: 1, padding: '20px', fontSize: '18px', borderRight: '1px solid #ddd' }} // Make the editor bigger
          onKeyDown={handleKeyDown} // Use the handleKeyDown function here
          renderElement={(props) => <MarkdownElement {...props} />}
          renderLeaf={(props) => <MarkdownLeaf {...props} />} // Use MarkdownLeaf for rendering leaf nodes
        />
        <div style={{ width: '300px', borderLeft: '1px solid #ddd', padding: '20px', boxSizing: 'border-box' }}>
          <Toolbox />
        </div>
      </Slate>
    </div>
  );
};

export default MarkdownEditor;
