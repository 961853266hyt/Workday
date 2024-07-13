import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../constants';
import { RootState } from './store';

interface VisaStatus {
    type: string;
    startDate: string;
    endDate: string;
    status: 'pending' | 'approved' | 'rejected';
    documents: string[];
    notes: string;
}

export interface Employee {
    id: string;
    name: string;
    workAuthorizationTitle: string;
    startDate: string;
    endDate: string;
    daysRemaining: number;
    visaStatus: VisaStatus[];
  }
  

  interface VisaState {
    employees: Employee[];
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  const initialState: VisaState = {
    employees: [],
    status: 'idle',
    error: null,
  };
  
  export const fetchEmployees = createAsyncThunk('visa/fetchEmployees', async () => {
    const response = await axios.get(`${API_URL}/employees`);
    return response.data;
  });
  
  export const updateVisaStatus = createAsyncThunk(
    'visa/updateVisaStatus', async ({ employeeId, visaId, status }: { employeeId: string; visaId: string; status: 'approved' | 'rejected' }) => {
      const response = await axios.patch(`${API_URL}/employees/${employeeId}/visa/${visaId}`, { status });
      return response.data;
    }
  );
  
  const visaSlice = createSlice({
    name: 'visa',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchEmployees.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchEmployees.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.employees = action.payload;
        })
        .addCase(fetchEmployees.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message || null;
        })
        .addCase(updateVisaStatus.fulfilled, (state, action) => {
          const { id, visaStatus } = action.payload;
          const existingEmployee = state.employees.find((employee) => employee.id === id);
          if (existingEmployee) {
            existingEmployee.visaStatus = visaStatus;
          }
        });
    },
  });
  
  export default visaSlice.reducer;