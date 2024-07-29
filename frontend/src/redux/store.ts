import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from './userSlice';
import visaStatusReducer, { VisaStatusState } from "./visaStatusSlice";
import onboardingReducer, { OnboardingState } from "./onboardingSlice";
import registrationReducer, { RegistrationState } from "./registrationSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        visaStatus: visaStatusReducer,
        onboarding: onboardingReducer,
        registration: registrationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;