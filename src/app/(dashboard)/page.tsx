import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";

import { redirect } from "next/navigation";
import CreateTransactionDialog from "./_components/create-transaction-dialog";

import Overview from "./_components/overview";
import History from "./_components/hirstory";

async function DashbaordPage() {
  const user = await currentUser();
  if (!user) {
    redirect("sign-in");
  }
  const userSettings = await prisma.userSettings.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (!userSettings) {
    redirect("/wizard");
  }

  return (
    <div className="pb-20">
      <div className="border-b bg-card">
        <div className="flex flex-wrap items-center justify-between gap-6 py-8 container">
          <p className="text-3xl font-bold">Hello, {user.firstName}</p>

          <div className="flex items-center gap-3">
            <CreateTransactionDialog
              type="income"
              trigger={
                <Button
                  variant={"outline"}
                  className="border-emerald-500 bg-emerald-950 text-white hover:bg-emerald-700 hover:text-white"
                >
                  New income 💰
                </Button>
              }
            />
            <CreateTransactionDialog
              type="expense"
              trigger={
                <Button
                  variant={"outline"}
                  className="border-rose-500 bg-rose-950 text-white hover:bg-rose-700 hover:text-white"
                >
                  New expense 🛍️
                </Button>
              }
            />
          </div>
        </div>
      </div>
      <div className="container space-y-10">
        <Overview userSettings={userSettings} />
        <History userSettings={userSettings} />
      </div>
    </div>
  );
}

export default DashbaordPage;
