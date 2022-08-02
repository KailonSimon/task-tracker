import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401);
    return;
  }
  switch (req.method) {
    case "GET":
      try {
        const result = await prisma.task.findMany({
          where: { authorId: session.user.id },
        });
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(404).json({ error });
      }
      break;
    case "POST":
      try {
        const result = await prisma.task.create({
          data: {
            ...req.body,
            authorId: session.user.id,
          },
          select: {
            id: true,
            name: true,
            description: true,
            priorityLevel: true,
            dateAdded: true,
            isCompleted: true,
          },
        });
        res.status(201).json(result);
      } catch (error) {
        console.log(error);
        res.status(404).json({ error });
      }
      break;
  }
}
