import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
 

interface Document {
    id: string;
    name: string;
    url: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    feedback?: string;
  }
  
  interface OnboardingApplication {
    id: string;
    employeeId: string;
    status: 'Pending' | 'Submitted' | 'Approved' | 'Rejected';
    submissionDate?: Date;
    feedback?: string;
    documents: Document[];
  }
  
  interface Employee {
    id: string;
    name: string;
    workAuthorization: {
      title: string;
      startDate: string;
      endDate: string;
      visaType: string;
    };
    daysRemaining: number;
    nextStep: string;
    visaStatusId?: string;
    onboardingApplication?: OnboardingApplication;
  }
  
  export interface VisaStatusState {
    employees: Employee[];
    loading: boolean;
    error: string | null;
  }
  
 const initialState: VisaStatusState = {
    employees: [{
        id: '1',
        name: 'John Doe',
        workAuthorization: {
          title: 'Software Engineer',
          startDate: '2022-01-01T00:00:00.000Z',
          endDate: '2023-01-01T00:00:00.000Z',
          visaType: 'OPT'
        },
        daysRemaining: 180,
        nextStep: 'Submit next document',
        visaStatusId: '101',
        onboardingApplication: {
          id: '201',
          employeeId: '1',
          status: 'Pending',
          documents: [
            {
              id: '301',
              name: 'OPT Receipt',
              url: 'http://example.com/opt-receipt',
              status: 'Pending',
              feedback: ''
            },
            {
              id: '302',
              name: 'OPT EAD',
              url: '',
              status: 'Pending',
              feedback: ''
            },
            {
              id: '303',
              name: 'I-983',
              url: '',
              status: 'Pending',
              feedback: ''
            },
            {
              id: '304',
              name: 'I-20',
              url: '',
              status: 'Pending',
              feedback: ''
            }
          ]
        }
      }],
    loading: false,
    error: null,
  };

// Async thunk for fetching visa statuses
export const fetchVisaStatuses:AsyncThunk<Employee[], void, {}> = createAsyncThunk<Employee[]>('visaStatus/fetchVisaStatuses', async () => {
    const response = await axios.get<Employee[]>('/api/visa-statuses');
    return response.data;
  });

export const uploadDocument = createAsyncThunk<void, { employeeId: string; docType: string; file: File }, {}>(
    'visaStatus/uploadDocument',
    async ({ employeeId, docType, file }, { dispatch }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('docType', docType);
  
      await axios.post(`/api/employees/${employeeId}/documents`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      // fetch the updated visa statuses after upload
      dispatch(fetchVisaStatuses());
    }
    );

  const visaStatusSlice = createSlice({
    name: 'visaStatus',
    initialState,
    reducers: {
      approveDocument: (state, action: PayloadAction<{ employeeId: string; documentId: string }>) => {
        const { employeeId, documentId } = action.payload;
        const employee = state.employees?.find(emp => emp.id === employeeId);
        const document = employee?.onboardingApplication?.documents.find(doc => doc.id === documentId);
        if (document) {
          document.status = 'Approved';
        }
      },
      rejectDocument: (state, action: PayloadAction<{ employeeId: string; documentId: string; feedback: string }>) => {
        const { employeeId, documentId, feedback } = action.payload;
        const employee = state.employees?.find(emp => emp.id === employeeId);
        const document = employee?.onboardingApplication?.documents.find(doc => doc.id === documentId);
        if (document) {
          document.status = 'Rejected';
          document.feedback = feedback;
        }
      },
      sendNotification: (state, action: PayloadAction<{ employeeId: string }>) => {
        // Logic to send notification
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchVisaStatuses.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchVisaStatuses.fulfilled, (state, action: PayloadAction<Employee[]>) => {
          state.employees = action.payload;
          state.loading = false;
        })
        .addCase(fetchVisaStatuses.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'Failed to fetch visa statuses';
        });
    },
  });
  
  export const { approveDocument, rejectDocument, sendNotification } = visaStatusSlice.actions;
  
  export default visaStatusSlice.reducer;