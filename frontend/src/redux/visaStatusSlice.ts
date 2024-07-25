// redux/visaStatusSlice.js
import { createSlice, createAsyncThunk, AsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../constants";
import { RootState } from "./store";
import { User } from "./types";

export interface VisaStatus {
  userId: string | User;
  optReceipt: {
    status: string;
    feedback: string;
  };
  optEad?: {
    status: string;
    feedback: string;
  };
  i983?: {
    status: string;
    feedback: string;
  };
  i20?: {
    status: string;
    feedback: string;
  };
  onboardingApplication?: any;
}

export interface VisaStatusState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  visaStatus: VisaStatus | null;
  visaStatuses: VisaStatus[] | null;
}

export const fetchVisaStatus:AsyncThunk<any, {userId: string}, {}> = createAsyncThunk(
  "visaStatus/fetchVisaStatus",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/visa-statuses/user/${userId}`);
      return response.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const uploadDocument:AsyncThunk<any, {userId: string; type: string; file:File}, {}> = createAsyncThunk(
  "visaStatus/uploadDocument",
  async ({ userId, type, file }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      formData.append("userId", userId);
      formData.append("status", "Pending");
      const response = await axios.post(`${API_URL}/documents/upload`, formData);

      const id = response.data._id;
      // update visa status
      const visaStatusResponse = await axios.patch(`${API_URL}/visa-statuses/user/${userId}`, { [type]: id });
      
      return visaStatusResponse.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// HR part
export const sendNotification:AsyncThunk<any, {userId: string}, {}> = createAsyncThunk(
  "visaStatus/sendNotification",
  async ({ userId }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/notifications`, { userId }); //TODO: implement backend logic
      return response.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const approveDocument:AsyncThunk<any, {documentId: string}, {}>  = createAsyncThunk(
  "visaStatus/approveDocument",
  async ({ documentId }, thunkAPI) => {
    try {
      console.log(documentId);
      const response = await axios.patch(`${API_URL}/documents/${documentId}`, { status: "Approved" });
      return response.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const rejectDocument:AsyncThunk<any, {documentId: string, feedback: string}, {}> = createAsyncThunk(
  "visaStatus/rejectDocument",
  async ({documentId, feedback}, thunkAPI) => {
    try {
      const response = await axios.patch(`${API_URL}/documents/${documentId}`, { status: "Rejected", feedback });
      return response.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const fetchVisaStatusInProgress:AsyncThunk<any, {}, {}> = createAsyncThunk(
  "visaStatus/fetchVisaStatusInProgress",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/visa-statuses/HR/all`);
      return response.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchAllVisaStatuses:AsyncThunk<any, {}, {}> = createAsyncThunk(
  "visaStatus/fetchAllVisaStatuses",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/visa-statuses/HR/all`);
      return response.data;
    } catch (error:any) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


const visaStatusSlice = createSlice({
  name: "visaStatus",
  initialState: {
    status: "idle",
    error: null,
    visaStatus: null,
    visaStatuses: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVisaStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVisaStatus.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.visaStatus = action.payload;
      })
      .addCase(fetchVisaStatus.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(uploadDocument.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadDocument.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.visaStatus = action.payload;
      })
      .addCase(uploadDocument.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchVisaStatusInProgress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchVisaStatusInProgress.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.visaStatuses = action.payload;
      })
      .addCase(fetchVisaStatusInProgress.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchAllVisaStatuses.pending, (state) => {
        state.status = "loading";
      }
      )
      .addCase(fetchAllVisaStatuses.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "succeeded";
        state.visaStatuses = action.payload;
      })
      .addCase(fetchAllVisaStatuses.rejected, (state, action: PayloadAction<any>) => {
        state.status = "failed";
        state.error = action.payload;
      });

  },
});
// EMP
export const selectVisaStatus = (state: RootState): VisaStatus | null => state.visaStatus.visaStatus;
export const selectVisaStatusError = (state: RootState) => state.visaStatus.error;
export const selectVisaStatusLoading = (state: RootState) => state.visaStatus.status === "loading";

// HR
export const selectVisaStatuses = (state: RootState): VisaStatus[] => state.visaStatus.visaStatuses;

export default visaStatusSlice.reducer;