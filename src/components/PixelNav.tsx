import { useState } from 'react';

interface PixelNavProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

const navItems = [
  { id: 'home', label: '[ ГЛАВНАЯ ]' },
  { id: 'tests', label: '[ ТЕСТЫ ]' },
  { id: 'about', label: '[ О САЙТЕ ]' },
];

export default function PixelNav({ currentPage, onNavigate }: PixelNavProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <nav
      style={{
        borderBottom: '2px solid var(--pixel-green)',
        boxShadow: '0 2px 20px rgba(0,255,65,0.2)',
        backgroundColor: 'var(--pixel-bg)',
      }}
      className="sticky top-0 z-50 px-4 py-3 flex items-center justify-between"
    >
      <div className="font-pixel text-xs" style={{ color: 'var(--pixel-green)' }}>
        <span className="glitch">PIXEL_QUIZ.EXE</span>
      </div>

      <div className="flex gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            className="font-pixel text-[8px] px-3 py-2 transition-all duration-100"
            style={{
              color: currentPage === item.id ? 'black' : 'var(--pixel-green)',
              backgroundColor:
                currentPage === item.id
                  ? 'var(--pixel-green)'
                  : hoveredItem === item.id
                  ? 'rgba(0,255,65,0.15)'
                  : 'transparent',
              border: '1px solid var(--pixel-green)',
              textShadow: currentPage === item.id ? 'none' : '0 0 8px var(--pixel-green)',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="font-mono text-xs" style={{ color: 'var(--pixel-dim)' }}>
        <span className="blink">█</span>
      </div>
    </nav>
  );
}
