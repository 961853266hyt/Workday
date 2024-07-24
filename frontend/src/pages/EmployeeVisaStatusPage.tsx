import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Typography,
  Button,
  Grid,
  TextField,
  Paper as MuiPaper,
  Link,
} from "@mui/material";
import { fetchVisaStatus, 
  uploadDocument, 
  selectVisaStatus, 
  selectVisaStatusError, 
  selectVisaStatusLoading,
 } from "../redux/visaStatusSlice";
import { selectUser } from "../redux/userSlice";



const EmployeeVisaStatusPage: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const visaStatus = useSelector(selectVisaStatus);
  const loading = useSelector(selectVisaStatusLoading);
  const error = useSelector(selectVisaStatusError);
  const [file, setFile] = useState<File | null>(null);
  const [documentType, setDocumentType] = useState<string>("");

  useEffect(() => {
    if (user) {
      dispatch(fetchVisaStatus(user.id));
    }
  }, [user, dispatch]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = (type: string) => {
    if (file && user) {
      dispatch(uploadDocument({ userId: user.id, type, file }));
      setFile(null); // Clear the file input
      setDocumentType(""); // Reset document type
    }
  };

  const renderUploadSection = (label: string, type: string, status?: string, feedback?: string) => {
    return (
      <Grid item xs={12}>
        <Typography variant="h6">{label}</Typography>
        {status === "Pending" && <Typography color="textSecondary">Waiting for HR to approve your {label}</Typography>}
        {status === "Approved" && 
        (label==="I-20"?<Typography color="textSecondary">I-20 approved! All documents have been approved</Typography>
        :<Typography color="textSecondary">Please upload the next document</Typography>)}
        {status === "Rejected" && (
          <>
            {label === "I-983" && 
            <>
              <Typography variant="h6">Please download and fill out the I-983 form</Typography>
                <Link href="http://localhost:8000/downloads/Sample-i-983.pdf" target="_blank" rel="noopener noreferrer">Empty Template</Link>
                <br />
                <Link href="http://localhost:8000/downloads/Sample-i-983.pdf" target="_blank" rel="noopener noreferrer">Sample Template</Link>
                <br />
            </>}
            <Typography color="error">Rejected: {feedback}</Typography>
            <input type="file" onChange={handleFileChange} />
            <Button
              onClick={() => handleUpload(type)}
              variant="contained"
              color="primary"
              disabled={!file}
            >
              Upload {label}
            </Button>
          </>
        )}
        {!status && (
          <>
            {label === "I-983" && 
            <>
              <Typography variant="h6">Please download and fill out the I-983 form</Typography>
                <Link href="http://localhost:8000/downloads/Sample-i-983.pdf" target="_blank" rel="noopener noreferrer">Empty Template</Link>
                <br />
                <Link href="http://localhost:8000/downloads/Sample-i-983.pdf" target="_blank" rel="noopener noreferrer">Sample Template</Link>
                <br />
            </>}
            <input type="file" onChange={handleFileChange} />
            <Button
              onClick={() => handleUpload(type)}
              variant="contained"
              color="primary"
              disabled={!file}
            >
              Upload {label}
            </Button>
          </>
        )}
      </Grid>
    );
  };

  return (
    <Container component="main" maxWidth="md">
      <MuiPaper style={{ padding: "16px", marginTop: "16px" }}>
        <Typography component="h1" variant="h5" align="center">
          Visa Status Management
        </Typography>
        {loading && <Typography>Loading...</Typography>}
        {error && <Typography color="error">{error}</Typography>}
        {visaStatus && (
          <Grid container spacing={2}>
            {renderUploadSection("OPT Receipt", "optReceipt", visaStatus.optReceipt?.status, visaStatus.optReceipt?.feedback)}
            {visaStatus.optReceipt?.status === "Approved" && renderUploadSection("OPT EAD", "optEad", visaStatus.optEad?.status, visaStatus.optEad?.feedback)}
            {visaStatus.optEad?.status === "Approved" && renderUploadSection("I-983", "i983", visaStatus.i983?.status, visaStatus.i983?.feedback)}
            {visaStatus.i983?.status === "Approved" && renderUploadSection("I-20", "i20", visaStatus.i20?.status, visaStatus.i20?.feedback)}
          </Grid>
        )}
      </MuiPaper>
    </Container>
  );
};

export default EmployeeVisaStatusPage;