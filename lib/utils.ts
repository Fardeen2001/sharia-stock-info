import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date) {
  return format(new Date(date), "MMMM d, yyyy");
}

export function slugify(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
export const firebaseConfig = {
  apiKey: "AIzaSyAbQqwfACvIbFLFLbFoFLuPVZFzhcCghc4",
  authDomain: "sharia-stock-info.firebaseapp.com",
  projectId: "sharia-stock-info",
  storageBucket: "sharia-stock-info.appspot.com",
  messagingSenderId: "782591385251",
  appId: "1:782591385251:web:cffc2b248444d74ca72916",
  measurementId: "G-L8GNGRHBB0",
};
