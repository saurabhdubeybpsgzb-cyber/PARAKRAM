
export interface FormData {
  fullName: string;
  fatherName: string;
  dob: string;
  gender: string;
  address: string;
  school: string;
  class: string;
  course: string;
  contactNumber: string;
  email: string;
  studentPhoto: File | null;
  lastQualification: string;
}

export type FormErrors = {
  [K in keyof FormData]?: string;
};
