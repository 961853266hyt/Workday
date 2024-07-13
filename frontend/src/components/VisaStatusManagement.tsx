import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { fetchEmployees, updateVisaStatus } from "../redux/visaSlice";
import { RootState } from "../redux/store";
import { Container, Typography, Button, Box, MenuItem, Select, CircularProgress } from '@mui/material';
import { Employee } from "../redux/visaSlice";

const VisaStatusManagement = () => {
    const dispatch = useDispatch();
    const { employees, status } = useSelector((state: RootState) => {
        state.visa
    });

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch]);

    const handleUpdateStatus = (employeeId: string, visaId: string, status: 'approved' | 'rejected') => {
        dispatch(updateVisaStatus(id, visaType, status));
    };

    if (status === 'loading') {
        return <CircularProgress />;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Visa Status Management</Typography>
            {employees.map((employee: Employee) => {
                <Box key={employee.id} mb={3}>
                    <Typography variant="h6">{employee.name}</Typography>
                    {employee.visaStatus.map((visa) => (
                      <Box key={visa.type} mb={2}>
                        <Typography variant="body1">{visa.type}</Typography>
                        <Typography variant="body2">Status: {visa.status}</Typography>
                        <Typography variant="body2">Start Date: {visa.startDate}</Typography>
                        <Typography variant="body2">End Date: {visa.endDate}</Typography>
                        <Select
                          value={visa.status}
                          onChange={(e) => handleUpdateStatus(employee.id, visa.type, e.target.value as 'approved' | 'rejected')}
                        >
                          <MenuItem value="approved">Approve</MenuItem>
                          <MenuItem value="rejected">Reject</MenuItem>
                        </Select>
                      </Box>
                    ))
                    }
                </Box>
            })}
        </Container>
    )
}

export default VisaStatusManagement;