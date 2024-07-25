import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from './userSlice';
import visaStatusReducer, { VisaStatusState } from "./visaStatusSlice";
import onboardingReducer, { OnboardingState } from "./onboardingSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        visaStatus: visaStatusReducer,
        onboarding: onboardingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;