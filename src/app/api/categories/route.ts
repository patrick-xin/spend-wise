import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  let userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      userId: user.id,
    },
  });

  return NextResponse.json(categories);
}
