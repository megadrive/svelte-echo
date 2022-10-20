import { error } from "@sveltejs/kit";
import { prisma } from "../db/prisma";
import type { Actions, PageServerData, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  let latestInput = await prisma?.userInput.findMany({
    where: {
      createdAt: {
        lt: new Date(Date.now() - 1000 * 60 * 60 * 24),
      },
    },
  });

  if (latestInput?.length === 0) {
    latestInput = await prisma?.userInput.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
  }

  if (!latestInput) {
    latestInput = [];
  }

  // get a random one from the array
  const randomInput = latestInput[Math.floor(Math.random() * latestInput.length)]?.text;

  return {
    tits: true,
    userInput: randomInput,
  };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const userInput = formData.get("userInput");
    if (!userInput) {
      throw error(500, "shit failed");
    }

    const db = await prisma?.userInput.create({ data: { text: userInput as string } });

    return {
      hello: "world",
      userInput: db?.text,
    };
  },
};
