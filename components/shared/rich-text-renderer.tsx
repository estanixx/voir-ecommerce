// In components/RichTextRenderer.tsx

import React from 'react';

// Define basic types for the rich text nodes.
// You can extend these as needed for other types like lists, headings, etc.
type RichTextNode = {
  type: string;
  children?: RichTextNode[];
  value?: string;
  [key: string]: unknown; // Allow other properties
};

// The main renderer function that will recursively render nodes
const renderNode = (node: RichTextNode, index: number): React.ReactNode => {
  switch (node.type) {
    case 'root':
      // The root object just renders its children
      return <>{node.children?.map(renderNode)}</>;

    case 'paragraph':
      // Render a <p> tag and its children.
      // We use `pre-wrap` to respect newlines (\n) from the text value.
      return (
        <p key={index} style={{ whiteSpace: 'pre-wrap' }}>
          {node.children?.map(renderNode)}
        </p>
      );

    case 'text':
      // Render the actual text value
      return node.value;

    // --- Add more cases here as needed ---
    // Example for headings:
    // case 'heading':
    //   const Tag = `h${node.level}` as keyof JSX.IntrinsicElements;
    //   return <Tag key={index}>{node.children?.map(renderNode)}</Tag>;

    // Example for lists:
    // case 'list':
    //    const ListTag = node.listType === 'ordered' ? 'ol' : 'ul';
    //    return <ListTag key={index}>{node.children?.map(renderNode)}</ListTag>

    // case 'list-item':
    //    return <li key={index}>{node.children?.map(renderNode)}</li>

    default:
      // Return null for unknown node types
      return null;
  }
};

type RichTextRendererProps = {
  jsonString: string;
};

const RichTextRenderer: React.FC<RichTextRendererProps> = ({ jsonString }) => {
  try {
    const data: RichTextNode = JSON.parse(jsonString);
    return <>{renderNode(data, 0)}</>;
  } catch (error) {
    console.error('Failed to parse rich text JSON:', error);
    // Optionally render the raw string or an error message as a fallback
    return <div>{jsonString}</div>;
  }
};

export default RichTextRenderer;