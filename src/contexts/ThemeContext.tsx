
import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'orange' | 'green' | 'purple';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { value: Theme; name: string; color: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('default');

  const themes = [
    { value: 'default' as Theme, name: 'Royal Blue', color: 'hsl(220, 70%, 50%)' },
    { value: 'orange' as Theme, name: 'Saffron', color: 'hsl(25, 95%, 53%)' },
    { value: 'green' as Theme, name: 'Emerald', color: 'hsl(142, 76%, 36%)' },
    { value: 'purple' as Theme, name: 'Amethyst', color: 'hsl(262, 83%, 58%)' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('celebal-theme') as Theme;
    if (savedTheme && themes.find(t => t.value === savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('celebal-theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
