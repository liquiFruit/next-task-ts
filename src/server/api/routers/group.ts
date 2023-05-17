import { z } from "zod"
import { TRPCError } from "@trpc/server"

import { createTRPCRouter, protectedProcedure } from "../trpc"


export const groupRouter = createTRPCRouter({
    get: protectedProcedure
        .input(z.string())
        .query(async ({ ctx, input }) => {
            const group = await ctx.prisma.taskGroup.findUnique({ where: { id: input } })

            if (!group) throw new TRPCError({ code: "NOT_FOUND", message: "Group not found." })

            if (ctx.session.user.id !== group.userId) throw new TRPCError({ code: "UNAUTHORIZED", message: "This is not your group." })
        
            return group
        })
})