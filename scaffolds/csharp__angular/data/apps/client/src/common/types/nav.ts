import { Nullable } from './general';

export type NavFromT = 'ERR' | 'OK';

export interface MetaNavT {
  from: Nullable<NavFromT>;
}

export interface NavOptT {
  replace: boolean;
  from: Nullable<NavFromT>;
}
