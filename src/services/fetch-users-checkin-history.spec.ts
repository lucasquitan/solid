import { InMemoryChekInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUsersCheckinsHistoryService } from './fetch-users-checkins-history'
let checkInsRepository: InMemoryChekInsRepository

let sut: FetchUsersCheckinsHistoryService

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryChekInsRepository()
    sut = new FetchUsersCheckinsHistoryService(checkInsRepository)
  })

  it('should be able to fetch check-in history from an user', async () => {
    await checkInsRepository.create({
      gym_id: 'gym_01',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym_02',
      user_id: 'user-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym_03',
      user_id: 'user-02',
    })

    const { checkins } = await sut.execute({
      userId: 'user-01',
      page: 1,
    })

    expect(checkins).toHaveLength(2)
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: 'gym_01' }),
      expect.objectContaining({ gym_id: 'gym_02' }),
    ])
  })

  it('shoulb be able to fetch paginated check-in history from an user', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInsRepository.create({
        gym_id: `gym_${i}`,
        user_id: 'user-01',
      })
    }

    const { checkins } = await sut.execute({
      userId: 'user-01',
      page: 2,
    })

    expect(checkins).toHaveLength(2)
    expect(checkins).toEqual([
      expect.objectContaining({ gym_id: 'gym_21' }),
      expect.objectContaining({ gym_id: 'gym_22' }),
    ])
  })
})
