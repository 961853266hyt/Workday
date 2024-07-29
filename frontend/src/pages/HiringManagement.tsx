import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  generateTokenAndSendEmail,
  getRegistrationHistory,
  selectRegistrationHistory,
  selectRegistrationLoading,
  selectRegistrationError,
  fetchApplicationsByStatus,
  updateApplicationStatus,
  selectPendingApplications,
  selectRejectedApplications,
  selectApprovedApplications,
  createVisaStatus,
} from '../redux/registrationSlice';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Link,
  Tabs,
  Tab,
  Box
} from '@mui/material';

const HiringManagement: React.FC = () => {
  const dispatch = useDispatch();
  const registrationHistory = useSelector(selectRegistrationHistory);
  const pendingApplications = useSelector(selectPendingApplications);
  const rejectedApplications = useSelector(selectRejectedApplications);
  const approvedApplications = useSelector(selectApprovedApplications);
  const loading = useSelector(selectRegistrationLoading);
  const error = useSelector(selectRegistrationError);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    dispatch(getRegistrationHistory());
    dispatch(fetchApplicationsByStatus({status: 'Pending'}));
    dispatch(fetchApplicationsByStatus({status: 'Rejected'}));
    dispatch(fetchApplicationsByStatus({status: 'Approved'}));
  }, [dispatch]);

  const handleGenerateToken = () => {
    dispatch(generateTokenAndSendEmail({ email, name }));
    alert('Token generated and email sent');
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleApplicationStatusUpdate = (id: string, status: 'Approved' | 'Rejected', feedback?: string) => {
        dispatch(updateApplicationStatus({ id, status, feedback }));
  };

  const renderApplicationTable = (applications: any[], showActions: boolean) => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            {/* <TableCell>Email</TableCell> */}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((app) => (
            <TableRow key={app._id}>
              <TableCell>{`${app.firstName} ${app.lastName}`}</TableCell>
              {/* <TableCell>{app.email}</TableCell> */}
              <TableCell>
                <Link href={`/application/${app._id}`} target="_blank" rel="noopener noreferrer">
                  View Application
                </Link>
                {showActions && (
                  <>
                    <Button onClick={() => handleApplicationStatusUpdate(app._id, 'Approved')}>Approve</Button>
                    <Button onClick={() => handleApplicationStatusUpdate(app._id, 'Rejected', prompt("Please provide feedback:"))}>Reject</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Hiring Management
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleGenerateToken} disabled={loading}>
        {loading ? <CircularProgress size={24} /> : 'Generate token and send email'}
      </Button>

      <Typography variant="h5" component="h2" gutterBottom>
        Registration History
      </Typography>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Registration Link</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {registrationHistory.map((token) => (
              <TableRow key={token._id}>
                <TableCell>{token.email}</TableCell>
                <TableCell>{token.name}</TableCell>
                <TableCell>
                  <Link href={`/registration/${token.token}`} target="_blank" rel="noopener noreferrer">
                    {`/registration/${token.token}`}
                  </Link>
                </TableCell>
                <TableCell>{token.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="Pending" />
        <Tab label="Rejected" />
        <Tab label="Approved" />
      </Tabs>
      <Box hidden={tabIndex !== 0}>
        {renderApplicationTable(pendingApplications, true)}
      </Box>
      <Box hidden={tabIndex !== 1}>
        {renderApplicationTable(rejectedApplications, false)}
      </Box>
      <Box hidden={tabIndex !== 2}>
        {renderApplicationTable(approvedApplications, false)}
      </Box>
    </Container>
  );
};

export default HiringManagement;