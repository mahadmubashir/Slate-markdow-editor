import React, { useMemo, useState } from 'react';
import { Slate, Editable, withReact } from 'slate-react';
import { createEditor, Descendant } from 'slate';
import { withHistory } from 'slate-history';
import MarkdownElement from './MarkdownElement';
import Toolbox from './Toolbox';
import { CustomElement } from './types';
import MarkdownLeaf from './MarkdownLeaf';
import { handleKeyDown } from './HandleKeydown';

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

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Slate editor={editor} initialValue={value} onChange={(newValue) => setValue(newValue)}>
        <Editable 
          style={{ flex: 1, padding: '20px', fontSize: '18px', borderRight: '1px solid #ddd' }} // Make the editor bigger
          onKeyDown={handleKeyDown}
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
