import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { nanoid } from "nanoid";
import formatISO from "date-fns/formatISO";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  switch (req.method) {
    case "PATCH":
      try {
        const result = await prisma.task.update({
          where: { id },
          data: req.body,
          select: {
            id: true,
            name: true,
            description: true,
            dateAdded: true,
            isCompleted: true,
            priorityLevel: true,
          },
        });
        res.status(201).json(result);
      } catch (error) {
        console.log(error);
        res.status(404).json({ error });
      }
      break;
    case "POST":
      /** Duplicates task matching id */
      try {
        const originalTask = await prisma.task.findUnique({
          where: { id },
          select: {
            id: true,
            name: true,
            description: true,
            dateAdded: true,
            isCompleted: true,
            priorityLevel: true,
            authorId: true,
          },
        });
        if (originalTask) {
          const result = await prisma.task.create({
            data: {
              id: nanoid(),
              name: originalTask.name,
              description: originalTask.description,
              dateAdded: formatISO(new Date()),
              isCompleted: originalTask.isCompleted,
              priorityLevel: originalTask.priorityLevel,
              authorId: originalTask.authorId,
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
        } else {
          throw "Original task not found!";
        }
      } catch (error) {
        console.log(error);
        res.status(404).json({ error });
      }
      break;
    case "DELETE":
      try {
        const result = await prisma.task.delete({
          where: { id },
          select: {
            id: true,
            name: true,
            description: true,
            dateAdded: true,
            isCompleted: true,
          },
        });
        res.status(200).json(result);
      } catch (error) {
        console.log(error);
        res.status(404).json({ error });
      }
      break;
  }
}
