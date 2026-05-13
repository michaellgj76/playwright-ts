import { z } from "zod";

export const CountrySchema = z.object({
  name: z.object({
    common: z.string(),
  }),
  capital: z.string().array(),
  extra: z.string().optional(), // Some countries might not have an extra field
  // extra2: z.string(),
  currencies: z.record(
    z.string(),
    z.object({
      name: z.string(),
      symbol: z.string(),
    }),
  ),
});

export const CountriesResponse = z.array(CountrySchema);
