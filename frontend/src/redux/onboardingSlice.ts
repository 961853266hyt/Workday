import { createSlice, createAsyncThunk, PayloadAction, AsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { API_URL } from "../constants";
import { RootState } from "./store";
import { JWT_KEY } from "../constants";



export interface OnboardingState {
  data: any;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OnboardingState = {
  data: null,
  status: 'idle',
  error: null,
};

export const submitOnboardingApplication:AsyncThunk< any, FormData, {} > = createAsyncThunk(
  'onboarding/submit',
  async (formData: FormData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/onboarding`, formData);
      //console.log('xxxxx:'+ response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchOnboardingApplication:AsyncThunk<any, string, {}> = createAsyncThunk(
  'onboarding/fetchData', 
  async (userId: string, thunkAPI) => {
   try {
    const response = await axios.get(`${API_URL}/onboarding/user/${userId}`);
    // 
    // fetch file 
    const documents = await axios.get(`${API_URL}/documents/user/${userId}`);
    response.data.documents = documents.data;
    console.log('files fetched', response.data.documents);
    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
}
);

export const updateOnboardingApplication:AsyncThunk<any, FormData, {}> = createAsyncThunk(
  'onboarding/update',
  async (formData, thunkAPI) => {
    try {
      const userId = formData.get('userId');
      const response = await axios.put(`${API_URL}/onboarding/user/${userId}`, formData);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchDocuments:AsyncThunk<any, string, {}> = createAsyncThunk(
  'onboarding/fetchDocuments',
  async (userId: string, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/documents/user/${userId}`);
      if (response.data.length === 0) { // if no documents are uploaded
        return null;
      }
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateUserInfo:AsyncThunk<any, any, {}> = createAsyncThunk(
  'onboarding/updateUserInfo',
  async (formData, thunkAPI) => {
    try {
      const onboardingId = formData.get('_id');
      // we want to exclude the documents from the form data
      formData.delete('documents');
      const response = await axios.put(`${API_URL}/onboarding/${onboardingId}`, formData);
      console.log('updateUserInfo', response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const createVisaStatus:AsyncThunk<any, {userId: string, optReceipt: string}, {}> = createAsyncThunk(
  'onboarding/createVisaStatus',
  async ({ userId, optReceipt }, thunkAPI) => {
      try {
          const response = await axios.post(`${API_URL}/visa-statuses`, { userId, optReceipt });
          return response.data;
      } catch (error: any) {
          return thunkAPI.rejectWithValue(error.response.data);
      }
  }
);

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    resetOnboarding: (state) => {
      state.data = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitOnboardingApplication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(submitOnboardingApplication.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(submitOnboardingApplication.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchOnboardingApplication.pending, (state) => {
        state.status = 'loading';
      }
      )
      .addCase(fetchOnboardingApplication.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchOnboardingApplication.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateOnboardingApplication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateOnboardingApplication.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateOnboardingApplication.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserInfo.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateUserInfo.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });


  },
});

export const selectOnboardingData = (state: RootState) => state.onboarding.data;
export const selectOnboardingStatus = (state: RootState) => state.onboarding.status;
export const selectOnboardingError = (state: RootState) => state.onboarding.error;



export default onboardingSlice.reducer;