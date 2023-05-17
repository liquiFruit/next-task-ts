import { z } from "zod"
import { TRPCError } from "@trpc/server"
import dayjs from "dayjs"

import { createTRPCRouter, protectedProcedure } from "../trpc"


export const taskRouter = createTRPCRouter({
    getGroups: protectedProcedure
        .query(async ({ ctx }) => {
            return ctx.prisma.taskGroup.findMany({
                where: {
                    userId: ctx.session.user.id
                }
            })
        }),

    getTasks: protectedProcedure
        .input(z.object({ groupId: z.string() }))
        .query(async ({ ctx: { prisma, session }, input: { groupId } }) => {

            try {
                // Check to see that active user has access to the group
                await prisma.taskGroup.findFirstOrThrow({
                    where: {
                        userId: session.user.id,
                        id: groupId
                    }
                })
            } catch (error) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You are not authorized to access this group."
                })
            }

            // otherwise return the tasks in that group
            return prisma.task.findMany({
                where: {
                    taskGroupId: groupId
                }
            })
        }),

    create: protectedProcedure
        .input(z.object({ groupId: z.string(), title: z.string(), description: z.string().optional() }))
        .mutation(async ({ ctx: { prisma, session }, input: { groupId, title, description } }) => {
            try {
                // check if user has access to this group
                await prisma.taskGroup.findFirstOrThrow({
                    where: {
                        id: groupId,
                        userId: session.user.id
                    }
                })
            } catch (error) {
                throw new TRPCError({
                    code: "UNAUTHORIZED",
                    message: "You are not authorized to edit this group."
                })
            }

            return prisma.task.create({
                data: {
                    title,
                    description,
                    taskGroupId: groupId
                }
            })
        }),

    updateTask: protectedProcedure
        .input(z.object({
            id: z.string(),
            taskGroupId: z.string().optional(),
            complete: z.boolean().optional(),
            archived: z.boolean().optional()
        }))
        .mutation(async ({ ctx: { prisma, session }, input: newTask }) => {
            // Check: task exists
            const task = await prisma.task.findFirst({
                where: { id: newTask.id }
            })
            if (!task) throw new TRPCError({ code: "NOT_FOUND", message: "This task does not exist." })


            // Check: groups exists
            const groups = await prisma.taskGroup.findMany({ where: { OR: [{ id: task.taskGroupId }, { id: newTask.taskGroupId }] } })
            const currentGroup = groups.find(v => v.id === task.taskGroupId)
            const newGroup = groups.find(v => v.id === newTask.taskGroupId)

            if (!currentGroup || (newTask.taskGroupId && !newGroup))
                throw new TRPCError({ code: "NOT_FOUND", message: "A group specified does not exist." })


            // Check: user is authorized to edit tasks
            if (currentGroup.userId !== session.user.id || (newTask.taskGroupId && newGroup!.userId !== session.user.id))
                throw new TRPCError({ code: "UNAUTHORIZED", message: "You do not have access to a specified group." })


            // Finally: update the task
            return prisma.task.update({
                where: {
                    id: newTask.id,
                },
                data: {
                    ...newTask,
                    // omit the id property because that cant be updated    
                    ...{ id: undefined }
                }
            })
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const task = await ctx.prisma.task.findFirst({
                where: {
                    id: input.id,
                }
            })

            // Handle task not found
            if (!task) throw new TRPCError({
                code: "NOT_FOUND",
                message: "A task provided was not found."
            })

            // Check for 404 and 401 on group 
            const group = await ctx.prisma.taskGroup.findUnique({ where: { id: task.taskGroupId } })
            if (!group) throw new TRPCError({
                code: "NOT_FOUND",
                message: "A group provided was not found."
            })

            if (group.userId !== ctx.session.user.id) throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "You do not have access to a group provided."
            })


            return ctx.prisma.task.delete({
                where: {
                    id: input.id,
                }
            })
        })
})