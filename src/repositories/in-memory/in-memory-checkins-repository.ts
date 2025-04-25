import { Prisma, CheckIn } from '@prisma/client'
import { CheckInsRepository } from '../checkin-repository'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryChekInsRepository implements CheckInsRepository {
  public checkins: CheckIn[] = []

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
    }

    this.checkins.push(checkIn)
    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('day').toDate()
    const endOfTheDay = dayjs(date).endOf('day').toDate()

    const checkInOnSameDate = this.checkins.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }
}
