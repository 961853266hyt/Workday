import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from './userSlice';
import employeeReducer, { EmployeeState } from './employeeSlice';
import visaReducer, { VisaState } from './visaSlice';


export const store = configureStore({
    reducer: {
        user: userReducer,
        employee: employeeReducer,
        visa: visaReducer,
        // onboarding: onboardingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;