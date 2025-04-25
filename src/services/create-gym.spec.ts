import { describe, it, expect, beforeEach } from 'vitest'
import { CreateGymService } from './create-gym'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

let gymsRepository: InMemoryGymsRepository
let sut: CreateGymService

describe('Create Gym Service', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymService(gymsRepository)
  })

  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Gym',
      description: 'Gym description',
      phone: '1234567890',
      latitude: -22.8778784,
      longitude: -43.4237849,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
