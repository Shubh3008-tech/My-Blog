import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ThemeContext = createContext({
    themeMode: "light",
    darkTheme: () => {},
    lightTheme: () => {},
});

// Create the provider component
export const ThemeProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState("light");

    const lightTheme = () => {
        setThemeMode("light");
    }

    const darkTheme = () => {
        setThemeMode("dark");
    }

    // This is the core logic:
    // It runs every time themeMode changes
    useEffect(() => {
        const doc = document.documentElement;
        doc.classList.remove("light", "dark"); // clear existing classes
        doc.classList.add(themeMode); // add the current theme
    }, [themeMode]);

    return (
        <ThemeContext.Provider value={{ themeMode, darkTheme, lightTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook to use the context
export default function useTheme() {
    return useContext(ThemeContext);
}