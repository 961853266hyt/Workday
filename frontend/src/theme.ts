import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
      primary: {
        main: '#9931B6',
      },
      secondary: {
        main: '#dc004e',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  };
  
  const theme = createTheme(themeOptions);
  
  export default theme;