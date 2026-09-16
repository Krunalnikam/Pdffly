export interface StudentProfile {
  branch: string;
  enrollmentNumber: string;
}

export interface SavedStudentProfileRecord {
  enrollmentNumber: string;
  branch: string;
  savedAt: string; // ISO 8601
  updatedAt?: string; // ISO 8601
}

export interface StudentDetails {
  branch: string;
  enrollmentNumber: string;
  subject: string;
  examPhase: string;
}

export interface PromotionItem {
  id: string;
  name: string;
  url: string;
  imageUrl?: string;
  subject?: string;
  shortDescription: string;
  fullDetails: string;
  customButtonName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  clicksCount?: number;
}
