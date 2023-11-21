import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe('Create Gym Use case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(gymsRepository)
  })

  it('should be able to gym', async () => {
    const { gym } = await sut.execute({
      title: 'Javascript gym',
      description: '',
      phone: '',
      latitude: -23.6296181,
      longitude: -46.8109733,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
