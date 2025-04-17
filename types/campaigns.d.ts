import { IClient } from './client';

export interface ICampaign {
  id: string;
  sort: number | null;
  status: string;
  date_created: string;
  user_created: string;
  date_updated: string;
  user_updated: string;
  name: string;
  details: string;
  price: number;
  start_date: string | null;
  end_date: string | null;
  client: IClient;
}
