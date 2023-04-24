import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"

export const taskRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ctx}) => {
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
        })
})