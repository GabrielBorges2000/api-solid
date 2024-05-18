import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { create } from './create'
import { validate } from './validate'
import { history } from './history'
import { metrics } from './metrics'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.withTypeProvider<ZodTypeProvider>().get(
    '/check-ins/history',
    {
      schema: {
        tags: ['CheckIns'],
        summary: 'Search for checkins history to user',
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            checkIns: z.array(
              z.object({
                id: z.string(),
                created_at: z.date(),
                validated_at: z.date().nullable(),
                user_id: z.string(),
                gym_id: z.string(),
              }),
            ),
          }),
        },
      },
    },
    history,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/check-ins/metrics',
    {
      schema: {
        tags: ['CheckIns'],
        summary: ' Amount checkins a user realized',
        response: {
          200: z.object({
            checkInsCount: z.number(),
          }),
        },
      },
    },
    metrics,
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/gyms/:gymId/check-ins',
    {
      schema: {
        tags: ['CheckIns'],
        summary: 'Create a checkin to gym',
        params: z.object({
          gymId: z.string().uuid(),
        }),
        body: z.object({
          latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
          }),
          longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
          }),
        }),
        response: {
          200: z.null(),
        },
      },
    },
    create,
  )

  app.withTypeProvider<ZodTypeProvider>().patch(
    '/check-ins/:checkInId/validate',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['CheckIns'],
        summary: 'Validate a checkin to gym',
        params: z.object({
          checkInId: z.string().uuid(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    validate,
  )
}
