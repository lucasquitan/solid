import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckinService } from './checkin-service'
import { InMemoryChekInsRepository } from '@/repositories/in-memory/in-memory-checkins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { MaxDistanceError } from './errors/max-distance-error'

let checkInsRepository: InMemoryChekInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckinService

describe('Check-in Service', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryChekInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckinService(checkInsRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gym_01',
      title: 'Gym',
      description: '',
      phone: '',
      latitude: -22.8778784,
      longitude: -43.4237849,
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in on near gym', async () => {
    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym_01',
      userLatitude: -22.8778784,
      userLongitude: -43.4237849,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    await gymsRepository.gyms.push({
      id: 'gym_02',
      title: 'Far Gym',
      description: '',
      phone: '',
      latitude: new Decimal(-22.2466603),
      longitude: new Decimal(-42.0209147),
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym_02',
        userLatitude: -22.8778784,
        userLongitude: -43.4237849,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym_01',
      userLatitude: -22.8778784,
      userLongitude: -43.4237849,
    })

    await expect(
      sut.execute({
        userId: 'user-01',
        gymId: 'gym_01',
        userLatitude: -22.8778784,
        userLongitude: -43.4237849,
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice in different days', async () => {
    vi.setSystemTime(new Date(2025, 0, 1, 8, 0, 0))

    await sut.execute({
      userId: 'user-01',
      gymId: 'gym_01',
      userLatitude: -22.8778784,
      userLongitude: -43.4237849,
    })

    vi.setSystemTime(new Date(2025, 0, 2, 8, 0, 0))

    const { checkIn } = await sut.execute({
      userId: 'user-01',
      gymId: 'gym_01',
      userLatitude: -22.8778784,
      userLongitude: -43.4237849,
    })

    expect(checkIn.user_id).toEqual(expect.any(String))
  })
})
