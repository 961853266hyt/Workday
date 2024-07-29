import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Paper as MuiPaper,
  CircularProgress,
  Button,
  Link,
} from '@mui/material';

import { fetchApplicationDetails, selectApplicationDetail, selectApplicationDetailLoading, selectApplicationDetailError,
    updateApplicationStatusDetails
 } from '../redux/registrationSlice';
import { getFileUrl } from '../components/PendingOnboarding';
const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const application = useSelector(selectApplicationDetail);
  const loading = useSelector(selectApplicationDetail);
  const error = useSelector(selectApplicationDetailError);

  useEffect(() => {
    if (id) {
        console.log(`Fetching application details for ID: ${id}`);
        dispatch(fetchApplicationDetails(id));
    }
  }, [dispatch, id]);

//   if (loading) {
//     return <CircularProgress />;
//   }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!application) {
    return <Typography>No application found</Typography>;
  }
  

  const handleApplicationStatusUpdate = (id: string, status: 'Approved' | 'Rejected', feedback?: string) => {
    dispatch(updateApplicationStatusDetails({ id, status, feedback }));
  };
  const { _id,
    firstName, lastName, middleName, preferredName, email, 
    currentAddress, workAuthorization, cell, work, ssn, dateOfBirth, gender, 
    isCitizenOrPermanentResident, references, emergencyContacts, profilePicture 
  } = application;

  const renderAddress = (address: any) => (
    <Grid container spacing={2}>
      <Grid item xs={12}><Typography>Building: {address.building}</Typography></Grid>
      <Grid item xs={12}><Typography>Street: {address.street}</Typography></Grid>
      <Grid item xs={12}><Typography>City: {address.city}</Typography></Grid>
      <Grid item xs={12}><Typography>State: {address.state}</Typography></Grid>
      <Grid item xs={12}><Typography>Zip: {address.zip}</Typography></Grid>
    </Grid>
  );

  const renderEmergencyContacts = (contacts: any) => (
    <Grid container spacing={2}>
      {contacts.map((contact: any, index: number) => (
        <Grid item xs={12} key={index}>
          <Typography>{contact.firstName} {contact.lastName}</Typography>
          <Typography>Relationship: {contact.relationship}</Typography>
          <Typography>Phone: {contact.phone}</Typography>
          <Typography>Email: {contact.email}</Typography>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <Container component="main" maxWidth="md">
      <MuiPaper style={{ padding: '16px', marginTop: '16px' }}>
        <Typography component="h1" variant="h5" align="center">
          Application Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Personal Information</Typography>
            <Typography>First Name: {firstName}</Typography>
            <Typography>Last Name: {lastName}</Typography>
            <Typography>Middle Name: {middleName}</Typography>
            <Typography>Preferred Name: {preferredName}</Typography>
            <Typography>Email: {email}</Typography>
            <Typography>Cell: {cell}</Typography>
            <Typography>Work: {work}</Typography>
            <Typography>SSN: {ssn}</Typography>
            <Typography>Date of Birth: {new Date(dateOfBirth).toLocaleDateString()}</Typography>
            <Typography>Gender: {gender}</Typography>
            <Typography>Is Citizen or Permanent Resident: {isCitizenOrPermanentResident}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Current Address</Typography>
            {renderAddress(currentAddress)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Work Authorization</Typography>
            <Typography>Visa Type: {workAuthorization.visaType}</Typography>
            <Typography>Start Date: {new Date(workAuthorization.startDate).toLocaleDateString()}</Typography>
            <Typography>End Date: {new Date(workAuthorization.endDate).toLocaleDateString()}</Typography>
            <Typography>OPT Receipt: 
              <Link href={getFileUrl(workAuthorization.optReceipt.url)} target="_blank" rel="noopener noreferrer">
                View Document
              </Link>
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">References</Typography>
            <Typography>{references.firstName} {references.lastName}</Typography>
            <Typography>Relationship: {references.relationship}</Typography>
            <Typography>Phone: {references.phone}</Typography>
            <Typography>Email: {references.email}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Emergency Contacts</Typography>
            {renderEmergencyContacts(emergencyContacts)}
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">Profile Picture</Typography>
            <Link href={getFileUrl(profilePicture.url)} target="_blank" rel="noopener noreferrer">
              View Picture
            </Link>
          </Grid>
        </Grid>
        {application.status === 'Pending' && (
          <Grid container spacing={2} justifyContent="center" style={{ marginTop: '16px' }}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => handleApplicationStatusUpdate(_id, 'Approved')}>
                Approve
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={() => handleApplicationStatusUpdate(_id, 'Rejected', prompt("please provide feedback"))}>
                Reject
              </Button>
            </Grid>
          </Grid>
        )}
      </MuiPaper>
    </Container>
  );
};

export default ApplicationDetail;