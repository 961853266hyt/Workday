import React, { useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Typography, Paper as MuiPaper, Grid, TextField } from '@mui/material';
import { RootState } from '../redux/store';
import axios from 'axios';
import { API_URL } from '../constants';
import { getFileUrl } from './PendingOnboarding';

const EmployeeProfile: React.FC = () => {
    const location = useLocation();
    const { id } = useParams<{ id: string }>();
    const [employee, setEmployee] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axios.get(`${API_URL}/users/HR/employees/${id}`);
                setEmployee(response.data);
                //console.log(JSON.stringify(response.data));
                console.log( getFileUrl(response.data.onboardingApplication.profilePicture));
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch employee data');
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }


    const ob = employee?.onboardingApplication;
    if (!employee) {
        return <Typography>Employee not found</Typography>;
    }

    const renderField = (label: string, value: any) => (
        <Grid item xs={12} sm={6} key={label}>
            <TextField
                label={label}
                value={value}
                fullWidth
                disabled
            />
        </Grid>
    );
    const fakeData =
    {
        "_id":"6697ff8b52e28cc1ab716c75",
        "username":"EMP1",
        "email":"EMP1@workday.com",
        "password":"$2b$10$kdJMD8epm5p2kG.G9Tsjteh6D8Rv3cIvsRKLbyE7SjLFKoxB1oBQi",
        "role":"EMP",
        "__v":0,
        "onboardingApplication":{
           "currentAddress":{
              "building":"engineering",
              "street":"1010 w university ave, apt 343",
              "city":"urbana",
              "state":"Illinois",
              "zip":"61801"
           },
           "workAuthorization":{
              "startDate":"2024-07-01T00:00:00.000Z",
              "endDate":"2024-07-17T00:00:00.000Z",
              "visaType":"F1(CPT/OPT)",
              "optReceipt":"66a00a85c278f6e86c7842c7",
              "otherVisaTitle":""
           },
           "references":{
              "firstName":"yiteng",
              "lastName":"g",
              "middleName":"f",
              "phone":"4479022531",
              "email":"15869309927@163.com",
              "relationship":"friends"
           },
           "_id":"66a00a10c278f6e86c78429a",
           "userId":"6697ff8b52e28cc1ab716c75",
           "status":"Approved",
           "firstName":"yiteng",
           "lastName":"Hu",
           "middleName":"g",
           "preferredName":"2",
           "profilePicture":"66a00a85c278f6e86c7842c3",
           "cell":"4479022531",
           "work":"4479022531",
           "ssn":"566-56-5656",
           "dateOfBirth":"2024-07-03T00:00:00.000Z",
           "gender":"male",
           "isCitizenOrPermanentResident":"No",
           "emergencyContacts":[
              {
                 "firstName":"yiteng",
                 "lastName":"hhhh",
                 "middleName":"x",
                 "phone":"4479022531",
                 "email":"15869309927@163.com",
                 "relationship":"gr",
                 "_id":"66a00a10c278f6e86c78429b"
              }
           ],
           "submissionDate":"2024-07-23T19:52:48.420Z",
           "updatedAt":"2024-07-23T19:54:45.907Z",
           "__v":0
        }
     }

    const personalFields = [
        { label: "Username", value: employee.username },
        { label: "First Name", value: ob.firstName },
        { label: "Last Name", value: ob.lastName },
        { label: "Middle Name", value: ob.middleName },
        { label: "Preferred Name", value: ob.preferredName },
        { label: "Email", value: employee.email },
        { label: "SSN", value: ob.ssn },
        { label: "Date of Birth", value: new Date(ob.dateOfBirth).toISOString().split('T')[0] },
        { label: "Gender", value: ob.gender },
        { label: "Phone Number", value: ob.cell },
        { label: "Work Phone Number", value: ob.work },
        { label: "Citizen or Permanent Resident", value: ob.isCitizenOrPermanentResident }      
    ].map(field => renderField(field.label, field.value));
     
    const addressFields = Object.entries(ob.currentAddress).map(([key, value]) =>
        renderField(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), value)
    );

    const referencesFields = Object.entries(ob.references).map(([key, value]) =>
        renderField(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), value)
    );

    const emergencyContactsFields = ob.emergencyContacts.map((contact: any, index: number) => (
        <Grid container spacing={2} key={contact._id}>
            <Grid item xs={12}>
                <Typography component="h6" variant="h6" align="center">
                    Emergency Contact {index + 1}
                </Typography>
            </Grid>
            {Object.entries(contact).map(([key, value]) =>
                renderField(key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()), value)
            )}
        </Grid>
    ));

    return (
        <Container component="main" maxWidth="md">
            <MuiPaper style={{ padding: '16px', marginTop: '16px' }}>
                <Typography component="h1" variant="h5" align="center">
                    {ob.firstName} {ob.lastName}'s Profile
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography component="h6" variant="h6" align="center">
                            Profile Picture
                        </Typography>
                        <img src={getFileUrl(ob.profilePicture)} alt="Profile" style={{ width: '100%', maxWidth: '200px', height: 'auto' }} />
                    </Grid>
                    {personalFields}
                    <Grid item xs={12}>
                        <Typography component="h6" variant="h6" align="center">
                            Current Address
                        </Typography>
                    </Grid>
                    {addressFields}  
                    <Grid item xs={12}>
                        <Typography component="h6" variant="h6" align="center">
                            Reference
                        </Typography>
                    </Grid> 
                    {referencesFields} 
                    <Grid item xs={12}>
                        <Typography component="h6" variant="h6" align="center">
                            Emergency Contacts
                        </Typography>
                    </Grid>
                    {emergencyContactsFields}           
                </Grid>
            </MuiPaper>
        </Container>
    );
};


export default EmployeeProfile;