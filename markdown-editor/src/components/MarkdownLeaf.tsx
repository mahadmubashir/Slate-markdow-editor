import React from 'react';

// Define the MarkdownLeaf component
const MarkdownLeaf: React.FC<{ attributes: any; children: any; leaf: any }> = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.strikethrough) {
    children = <del>{children}</del>;
  }

  if (leaf.highlight) {
    children = <mark style={{ backgroundColor: 'green', color: 'black' }}>{children}</mark>;
  }

  if (leaf.underline) {
    children = <span style={{ textDecoration: 'underline' }}>{children}</span>;
  }

  if (leaf.code) {
    children = <code>{children}</code>;
  }

  return <span {...attributes}>{children}</span>;
};

export default MarkdownLeaf;
