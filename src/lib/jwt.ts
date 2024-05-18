import { env } from '@/env'
import fastifyJwt from '@fastify/jwt'
import type { FastifyInstance } from 'fastify'

export async function jwtSetup(app: FastifyInstance) {
  app.register(fastifyJwt, {
    secret: env.JWT_SECRET,
    cookie: {
      cookieName: 'refreshToken',
      signed: false,
    },
    sign: {
      expiresIn: '10m',
    },
  })
}
