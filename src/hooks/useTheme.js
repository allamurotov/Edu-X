import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('eduXTheme');
    return saved !== null ? saved === 'dark' : true; // Default to dark
  });

  useEffect(() => {
    localStorage.setItem('eduXTheme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return { isDarkMode, setIsDarkMode };
}
