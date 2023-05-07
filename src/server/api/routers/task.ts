import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const taskRouter = createTRPCRouter({
    get: publicProcedure
        .query(({ ctx }) => {
            return ctx.prisma.task.findMany({orderBy: [{complete: "asc"}]})
        }),

    create: publicProcedure
        .input(z.object({ title: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await new Promise(p => setTimeout(p, 2000))
            return ctx.prisma.task.create({
                data: {
                    title: input.title
                }
            })
        }),

    update: publicProcedure
        .input(z.object({ id: z.string(), completed: z.boolean() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.task.update({
                where: {
                    id: input.id
                },
                data: {
                    complete: input.completed
                }
            })
        }),

    delete: publicProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ ctx, input }) => {
            return ctx.prisma.task.delete({ where: { id: input.id } })
        })
})