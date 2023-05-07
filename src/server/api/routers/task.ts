import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

export const taskRouter = createTRPCRouter({
    get: protectedProcedure
        .query(({ ctx }) => {
            return ctx.prisma.task.findMany({
                where: {
                    userId: ctx.session.user.id
                },
                orderBy: [{ complete: "asc" }]
            })
        }),

    create: protectedProcedure
        .input(z.object({ title: z.string() }))
        .mutation(async ({ ctx, input }) => {
            await new Promise(p => setTimeout(p, 2000))
            return ctx.prisma.task.create({
                data: {
                    title: input.title,
                    userId: ctx.session.user.id
                }
            })
        }),

    update: protectedProcedure
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

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const task = await ctx.prisma.task.findFirst({
                where: {
                    id: input.id,
                    userId: ctx.session.user.id
                }
            })

            if (task === undefined) throw new TRPCError({code: "UNAUTHORIZED", message: "You dont have access to that task."})
            
            return ctx.prisma.task.delete({
                where: {
                    id: input.id,
                }
            })
        })
})