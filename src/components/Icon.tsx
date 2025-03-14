// No need to import React if not using JSX transformation issues

// Dynamically import all SVGs in the folder
const svgModules = import.meta.glob('../assets/pixel-icons/*.svg', { eager: true, as: 'raw' });

// Define the type for the icons mapping
const icons: Record<string, string> = Object.entries(svgModules).reduce((acc, [path, content]) => {
  const name = path.split('/').pop()?.replace('.svg', '') || '';
  acc[name] = (content as string).replace(/fill="#[^"]+"/g, 'fill="currentColor"');
  return acc;
}, {} as Record<string, string>);

// Define props interface
interface IconProps {
  name: string;
  className?: string;
}

// Icon Component
const Icon: React.FC<IconProps> = ({ name, className = '' }) => {
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
