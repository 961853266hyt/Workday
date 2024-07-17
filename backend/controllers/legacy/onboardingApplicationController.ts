import OnboardingApplication from "../models/OnboardingApplication";
import { Request, Response } from 'express';
// import { Document } from '../models/Document';

// use user instead of employee
export const getOnboardingApplications = async (req: Request, res: Response) => {
    try {
        const onboardingApplications = await OnboardingApplication
            .find()
            .populate('documents');
        res.status(200).json(onboardingApplications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


