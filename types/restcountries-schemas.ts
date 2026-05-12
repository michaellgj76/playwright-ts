import { z } from "zod";

export const CountrySchema = z.object({
  name: z.object({
    common: z.string(),
  }),
  capital: z.string().array(),
  currencies: z.record(
    z.string(),
    z.object({
      name: z.string(),
      symbol: z.string(),
    }),
  ),
});
