import fastifyCors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import fastify from 'fastify'
import { usersRoutes } from '@/http/controllers/users/routes'
import { gymsRoutes } from '@/http/controllers/gyms/routes'
import { checkInsRoutes } from './http/controllers/check-ins/routes'
import { swaggerSetup } from './lib/swagger'
import { jwtSetup } from './lib/jwt'

import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { errorHandler } from './http/controllers/_error/error-handle'

export const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCookie)

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

swaggerSetup(app)
jwtSetup(app)

app.register(fastifyCors)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)
