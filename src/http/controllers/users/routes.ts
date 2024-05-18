import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { authenticate } from './authenticate'
import { profile } from './profile'
import { register } from './register'
import { refresh } from './refresh'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export async function usersRoutes(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Create a new account',
        body: z.object({
          name: z.string(),
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          201: z.null(),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    register,
  )
  app.withTypeProvider<ZodTypeProvider>().post(
    '/sessions',
    {
      schema: {
        tags: ['Users'],
        summary: 'Authenticate with email and password',
        body: z.object({
          email: z.string().email(),
          password: z.string().min(6),
        }),
        response: {
          200: z.object({
            token: z.string(),
          }),
          400: z.object({
            message: z.string(),
          }),
        },
      },
    },
    authenticate,
  )

  app.withTypeProvider<ZodTypeProvider>().patch(
    '/token/refresh',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Users'],
        summary: 'Refresh token',
        security: [{ bearerAuth: [] }],
        response: {
          200: z.object({
            token: z.string(),
          }),
        },
      },
    },
    refresh,
  )

  /** Authenticated */
  app.withTypeProvider<ZodTypeProvider>().get(
    '/me',
    {
      onRequest: [verifyJwt],
      schema: {
        tags: ['Users'],
        summary: 'Get authenticated user profile',
        security: [{ bearerAuth: [] }],

        response: {
          200: z.object({
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string(),
              role: z.enum(['ADMIN', 'MEMBER']),
              created_at: z.date(),
            }),
          }),
        },
      },
    },
    profile,
  )
}
