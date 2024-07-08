"use server";

import prisma from "@/lib/db";
import { UpdateUserCurrencySchema } from "@/validation/schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function updateUserCurrency(currency: string) {
  const parsedData = UpdateUserCurrencySchema.safeParse({ currency });
  if (!parsedData.success) {
    throw parsedData.error;
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }
  try {
    const userSettings = await prisma.userSettings.update({
      where: {
        userId: user.id,
      },
      data: {
        currency,
      },
    });
    return userSettings;
  } catch (error) {
    throw new Error("Unable to update currency");
  }
}
