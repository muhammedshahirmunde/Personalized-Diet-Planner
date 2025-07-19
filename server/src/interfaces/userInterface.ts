export interface RegisterData {
  name: string;
  phone: string;
  email: string;
  password: string;
}

 
export interface LoginData {
  email: string;
  password: string;
}

 
 
 
export interface UserType {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  role: 'user';
  age?: number;
  gender?: string;
  activityLevel?: string;
  dietaryPreference?: 'vegan' | 'non-vegan';
  healthGoal?: string;
  createdAt: Date;
  updatedAt: Date;
}


 
export interface LoginResponse {
  user: UserType;
  token: string;
}

 
 