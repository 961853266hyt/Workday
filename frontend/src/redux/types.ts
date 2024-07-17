export interface Document {
    id: string;
    name: string;
    url: string;
    status: 'Pending' | 'Approved' | 'Rejected';
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