import { unstable_noStore as noStore } from "next/cache";
import prisma from "./db";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { differenceInDays, parseISO } from "date-fns";
import { MAX_DATE_RANGE_DAYS } from "./constants";

export const OverviewQuerySchema = z
  .object({
    from: z.string(),
    to: z.string(),
  })
  .refine((args) => {
    const { from, to } = args;
    const days = differenceInDays(to, from);

    const isValidRange = days >= 0 && days <= MAX_DATE_RANGE_DAYS;
    return isValidRange;
  });

export type GetBalanceStatsResponseType = Awaited<
  ReturnType<typeof getBalanceStats>
>;

async function getBalanceStats(userId: string, from: string, to: string) {
  noStore();

  const totals = await prisma.transaction.groupBy({
    by: ["type"],
    where: {
      userId,
      date: {
        gte: parseISO(from),
        lte: parseISO(to),
      },
    },
    _sum: {
      amount: true,
    },
  });

  return {
    expense: totals.find((t) => t.type === "expense")?._sum.amount || 0,
    income: totals.find((t) => t.type === "income")?._sum.amount || 0,
  };
}

export const fetchOverviewBalance = async ({
  from,
  to,
}: {
  from: string;
  to: string;
}) => {
  noStore();
  const user = await currentUser();
  if (!user) redirect("sign-in");
  const queryParams = OverviewQuerySchema.safeParse({ from, to });

  if (!queryParams.success) {
    throw new Error(queryParams.error.message);
  }

  const stats = await getBalanceStats(
    user.id,
    queryParams.data.from,
    queryParams.data.to
  );

  return stats;
};
