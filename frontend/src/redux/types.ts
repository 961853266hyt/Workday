export interface Document {
    id: string;
    name: string;
    url: string;
    status: 'Pending' | 'Approved' | 'Rejected' | 'NONE';
    feedback?: string;
  }
  
  export interface OnboardingApplication {
    id: string;
    employeeId: string;
    status: 'Pending' | 'Submitted' | 'Approved' | 'Rejected';
    submissionDate?: Date;
    feedback?: string;
    documents: Document[];
  }
  
  export interface Employee {
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

  export interface User {
    id: string;
    username: string;
    email: string;
    role: 'EMP' | 'HR';
  }

  export interface signInPayload {
    user: User;
    token: string;
  }

  export interface  MyKnownError {
    errorMessage: string
  }

