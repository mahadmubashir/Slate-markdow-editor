import React from 'react';
import { CustomElement } from './types';

// MarkdownElement component that renders different elements based on the type
const MarkdownElement: React.FC<{ attributes: any; children: any; element: CustomElement }> = ({ attributes, children, element }) => {
  switch (element.type) {
    case 'heading-one':
      return <h1 {...attributes}>{children}</h1>;
    case 'heading-two':
      return <h2 {...attributes}>{children}</h2>;
    case 'heading-three':
      return <h3 {...attributes}>{children}</h3>;
    case 'list-item':
      return <li {...attributes}>{children}</li>;
    case 'numbered-list':
      return <ol {...attributes}>{children}</ol>;
    case 'bulleted-list':
      return <ul {...attributes}>{children}</ul>;
    case 'divider':
      return <hr {...attributes} />;
      case 'paragraph':
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default MarkdownElement;