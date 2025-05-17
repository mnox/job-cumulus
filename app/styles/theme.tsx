import { createTheme } from '@mui/material/styles';

export interface AppThemeProps {
  darkMode: boolean;
}

const useAppTheme = ({darkMode}: AppThemeProps) => {
  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
  });
}

export default useAppTheme;