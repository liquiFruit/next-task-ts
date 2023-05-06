import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const taskRouter = createTRPCRouter({
    get: publicProcedure
        .query(({ctx}) => {
        return ctx.prisma.task.findMany()
    }),

    create: publicProcedure
        .input(z.object({ title: z.string(), desc: z.string()}))
        .mutation(({ctx, input}) => {
            return ctx.prisma.task.create({
                data: {
                    title: input.title,
                    desc: input.desc
                }
            })
        }),

    update: publicProcedure
        .input(z.object({ uid: z.string(), completed: z.boolean()}))
        .mutation(({ctx, input}) => {
            return ctx.prisma.task.update({
                where: {
                    uid: input.uid
                },
                data: {
                    complete: input.completed
                }
            })
        })
})