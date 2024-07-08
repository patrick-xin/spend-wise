import { CURRENCIES } from "./constants";

export type TransactionType = "income" | "expense";
export type Timeframe = "month" | "year";
export type Period = { year: number; month: number };
export type Currency = (typeof CURRENCIES)[0];
