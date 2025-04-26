import { InMemoryChekInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricService } from '@/services/get-user-metrics'

let checkInsRepository: InMemoryChekInsRepository
let sut: GetUserMetricService

describe('Get User Metrics Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryChekInsRepository()
    sut = new GetUserMetricService(checkInsRepository)
  })

  it('should be able to get the count of check-ins from an user', async () => {
    await checkInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user-01',
    })

    const { checkInsCount } = await sut.execute({
      userId: 'user-01',
    })

    expect(checkInsCount).toEqual(1)
  })
})
