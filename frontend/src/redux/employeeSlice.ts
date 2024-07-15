import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../constants';
import { RootState } from './store';
import { Employee } from './types';

export interface EmployeeState {
  employees: Employee[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  status: 'idle',
  error: null,
};

export const fetchEmployees = createAsyncThunk('employee/fetchEmployees', async () => {
  const response = await axios.get(`${API_URL}/employees`);
  return response.data;
});

export const addEmployee = createAsyncThunk('employee/addEmployee', async (employee: any) => {
  const response = await axios.post(`${API_URL}/employees`, employee);
  return response.data;
});

const employeeSlice = createSlice({
  name: 'employee',
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
      .addCase(addEmployee.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectEmployees = (state: RootState) => state.employee.employees;
export const selectEmployeeStatus = (state: RootState) => state.employee.status;
export const selectEmployeeError = (state: RootState) => state.employee.error;

export default employeeSlice.reducer;