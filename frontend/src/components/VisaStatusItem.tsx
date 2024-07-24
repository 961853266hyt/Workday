// import React, { useState } from 'react';
// import { Typography, Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
// import { Employee } from '../redux/types';
// import { useDispatch } from 'react-redux';
// import { approveDocument, rejectDocument, sendNotification  } from '../redux/visaStatusSlice';

// interface VisaStatusItemProps {
//     employee: Employee;
//   }
  
//   const VisaStatusItem: React.FC<VisaStatusItemProps> = ({ employee }) => {
//     const dispatch = useDispatch();
//     const [open, setOpen] = useState(false);
//     const [selectedDocument, setSelectedDocument] = useState<null | {
//       id: string;
//       name: string;
//       url: string;
//       status: string;
//     }>(null);
//     const [feedback, setFeedback] = useState('');
  
//     const handleOpen = (document: { id: string; name: string; url: string; status: string }) => {
//       setSelectedDocument(document);
//       setOpen(true);
//     };
  
//     const handleClose = () => {
//       setOpen(false);
//       setSelectedDocument(null);
//       setFeedback('');
//     };
  
//     const handleApprove = () => {
//       if (selectedDocument) {
//         dispatch(approveDocument({ employeeId: employee.id, documentId: selectedDocument.id }));
//         handleClose();
//       }
//     };
  
//     const handleReject = () => {
//       if (selectedDocument) {
//         dispatch(rejectDocument({ employeeId: employee.id, documentId: selectedDocument.id, feedback }));
//         handleClose();
//       }
//     };
  
//     const handleSendNotification = () => {
//       dispatch(sendNotification({ employeeId: employee.id }));
//     };
  
//     return (
//       <Box>
//         <Typography variant="h6">{employee.name}</Typography>
//         <Typography variant="body1">{employee.workAuthorization.title}</Typography>
//         <Typography variant="body2">Days Remaining: {employee.daysRemaining}</Typography>
//         <Typography variant="body2">Next Step: {employee.nextStep}</Typography>
  
//         {employee.nextStep === 'Submit next document' ? (
//           <Button variant="outlined" onClick={handleSendNotification}>Send Notification</Button>
//         ) : (
//           employee.onboardingApplication?.documents
//             .filter(doc => doc.status === 'Pending')
//             .map(doc => (
//               <Box key={doc.id}>
//                 <Typography variant="body2">Document: {doc.name}</Typography>
//                 <Button variant="outlined" onClick={() => handleOpen(doc)}>View Document</Button>
//               </Box>
//             ))
//         )}
  
//         <Dialog open={open} onClose={handleClose}>
//           <DialogTitle>Document Approval</DialogTitle>
//           <DialogContent>
//             {selectedDocument && (
//               <div>
//                 <Typography variant="body1">{selectedDocument.name}</Typography>
//                 <iframe src={selectedDocument.url} width="100%" height="400px" title={selectedDocument.name} />
//               </div>
//             )}
//             <TextField
//               label="Feedback"
//               fullWidth
//               multiline
//               rows={4}
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//               margin="normal"
//             />
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button onClick={handleApprove} color="primary">Approve</Button>
//             <Button onClick={handleReject} color="secondary">Reject</Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//     );
//   };
  
//   export default VisaStatusItem;