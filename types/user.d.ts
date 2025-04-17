export interface Department  {
    text: string;
    value: string;
  };
  
  export interface Role  {
    id: number;
    name: string;
  };
  
  export interface User  {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: Role;
    password: string;
    avatar: string;
    cart?: any;
    address?: any;
    departments?: Department;
    signature: string;
  };
  