import React, { createContext, useState, useContext } from 'react';

const DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleDarkMode = () => {
		setIsDarkMode((prev) => !prev);
	};

	return (
		<DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
}

export function useDarkMode() {
	return useContext(DarkModeContext);
}
