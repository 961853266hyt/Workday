// import React from 'react';
// import { Container, Typography, Tabs, Tab, Box } from '@mui/material';
// //import VisaStatusList from '../components/VisaStatusList';

// const HRVisaStatusPage: React.FC = () => {
//   const [tabIndex, setTabIndex] = React.useState(0);

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabIndex(newValue);
//   };

//   return (
//     <Container>
//       {/* <Typography variant="h4" component="h1" gutterBottom>
//         Visa Status Management
//       </Typography>
//       <Tabs value={tabIndex} onChange={handleTabChange}>
//         <Tab label="In Progress" />
//         <Tab label="All" />
//       </Tabs>
//       <Box hidden={tabIndex !== 0}>
//         <VisaStatusList status="In Progress" />
//       </Box>
//       <Box hidden={tabIndex !== 1}>
//         <VisaStatusList status="All" />
//       </Box> */}
//     </Container>
//   );
// };

// export default HRVisaStatusPage;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllVisaStatuses, selectVisaStatuses, selectVisaStatusLoading, selectVisaStatusError, VisaStatus,approveDocument, rejectDocument } from '../redux/visaStatusSlice';
import { Container, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper as MuiPaper, Button, Link } from '@mui/material';
import e from 'cors';

import {  fetchOnboardingApplication} from '../redux/onboardingSlice';
import { getFileUrl } from '../components/PendingOnboarding';
import { Document } from '../redux/types';

const HRVisaStatusPage: React.FC = () => {
  const dispatch = useDispatch();
  const visaStatuses = useSelector(selectVisaStatuses);
  const loading = useSelector(selectVisaStatusLoading);
  const error = useSelector(selectVisaStatusError);

  useEffect(() => {
    dispatch(fetchAllVisaStatuses());

  }, [dispatch]);


  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography>Error: {error}</Typography>;
  }

  const calculateDaysRemaining = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diffTime = Math.abs(end.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  // optReceipt -> optEad -> i983 -> i20
  const renderNextStep = (status: VisaStatus) => {
    if (!status.optReceipt) {
      return 'Submit OPT Receipt';
    } else if (status.optReceipt.status === 'Pending') {
      return 'Wait for HR approval of OPT Receipt';
    } else if (status.optReceipt.status === 'Rejected') {
      return `OPT Receipt Rejected: ${status.optReceipt.feedback}`;
    } else if (status.optReceipt.status === 'Approved' && !status.optEad) {
      return 'Submit OPT EAD';
    } else if (status.optEad?.status === 'Pending') {
      return 'Wait for HR approval of OPT EAD';
    } else if (status.optEad?.status === 'Rejected') {
      return `OPT EAD Rejected: ${status.optEad.feedback}`;
    } else if (status.optEad?.status === 'Approved' && !status.i983) {
      return 'Submit I-983';
    } else if (status.i983?.status === 'Pending') {
      return 'Wait for HR approval of I-983';
    } else if (status.i983?.status === 'Rejected') {
      return `I-983 Rejected: ${status.i983.feedback}`;
    } else if (status.i983?.status === 'Approved' && !status.i20) {
      return 'Submit I-20';
    } else if (status.i20?.status === 'Pending') {
      return 'Wait for HR approval of I-20';
    } else if (status.i20?.status === 'Rejected') {
      return `I-20 Rejected: ${status.i20.feedback}`;
    }
    return 'All documents have been approved';
  };

  const renderAction = (status: VisaStatus) => {
    const handleSendNotification = (userId: string) => {
      //dispatch(sendNotification({ userId }));
    };

    const handleApproveDocument = (documentId: string) => {
      dispatch(approveDocument({ documentId }));
    };

    const handleRejectDocument = (documentId: string) => {
      const feedback = prompt("Please provide rejection feedback:");
      if (feedback) {
        dispatch(rejectDocument({ documentId, feedback }));
      }
    };

    const renderDocumentActions = (document: Document) => (
      <>
        <Link href={`${getFileUrl(document.url)}`} target="_blank" rel="noopener noreferrer">View Document</Link>
        <Button onClick={() => handleApproveDocument(document._id)} color="primary">Approve</Button>
        <Button onClick={() => handleRejectDocument(document._id)} color="secondary">Reject</Button>
      </>
    );


    if (!status.optReceipt) {
      return <Button variant="contained" color="primary" onClick={() => handleSendNotification(status.userId)}>Send Notification</Button>;
    } else if (status.optReceipt.status === 'Pending' || status.optReceipt.status === 'Rejected') {
      return renderDocumentActions(status.optReceipt);
    } else if (status.optReceipt.status === 'Approved' && !status.optEad) {
      return <Button variant="contained" color="primary" onClick={() => handleSendNotification(status.userId)}>Send Notification</Button>;
    } else if (status.optEad?.status === 'Pending' || status.optEad?.status === 'Rejected') {
      return renderDocumentActions(status.optEad);
    } else if (status.optEad?.status === 'Approved' && !status.i983) {
      return <Button variant="contained" color="primary" onClick={() => handleSendNotification(status.userId)}>Send Notification</Button>;
    } else if (status.i983?.status === 'Pending' || status.i983?.status === 'Rejected') {
      return renderDocumentActions(status.i983);
    } else if (status.i983?.status === 'Approved' && !status.i20) {
      return <Button variant="contained" color="primary" onClick={() => handleSendNotification(status.userId)}>Send Notification</Button>;
    } else if (status.i20?.status === 'Pending' || status.i20?.status === 'Rejected') {
      return renderDocumentActions(status.i20);
    }
    return 'N/A';
  };


  return (
    <Container component="main" maxWidth="md">
      <MuiPaper style={{ padding: '16px', marginTop: '16px' }}>
        <Typography component="h1" variant="h5" align="center">
          Visa Status Management
        </Typography>
        <TableContainer component={MuiPaper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Work Authorization Title</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Number of Days Remaining</TableCell>
                <TableCell>Next Steps</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visaStatuses?.map((status) => {
                const user = status.userId;
                const workAuth = status.onboardingApplication.workAuthorization;
                const startDate = workAuth?.startDate;
                const endDate = workAuth?.endDate;
                const daysRemaining = endDate ? calculateDaysRemaining(endDate) : 'N/A';

                return (
                  <TableRow key={user._id}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{workAuth.visaType || 'N/A'}</TableCell>
                    <TableCell>{startDate || 'N/A'}</TableCell>
                    <TableCell>{endDate || 'N/A'}</TableCell>
                    <TableCell>{daysRemaining}</TableCell>
                    <TableCell>{renderNextStep(status)}</TableCell>
                    <TableCell>{renderAction(status)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </MuiPaper>
    </Container>
  );
};

export default HRVisaStatusPage;