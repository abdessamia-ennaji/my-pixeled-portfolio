import React from 'react';

// Dynamically import all SVGs in the folder
const svgModules = import.meta.glob('../assets/pixel-icons/*.svg', { eager: true, as: 'raw' });

// Create a mapping of icon names to their SVG content
const icons = Object.entries(svgModules).reduce((acc, [path, content]) => {
  const name = path.split('/').pop()?.replace('.svg', '') || '';
  // Replace hardcoded `fill` attributes with `currentColor`
  acc[name] = content.replace(/fill="#[^"]+"/g, 'fill="currentColor"');
  return acc;
}, {});

// Icon Component
const Icon = ({ name, className = '' }) => {
  const svgContent = icons[name];

  if (!svgContent) {
    console.error(`Icon '${name}' not found!`);
    return <span>Icon not found</span>;
  }

  return (
    <div
      className={`icon ${className}`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

export default Icon;