import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
    palette: {
      primary: {
        main: '#5A99D2',
      },
      secondary: {          // cancel button
        main: '#abcdef',
      },
      error: {
        main: '#f44336',
      },
      background: {
        default: '#f4f6f8',
        paper: '#ffffff',
      },
      text: {
        primary: '#333333',
        secondary: '#666666',
      },
    },
    typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
  };
  
  const theme = createTheme(themeOptions);
  
  export default theme;