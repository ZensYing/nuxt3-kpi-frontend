// types/commission.d.ts

export interface DirectusUser {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    title: string;
  }
  
  export interface StaffMember {
    id: number;
    directus_users_id: DirectusUser;
  }
  
  export interface Department {
    id: number;
    title: string;
  }
  
  export interface Commission {
    id: number;
    status: string;
    sort: number;
    user_created: string;
    date_created: string;
    user_updated: string;
    date_updated: string;
    staff: StaffMember[];
    department: Department;
    checkBy: DirectusUser | null;
    verifiedBy: DirectusUser | null;
    approvedBy: DirectusUser | null;
    thumbnail?: string;
  }
  
  export interface CommissionResponse {
    data: Commission[];
  }
  