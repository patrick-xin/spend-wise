import { CURRENCIES } from "@/lib/constants";
import { z } from "zod";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays, isValid } from "date-fns";

export const UpdateUserCurrencySchema = z.object({
  currency: z.custom((value) => {
    const found = CURRENCIES.find((c) => c.value === value);
    if (!found) {
      throw new Error(`invalid currency: ${value}`);
    }
    return value;
  }),
});

export const CreateTransactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  description: z.string().optional(),
  date: z.coerce.date(),
  category: z.string(),
  type: z.union([z.literal("income"), z.literal("expense")]),
});

export type CreateTransactionSchemaType = z.infer<
  typeof CreateTransactionSchema
>;

export const CreateCategorySchema = z.object({
  name: z.string().min(3).max(20),
  icon: z.string().max(20),
  type: z.enum(["income", "expense"]),
});

export type CreateCategorySchemaType = z.infer<typeof CreateCategorySchema>;

export const OverviewQuerySchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((args) => {
    const { from, to } = args;
    const days = differenceInDays(to, from);

    const isValidRange = days >= 0 && days <= MAX_DATE_RANGE_DAYS;
    return isValidRange;
  });

export const DeleteCategorySchema = z.object({
  name: z.string().min(3).max(20),
  type: z.enum(["income", "expense"]),
});

export type DeleteCategorySchemaType = z.infer<typeof DeleteCategorySchema>;
