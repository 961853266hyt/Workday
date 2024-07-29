import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  generateTokenAndSendEmail, 
  getRegistrationHistory, 
  selectRegistrationHistory, 
  selectRegistrationLoading, 
  selectRegistrationError 
} from '../redux/registrationSlice';
import { Container, Typography, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Link } from '@mui/material';

const HiringManagement: React.FC = () => {
  const dispatch = useDispatch();
  const registrationHistory = useSelector(selectRegistrationHistory);
  const loading = useSelector(selectRegistrationLoading);
  const error = useSelector(selectRegistrationError);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    dispatch(getRegistrationHistory());
  }, [dispatch]);

  const handleGenerateToken = () => {
    dispatch(generateTokenAndSendEmail({ email, name }));
    alert('Token generated and email sent');
  };

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
    </Container>
  );
};

export default HiringManagement;