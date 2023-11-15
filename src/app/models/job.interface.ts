import { Address } from './address.interface';

export interface Job {
  id: number;
  title: string;
  industry: string;
  address: Address;
  vacancies: string[];
}
