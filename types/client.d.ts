import { ICategory } from './category';

export interface IClient {
  id: string;
  status: string;
  sort: number | null;
  date_created: string;
  user_created: string;
  date_updated: string | null;
  name: string;
  phone_number: string;
  facebook_link: string | null;
  contact_person?: { 
    id: string ,
    first_name: string,
    last_name: string,
    email: string,
    phone_number: string,
    date_created: string,
    user_created: string,
    avatar: string ,


  }  // Ensure contact_person is an object with an id or null
  category: ICategory;
}
