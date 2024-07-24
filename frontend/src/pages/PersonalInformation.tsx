import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Paper as MuiPaper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Input,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  Link,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../redux/userSlice';
import { fetchOnboardingApplication, 
    selectOnboardingData,
    updateUserInfo } from '../redux/onboardingSlice';
import { getFileUrl } from '../components/PendingOnboarding';
import { formatDate } from './OnboardingApplicationPage';

const PersonalInformation: React.FC = () => {
  const user = useSelector(selectUser);
  const onboardingData = useSelector(selectOnboardingData);
  const [editSection, setEditSection] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState<any>({});
  const dispatch = useDispatch();
  
  const printOnboardingData = () => {
    for (const key in onboardingData) {
      console.log(key, onboardingData[key]);
    }
    };

//   useEffect(() => {
//         printOnboardingData();
//   }, [onboardingData]);
    useEffect(() => {
    if (user) {
        console.log(user.id);
        dispatch(fetchOnboardingApplication(user.id));
    }
    }, [user, dispatch]);

  const handleEdit = (section: string) => {
    setEditSection(section);
    setUnsavedChanges({});
  };

  const handleCancel = () => {
    setOpenDialog(true);
  };

  const handleSave = () => {
    const updatedData = {
        ...onboardingData,
        ...unsavedChanges,
    };
    // print the updated data
    for (const key in updatedData) {
        console.log(key, updatedData[key]);
    }
    dispatch(updateUserInfo(updatedData));
    setEditSection(null);
  };

  const handleDialogClose = (confirm: boolean) => {
    setOpenDialog(false);
    if (confirm) {
      setEditSection(null);
    }
  };

  const handleChange = (section: string, field: string, value: any) => {
    setUnsavedChanges((prev: any) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  return (
    <Container component="main" maxWidth="md">
      <MuiPaper style={{ padding: '16px', marginTop: '16px' }}>
        <Typography component="h1" variant="h5" align="center">
          Personal Information
        </Typography>

        {/* Name Section */}
        <Section
          title="Name"
          editable={editSection === 'Name'}
          onEdit={() => handleEdit('Name')}
          onCancel={handleCancel}
          onSave={handleSave}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                value={unsavedChanges.Name?.firstName || onboardingData?.firstName}
                disabled={editSection !== 'Name'}
                onChange={(e) => handleChange('Name', 'firstName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                value={unsavedChanges.Name?.lastName || onboardingData?.lastName}
                disabled={editSection !== 'Name'}
                onChange={(e) => handleChange('Name', 'lastName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Middle Name"
                value={unsavedChanges.Name?.middleName || onboardingData?.middleName}
                disabled={editSection !== 'Name'}
                onChange={(e) => handleChange('Name', 'middleName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Preferred Name"
                value={unsavedChanges.Name?.preferredName || onboardingData?.preferredName}
                disabled={editSection !== 'Name'}
                onChange={(e) => handleChange('Name', 'preferredName', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                value={user?.email}
                disabled
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="SSN"
                value={unsavedChanges.Name?.ssn || onboardingData.ssn}
                disabled={editSection !== 'Name'}
                onChange={(e) => handleChange('Name', 'ssn', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                type="date"
                value={formatDate(unsavedChanges.Name?.dateOfBirth || onboardingData.dateOfBirth)}
                disabled={editSection !== 'Name'}
                onChange={(e) => handleChange('Name', 'dateOfBirth', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Gender"
                value={unsavedChanges.Name?.gender || onboardingData.gender}
                disabled={editSection !== 'Name'}
                onChange={(e) => handleChange('Name', 'gender', e.target.value)}
              />
            </Grid>
          </Grid>
        </Section>

        {/* Address Section */}
        <Section
          title="Address"
          editable={editSection === 'Address'}
          onEdit={() => handleEdit('Address')}
          onCancel={handleCancel}
          onSave={handleSave}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Building/Apt #"
                value={unsavedChanges.Address?.building || onboardingData.currentAddress.building}
                disabled={editSection !== 'Address'}
                onChange={(e) => handleChange('Address', 'building', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Street Name"
                value={unsavedChanges.Address?.street || onboardingData.currentAddress.street}
                disabled={editSection !== 'Address'}
                onChange={(e) => handleChange('Address', 'street', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="City"
                value={unsavedChanges.Address?.city || onboardingData.currentAddress.city}
                disabled={editSection !== 'Address'}
                onChange={(e) => handleChange('Address', 'city', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                value={unsavedChanges.Address?.state || onboardingData.currentAddress.state}
                disabled={editSection !== 'Address'}
                onChange={(e) => handleChange('Address', 'state', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Zip"
                value={unsavedChanges.Address?.zip || onboardingData.currentAddress.zip}
                disabled={editSection !== 'Address'}
                onChange={(e) => handleChange('Address', 'zip', e.target.value)}
              />
            </Grid>
          </Grid>
        </Section>

        {/* Contact Info Section */}
        <Section
          title="Contact Info"
          editable={editSection === 'Contact Info'}
          onEdit={() => handleEdit('Contact Info')}
          onCancel={handleCancel}
          onSave={handleSave}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Cell Phone"
                value={unsavedChanges.Contact?.cell || onboardingData.cell}
                disabled={editSection !== 'Contact Info'}
                onChange={(e) => handleChange('Contact', 'cell', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Work Phone"
                value={unsavedChanges.Contact?.work || onboardingData.work}
                disabled={editSection !== 'Contact Info'}
                onChange={(e) => handleChange('Contact', 'work', e.target.value)}
              />
            </Grid>
          </Grid>
        </Section>

        {/* Employment Section */}
        <Section
          title="Employment"
          editable={editSection === 'Employment'}
          onEdit={() => handleEdit('Employment')}
          onCancel={handleCancel}
          onSave={handleSave}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Visa Title"
                value={unsavedChanges.Employment?.visaTitle || onboardingData.workAuthorization.visaType}
                disabled={editSection !== 'Employment'}
                onChange={(e) => handleChange('Employment', 'visaTitle', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Start Date"
                type="date"
                value={formatDate(unsavedChanges.Employment?.startDate || onboardingData.workAuthorization.startDate)}
                disabled={editSection !== 'Employment'}
                onChange={(e) => handleChange('Employment', 'startDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="End Date"
                type="date"
                value={formatDate(unsavedChanges.Employment?.endDate || onboardingData.workAuthorization.endDate)}
                disabled={editSection !== 'Employment'}
                onChange={(e) => handleChange('Employment', 'endDate', e.target.value)}
                InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>
          </Section>
  
          {/* Emergency Contact Section */}
          <Section
            title="Emergency Contact"
            editable={editSection === 'Emergency Contact'}
            onEdit={() => handleEdit('Emergency Contact')}
            onCancel={handleCancel}
            onSave={handleSave}
          >
            <Grid container spacing={2}>
              {onboardingData.emergencyContacts.map((contact, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="First Name"
                      value={unsavedChanges.EmergencyContact?.[index]?.firstName || contact.firstName}
                      disabled={editSection !== 'Emergency Contact'}
                      onChange={(e) => handleChange('EmergencyContact', `${index}.firstName`, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Last Name"
                      value={unsavedChanges.EmergencyContact?.[index]?.lastName || contact.lastName}
                      disabled={editSection !== 'Emergency Contact'}
                      onChange={(e) => handleChange('EmergencyContact', `${index}.lastName`, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Middle Name"
                      value={unsavedChanges.EmergencyContact?.[index]?.middleName || contact.middleName}
                      disabled={editSection !== 'Emergency Contact'}
                      onChange={(e) => handleChange('EmergencyContact', `${index}.middleName`, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Phone"
                      value={unsavedChanges.EmergencyContact?.[index]?.phone || contact.phone}
                      disabled={editSection !== 'Emergency Contact'}
                      onChange={(e) => handleChange('EmergencyContact', `${index}.phone`, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Email"
                      value={unsavedChanges.EmergencyContact?.[index]?.email || contact.email}
                      disabled={editSection !== 'Emergency Contact'}
                      onChange={(e) => handleChange('EmergencyContact', `${index}.email`, e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      label="Relationship"
                      value={unsavedChanges.EmergencyContact?.[index]?.relationship || contact.relationship}
                      disabled={editSection !== 'Emergency Contact'}
                      onChange={(e) => handleChange('EmergencyContact', `${index}.relationship`, e.target.value)}
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Section>
  
          {/* Documents Section */}
          <Section
            title="Documents"
            editable={false}
            onEdit={() => {}}
            onCancel={() => {}}
            onSave={() => {}}
            hideEditButton={true}
          >
            <Typography component="h6" variant="h6" align="center">
              Uploaded Documents
            </Typography>
            <TableContainer component={MuiPaper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Document Type</TableCell>
                    <TableCell>URL</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {onboardingData.documents?.map(doc => (
                    <TableRow key={doc._id}>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>
                        <Link href={getFileUrl(doc.url)} target="_blank" rel="noopener noreferrer">
                          View Document
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Section>
        </MuiPaper>
  
        <Dialog
          open={openDialog}
          onClose={() => handleDialogClose(false)}
        >
          <DialogTitle>Discard Changes?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to discard all of your changes?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleDialogClose(false)} color="primary">
              No
            </Button>
            <Button onClick={() => handleDialogClose(true)} color="primary" autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    );
  };

  const Section: React.FC<{
    title: string;
    editable: boolean;
    onEdit: () => void;
    onCancel: () => void;
    onSave: () => void;
    children: React.ReactNode;
    hideEditButton?: boolean;
  }> = ({ title, editable, onEdit, onCancel, onSave, children, hideEditButton }) => {
    return (
      <MuiPaper style={{ padding: '16px', marginTop: '16px' }}>
        <Typography component="h6" variant="h6" align="center">
          {title}
        </Typography>
        {editable ? (
          <>
            {children}
            <Button onClick={onSave} color="primary">
              Save
            </Button>
            <Button onClick={onCancel} color="secondary">
              Cancel
            </Button>
          </>
        ) : (
          <>
            {children}
            {!hideEditButton && (<Button onClick={onEdit} color="primary">
              Edit
            </Button>)}
          </>
        )}
      </MuiPaper>
    );
  };
  
  export default PersonalInformation;