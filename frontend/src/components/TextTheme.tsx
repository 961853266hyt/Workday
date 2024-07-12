import React from 'react';
import { ThemeProvider, CssBaseline, Box, Typography, Container } from '@mui/material';
import theme from '../theme';

function TextTheme() {
  const colors = [
    { name: 'Primary Main', color: theme.palette.primary.main },
    { name: 'Secondary Main', color: theme.palette.secondary.main },
    { name: 'Error Main', color: theme.palette.error.main },
    { name: 'Background Default', color: theme.palette.background.default },
    { name: 'Background Paper', color: theme.palette.background.paper },
    { name: 'Text Primary', color: theme.palette.text.primary },
    { name: 'Text Secondary', color: theme.palette.text.secondary },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" gutterBottom>
          Theme Colors
        </Typography>
        {colors.map((color) => (
          <Box
            key={color.name}
            sx={{
              bgcolor: color.color,
              color: theme.palette.getContrastText(color.color),
              p: 2,
              mb: 2,
              borderRadius: 1,
            }}
          >
            <Typography variant="h6">{color.name}</Typography>
            <Typography variant="body1">{color.color}</Typography>
          </Box>
        ))}
      </Container>
    </ThemeProvider>
  );
}

export default TextTheme;