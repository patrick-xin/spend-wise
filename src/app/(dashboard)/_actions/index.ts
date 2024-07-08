"use server";

import prisma from "@/lib/db";
import {
  CreateCategorySchema,
  CreateCategorySchemaType,
  CreateTransactionSchemaType,
  CreateTransactionSchema,
  DeleteCategorySchemaType,
  DeleteCategorySchema,
} from "@/validation/schema";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createCategory = async (category: CreateCategorySchemaType) => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const parsedData = CreateCategorySchema.safeParse(category);

  if (!parsedData.success) {
    throw parsedData.error;
  }
  const { icon, name, type } = parsedData.data;
  const newCategory = await prisma.category.create({
    data: {
      icon,
      userId: user.id,
      name,
      type,
    },
  });
  return newCategory;
};

export const createTransaction = async (
  transaction: CreateTransactionSchemaType
) => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  const parsedData = CreateTransactionSchema.safeParse(transaction);

  if (!parsedData.success) {
    throw parsedData.error;
  }
  const { amount, category, date, description, type } = parsedData.data;
  const categoryRow = await prisma.category.findFirst({
    where: {
      userId: user.id,
      name: category,
    },
  });

  if (!categoryRow) {
    throw new Error("category not found");
  }

  await prisma.$transaction([
    prisma.transaction.create({
      data: {
        userId: user.id,
        amount,
        category: categoryRow.name,
        date,
        description: description || "",
        type,
        categoryIcon: categoryRow.icon,
      },
    }),
    prisma.monthHistory.upsert({
      where: {
        day_month_year_userId: {
          userId: user.id,
          year: date.getUTCFullYear(),
          day: date.getUTCDay(),
          month: date.getUTCMonth(),
        },
      },
      create: {
        userId: user.id,
        year: date.getUTCFullYear(),
        day: date.getUTCDay(),
        month: date.getUTCMonth(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
    }),
    prisma.yearHistory.upsert({
      where: {
        month_year_userId: {
          userId: user.id,
          year: date.getUTCFullYear(),
          month: date.getUTCMonth(),
        },
      },
      create: {
        userId: user.id,
        year: date.getUTCFullYear(),
        month: date.getUTCMonth(),
        expense: type === "expense" ? amount : 0,
        income: type === "income" ? amount : 0,
      },
      update: {
        expense: {
          increment: type === "expense" ? amount : 0,
        },
        income: {
          increment: type === "income" ? amount : 0,
        },
      },
    }),
  ]);
};

export const deleteTransaction = async (transactionId: string) => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  if (!transactionId) {
    throw new Error("Missing transactionId");
  }

  await prisma.transaction.delete({
    where: {
      id: transactionId,
    },
  });
};

export async function deleteCategory(form: DeleteCategorySchemaType) {
  const parsedBody = DeleteCategorySchema.safeParse(form);
  if (!parsedBody.success) {
    throw new Error("bad request");
  }

  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  return await prisma.category.delete({
    where: {
      name_userId_type: {
        userId: user.id,
        name: parsedBody.data.name,
        type: parsedBody.data.type,
      },
    },
  });
}
