import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper as MuiPaper, Link } from '@mui/material';
import { fetchAllEmployees, selectAllEmployees} from '../redux/userSlice';
import { RootState } from '../redux/store';
import { Link as RouterLink } from 'react-router-dom';

const EmployeeProfilesPage: React.FC = () => {
    const dispatch = useDispatch();
    const allEmployees = useSelector(selectAllEmployees);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        dispatch(fetchAllEmployees());
    }, [dispatch]);

    const filteredEmployees = allEmployees?.filter(employee => {
        const firstName = employee.onboardingApplication?.firstName.toLowerCase() || '';
        const lastName = employee.onboardingApplication?.lastName.toLowerCase() || '';
        const preferredName = employee.onboardingApplication?.preferredName?.toLowerCase() || '';
        
        return (
            firstName.includes(searchQuery.toLowerCase()) ||
            lastName.includes(searchQuery.toLowerCase()) ||
            preferredName.includes(searchQuery.toLowerCase())
        );
    }).sort((a, b) => (a.onboardingApplication?.lastName.localeCompare(b.onboardingApplication?.lastName) || 0));

    return (
        <Container component="main" maxWidth="lg">
            <Typography component="h1" variant="h5" align="center" gutterBottom>
                Employee Profiles
            </Typography>
            <TextField
                label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                margin="normal"
            />
            {filteredEmployees &&
                <TableContainer component={MuiPaper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Username</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>SSN</TableCell>
                                <TableCell>Work Authorization Title</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEmployees.map(employee => (
                                <TableRow key={employee._id}>
                                    <TableCell>{employee.username}</TableCell>
                                    <TableCell>
                                    <Link
                                            component={RouterLink}
                                            to={`/employee/${employee._id}`}
                                            state={{ employee }}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {employee.onboardingApplication?.firstName} {employee.onboardingApplication?.lastName}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{employee.onboardingApplication?.ssn}</TableCell>
                                    <TableCell>{employee.onboardingApplication?.workAuthorization?.visaType !== 'Other'? employee.onboardingApplication?.workAuthorization?.visaType:
                                                employee.onboardingApplication?.workAuthorization?.otherVisaTitle}</TableCell>
                                    <TableCell>{employee.onboardingApplication?.cell}</TableCell>
                                    <TableCell>{employee.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            }
        </Container>
    );
};

export default EmployeeProfilesPage;