export interface RegisterInterface {
  name: string;
  phone: string | number;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}



export interface User {
  _id: number;
  role: string;
  token: string;
};


