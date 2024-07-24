import React from 'react';
import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
//import VisaStatusList from '../components/VisaStatusList';

const HRVisaStatusPage: React.FC = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <Container>
      {/* <Typography variant="h4" component="h1" gutterBottom>
        Visa Status Management
      </Typography>
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="In Progress" />
        <Tab label="All" />
      </Tabs>
      <Box hidden={tabIndex !== 0}>
        <VisaStatusList status="In Progress" />
      </Box>
      <Box hidden={tabIndex !== 1}>
        <VisaStatusList status="All" />
      </Box> */}
    </Container>
  );
};

export default HRVisaStatusPage;