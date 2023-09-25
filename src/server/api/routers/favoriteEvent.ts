// import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { prisma } from "~/server/db";
import { router, privateProcedure } from "../trpc";

export const favoriteEventsRouter = router({
  getFavorites: privateProcedure
    .input(
      z.object({
        // email
        userId: z.string().nonempty(),
      })
    )
    .query(async ({ input }) => {
      const favEvents = await prisma.favEvent.findMany({
        where: { userId: input.userId },
      });
      console.log({ favEvents });
      return favEvents;
    }),
  addFavorite: privateProcedure
    .input(
      z.object({
        // meetup data
        id: z.string().nonempty(),
        userId: z.string().nonempty(),
        date: z.date().optional(),
      })
    )
    .mutation(async ({ input }) => {
      // add data to db through prisma
      await prisma.favEvent.create({
        data: {
          ...input,
        },
      });
    }),
  deleteFavorite: privateProcedure
    .input(
      z.object({
        // meetup data, userId?
        id: z.string().nonempty(),
      })
    )
    .mutation(async ({ input }) => {
      // delete meetup data from favorite list
      await prisma.favEvent.delete({
        where: { id: input.id },
      });
    }),
});
