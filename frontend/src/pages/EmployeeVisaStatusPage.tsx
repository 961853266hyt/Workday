import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { List, ListItem, Typography, Box, Button, Card, CardContent, CardActions, Divider, Alert } from '@mui/material';
import { uploadDocument } from '../redux/visaStatusSlice';

const EmployeeVisaStatusPage: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const employeeId = useSelector((state: RootState) => state.user.user?.id);
  const employee = useSelector((state: RootState) =>
    state.visaStatus.employees.find(emp => emp.id === employeeId)
  );

  if (!employee || employee.workAuthorization.visaType !== 'OPT') return <Alert severity="info">No relevant data found.</Alert>;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, docType: string) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      dispatch(uploadDocument({ employeeId: employee.id, docType, file }));
    }
  };

  const renderDocumentStatus = (docType: string, docStatus: 'Pending' | 'Approved' | 'Rejected', feedback: string) => {
    switch (docType) {
      case 'OPT Receipt':
        if (docStatus === 'Pending') {
          return <Alert severity="info">Waiting for HR to approve your OPT Receipt</Alert>;
        } else if (docStatus === 'Approved') {
          return <Alert severity="success">Please upload a copy of your OPT EAD</Alert>;
        } else if (docStatus === 'Rejected') {
          return <Alert severity="error">HR Feedback: {feedback}</Alert>;
        }
        break;
      case 'OPT EAD':
        if (docStatus === 'Pending') {
          return <Alert severity="info">Waiting for HR to approve your OPT EAD</Alert>;
        } else if (docStatus === 'Approved') {
          return <Alert severity="success">Please download and fill out the I-983 form</Alert>;
        } else if (docStatus === 'Rejected') {
          return <Alert severity="error">HR Feedback: {feedback}</Alert>;
        }
        break;
      case 'I-983':
        if (docStatus === 'Pending') {
          return <Alert severity="info">Waiting for HR to approve and sign your I-983</Alert>;
        } else if (docStatus === 'Approved') {
          return <Alert severity="success">Please send the I-983 along with all necessary documents to your school and upload the new I-20</Alert>;
        } else if (docStatus === 'Rejected') {
          return <Alert severity="error">HR Feedback: {feedback}</Alert>;
        }
        break;
      case 'I-20':
        if (docStatus === 'Pending') {
          return <Alert severity="info">Waiting for HR to approve your I-20</Alert>;
        } else if (docStatus === 'Approved') {
          return <Alert severity="success">All documents have been approved</Alert>;
        } else if (docStatus === 'Rejected') {
          return <Alert severity="error">HR Feedback: {feedback}</Alert>;
        }
        break;
      default:
        return null;
    }
  };

  const renderUploadButton = (docType: string, docStatus: 'Pending' | 'Approved' | 'Rejected', prevDocStatus: 'Pending' | 'Approved' | 'Rejected') => {
    if (prevDocStatus === 'Approved' && docStatus !== 'Approved' && docStatus !== 'Pending') {
      return (
        <Button variant="outlined" component="label">
          Upload {docType}
          <input type="file" hidden onChange={(event) => handleFileUpload(event, docType)} />
        </Button>
      );
    }
    return null;
  };

  const prevDocStatus = (docType: string) => {
    switch (docType) {
      case 'OPT EAD':
        return employee.onboardingApplication?.documents.find(doc => doc.name === 'OPT Receipt')?.status || 'Pending';
      case 'I-983':
        return employee.onboardingApplication?.documents.find(doc => doc.name === 'OPT EAD')?.status || 'Pending';
      case 'I-20':
        return employee.onboardingApplication?.documents.find(doc => doc.name === 'I-983')?.status || 'Pending';
      default:
        return 'Approved';
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Visa Status
      </Typography>
      <Card sx={{ marginBottom: 2 }}>
        <CardContent>
          <Typography variant="h6">{employee.name}</Typography>
          <Typography variant="body1">{employee.workAuthorization.title}</Typography>
          <Typography variant="body2">Start Date: {new Date(employee.workAuthorization.startDate).toLocaleDateString()}</Typography>
          <Typography variant="body2">End Date: {new Date(employee.workAuthorization.endDate).toLocaleDateString()}</Typography>
          <Typography variant="body2">Days Remaining: {employee.daysRemaining}</Typography>
          <Typography variant="body2">Next Step: {employee.nextStep}</Typography>
        </CardContent>
      </Card>
      
      <List>
        {employee.onboardingApplication?.documents.map(doc => (
          <ListItem key={doc.id}>
            <Card sx={{ width: '100%', marginBottom: 2 }}>
              <CardContent>
                <Typography variant="h6">{doc.name}</Typography>
                {renderDocumentStatus(doc.name, doc.status, doc.feedback || '')}
                {doc.url && <Button href={doc.url} target="_blank" rel="noopener noreferrer">View Document</Button>}
                {doc.name === 'I-983' && (
                  <Box sx={{ marginTop: 2 }}>
                    <Typography variant="body2">Download Templates:</Typography>
                    <Button href="/path/to/empty-template.pdf" target="_blank" rel="noopener noreferrer">Empty Template</Button>
                    <Button href="/path/to/sample-template.pdf" target="_blank" rel="noopener noreferrer">Sample Template</Button>
                  </Box>
                )}
              </CardContent>
              <CardActions>
                {renderUploadButton(doc.name, doc.status, prevDocStatus(doc.name))}
              </CardActions>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default EmployeeVisaStatusPage;