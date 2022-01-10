import { createContext } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    console.log('ThemeProvider')
    const themes = {
        pomodoro: {
            foreground: '#ffffff',
            background: '#d95550',
        },
        short_break: {
            foreground: '#ffffff',
            background: '#4c9195',
        },
        long_break: {
            foreground: '#ffffff',
            background: '#457ca3',
        },
    }

    return (<ThemeContext.Provider value={themes}>{children}</ThemeContext.Provider>)
}
