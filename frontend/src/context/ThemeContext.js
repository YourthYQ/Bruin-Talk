import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [isNight, setIsNight] = useState(false);

  const toggleTheme = () => {
    setIsNight(!isNight);
  };

  return (
    <ThemeContext.Provider value={{ isNight, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
