import { describe, it, expect, beforeEach } from 'vitest'
import { CheckinService } from './checkin-service'
import { InMemoryChekInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'

let checkinsRepository: InMemoryChekInsRepository
let sut: CheckinService

describe('Check-in Service', () => {
  beforeEach(() => {
    checkinsRepository = new InMemoryChekInsRepository()
    sut = new CheckinService(checkinsRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym_01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
