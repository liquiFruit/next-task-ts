import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "../trpc"
import { TRPCError } from "@trpc/server"

import dayjs from "dayjs"

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
        .input(z.object({ 
            id: z.string(), 
            complete: z.boolean().optional(),
            archived: z.boolean().optional() 
        }))
        .mutation(async ({ ctx, input }) => {
            const task = await ctx.prisma.task.findFirst({where: {id: input.id, userId: ctx.session.user.id}})
            
            if (!task ) throw new TRPCError({code: "NOT_FOUND", message: "You do not have access to that task"})
            
            return ctx.prisma.task.update({
                where: {
                    id: input.id,
                },
                data: {
                    archived: input.archived ?? task.archived,
                    complete: input.complete ?? task.complete,
                    completedAt: task.completedAt ?? input.complete ? dayjs().toDate() : null
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