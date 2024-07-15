import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { approveDocument, rejectDocument, sendNotification } from '../redux/visaStatusSlice';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface VisaStatusActionsProps {
  employee: {
    id: string;
    nextStep: string;
    onboardingApplication?: {
      id: string;
      documents: {
        id: string;
        name: string;
        url: string;
        status: 'Pending' | 'Approved' | 'Rejected';
        feedback?: string;
      }[];
    };
  };
}

const VisaStatusActions: React.FC<VisaStatusActionsProps> = ({ employee }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(null);

  const handleApprove = (documentId: string) => {
    dispatch(approveDocument({ employeeId: employee.id, documentId }));
  };

  const handleReject = (documentId: string) => {
    setCurrentDocumentId(documentId);
    setOpen(true);
  };

  const handleFeedbackSubmit = () => {
    if (currentDocumentId) {
      dispatch(rejectDocument({ employeeId: employee.id, documentId: currentDocumentId, feedback }));
    }
    setOpen(false);
    setFeedback('');
    setCurrentDocumentId(null);
  };

  const handleSendNotification = () => {
    dispatch(sendNotification({ employeeId: employee.id }));
  };

  return (
    <div>
      {employee.nextStep === 'Waiting for HR approval' && employee.onboardingApplication?.documents.map(document => (
        <div key={document.id}>
          <Button onClick={() => handleApprove(document.id)}>Approve</Button>
          <Button onClick={() => handleReject(document.id)}>Reject</Button>
          <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Provide Feedback</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                label="Feedback"
                fullWidth
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleFeedbackSubmit}>Submit</Button>
            </DialogActions>
          </Dialog>
        </div>
      ))}
      {employee.nextStep === 'Submit next document' && (
        <Button onClick={handleSendNotification}>Send Notification</Button>
      )}
    </div>
  );
};

export default VisaStatusActions;