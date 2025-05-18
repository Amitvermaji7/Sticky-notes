import React from "react";

type Theme = {
  name: string;
  buttonBg: string;
  buttonColor: string;
};

interface ThemeSelectorProps {
  themes: Theme[];
  selectedIdx: number;
  onSelect: (idx: number) => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ themes, selectedIdx, onSelect }) => (
  <div className="theme-switcher">
    {themes.map((t, i) => (
      <button
        key={t.name}
        className={`theme-btn${i === selectedIdx ? " active" : ""}`}
        style={{
          background: t.buttonBg,
          color: t.buttonColor,
          border: i === selectedIdx ? "2.5px solid #222" : "1.5px solid #ccc"
        }}
        onClick={() => onSelect(i)}
        title={t.name}
      >
        {t.name}
      </button>
    ))}
  </div>
);

export default ThemeSelector;