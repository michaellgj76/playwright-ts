import z from "zod";
import { CountrySchema } from "./restcountries-schemas";

export type Country = z.infer<typeof CountrySchema>;

export interface CountryOldType {
  name: {
    common: string;
  };
  capital: string[];
  someting: string;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}
