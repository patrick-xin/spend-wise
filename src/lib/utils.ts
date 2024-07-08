import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { CURRENCIES } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getBaseURL() {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const baseUrl = getBaseURL();

export const dateToUTC = (date: Date) => {
  return new Date(
    Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    )
  );
};

export function GetFormatterForCurrency(currency: string) {
  const locale = CURRENCIES.find((c) => c.value === currency)?.locale;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });
}

export const sleep = async (time?: number) => {
  await new Promise((resolve) => setTimeout(resolve, time ?? 3000));
};
