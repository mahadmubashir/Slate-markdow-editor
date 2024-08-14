import { Editor, Transforms, Range, Element as SlateElement } from 'slate';
import { useSlate } from 'slate-react';

// Extract reusable logic to a custom hook
const useHandleKeyDownLogic = () => {
  const editor = useSlate();

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

  return handleKeyDown;
};

export default useHandleKeyDownLogic;
