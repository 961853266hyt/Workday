import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
      primary: {
        main: '#5B65C1',
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