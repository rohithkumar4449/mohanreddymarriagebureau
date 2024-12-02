export interface Profile {
  _id: string;
  name: string;
  dateOfBirth: string;
  nativePlace: string;
  height: string;
  color: string;
  occupation: string;
  education: string;
  profileType: 'bride' | 'groom';
  fatherName: string;
  fatherOccupation: string;
  mobileNumber: string;
}

export interface ContactFormData {
  name: string;
  age: string;
  place: string;
  lookingFor: 'bride' | 'groom';
  mobile: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}