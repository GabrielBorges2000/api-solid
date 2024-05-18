import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { search } from './search'
import { nearby } from './nearby'
import { create } from './create'
import { verifyUserRole } from '@/http/middlewares/verify-user-role'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { Gym } from '@prisma/client'

export async function gymsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)

  app.withTypeProvider<ZodTypeProvider>().post(
    '/gyms',
    {
      onRequest: [verifyUserRole('ADMIN')],
      schema: {
        tags: ['Gyms'],
        summary: 'Create a new gym',
        body: z.object({
          title: z.string(),
          description: z.string().nullable(),
          phone: z.string().nullable(),
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

  app.withTypeProvider<ZodTypeProvider>().get(
    '/gyms/search',
    {      
      schema: {
        tags: ['Gyms'],
        summary: 'Search for gyms for title',
        querystring: z.object({
          q: z.string(),
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            gyms: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                phone: z.string().nullable(),
                latitude: z.coerce.string(),
                longitude: z.coerce.string(),
              })
            ),
          }),
        },

      },
    },
    search,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/gyms/nearby',
    {
      schema: {
        tags: ['Gyms'],
        summary: 'Search for gyms to nearby',
        querystring: z.object({
          latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90
          }),
          longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
          }),
        }),
        response: {
          200: z.object({
            gyms: z.array(
              z.object({
                id: z.string(),
                title: z.string(),
                description: z.string().nullable(),
                phone: z.string().nullable(),
                latitude: z.coerce.string(),
                longitude: z.coerce.string(),
              })
            ),
          }),
        },
      },
    },
    nearby,
  )
}
