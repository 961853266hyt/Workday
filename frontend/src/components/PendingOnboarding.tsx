import React from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper as MuiPaper, Link } from '@mui/material';

interface Document {
    _id: string;
    type: string;
    url: string;
}

interface OnboardingData {
    status: string;
    documents: Document[];
    [key: string]: any; // This will allow any additional properties
}

interface PendingOnboardingProps {
    onboardingData: OnboardingData;
}

const ignoredFields = ['_id', 'status', 'documents', '__v', 'userId', 'createdAt', 'updatedAt', 
    'profilePicture','optReceipt', 'submissionDate']; 

const getFileUrl = (url: string) => {
    const filename  = url.split('/').slice(-1)[0];
    return 'http://localhost:8000/uploads/' + filename;
};

const renderTableRows = (key: string, value: any) => {
    if (typeof value === 'object' && !Array.isArray(value)) {
        return Object.entries(value).filter(([key]) => !ignoredFields.includes(key)).map(([subKey, subValue]) => (
            <TableRow key={`${key}.${subKey}`}>
                <TableCell>{`${key} ${subKey}`}</TableCell>
                <TableCell>{typeof subValue === 'object' ? renderTableRows(subKey, subValue) : subValue}</TableCell>
            </TableRow>
        ));
    } else if (Array.isArray(value)) {
        return value.
        map((item, index) => (
            <TableRow key={`${key} ${index + 1}`}>
                <TableCell>{`${key} ${index + 1}`}</TableCell>
                <TableCell>{typeof item === 'object' ? renderTableRows(`${key}`, item) : item}</TableCell>
            </TableRow>
        ));
    } else {
        return (
            <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{value}</TableCell>
            </TableRow>
        )
    }
};

const PendingOnboarding: React.FC<PendingOnboardingProps> = ({ onboardingData }) => {
    return (
        <Container component="main" maxWidth="sm">
            <MuiPaper style={{ padding: '16px', marginTop: '16px' }}>
                <Typography component="h1" variant="h5" align="center">
                    Please wait for HR to review your application
                </Typography>
                <Typography component="h6" variant="h6" align="center">
                    Submitted Application
                </Typography>
                <TableContainer component={MuiPaper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Info</TableCell>
                                <TableCell>Value</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.entries(onboardingData)
                                .filter(([key]) => !ignoredFields.includes(key))
                                .map(([key, value]) => renderTableRows(key, value))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography component="h6" variant="h6" align="center">
                    Uploaded Documents
                </Typography>
                <TableContainer component={MuiPaper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Document Type</TableCell>
                                <TableCell>Details</TableCell>
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
            </MuiPaper>
        </Container>
    );
};

export default PendingOnboarding;