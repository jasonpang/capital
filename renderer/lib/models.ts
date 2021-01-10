import { State } from "zustand";

/**
 * A banking institution (e.g. Chase, Bank of America).
 */
export interface Institution {
  institutionId: string;
  name: string;
}

/**
 * An institution has many accounts (e.g. checking, brokerage).
 */
export interface Account {
  accountId: string;
  balance: number;
  name: string;
  type: string;
  subtype: string;
  mask: string;
  institution: Institution;
  manual: boolean;
}

/**
 * An account transaction.
 */
export interface Transaction {
  transactionId: string;
  account: Account;
  institution: Institution;
  name: string;
  pending: boolean;
  amount: number;
  date: string;
  manual: boolean;
}

export interface TitlebarAppConfig {
  [x: string]: any;
  fontSize: string;
  height: number;
  background: string;
  title: string;
}

export interface LeftBarAvatarAppConfig {
  border: Background<ReactText>;
  nameColor:
    | "inherit"
    | "initial"
    | "primary"
    | "secondary"
    | "textPrimary"
    | "textSecondary"
    | "error";
  image: string;
  name: string;
  size: number;
}

export interface LeftBarAppConfig {
  avatar: LeftBarAvatarAppConfig;
  width: string;
  background: string;
}

export interface AppConfig {
  resourcePath: string;
  titlebar: TitlebarAppConfig;
  leftbar: LeftBarAppConfig;
}

export interface AppState extends State {
  accounts: Account[];
  transactions: Transaction[];
  appConfig: AppConfig;
  setAppConfig: (state: AppConfig) => void;
  set: (state: AppState) => void;
}

export const Stores = {
  CryptCheck: "cryptcheck",
  Budget: "budget",
};
