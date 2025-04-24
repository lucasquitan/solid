import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/checkin-repository'

interface CheckinServiceRequest {
  userId: string
  gymId: string
}

interface CheckinServiceResponse {
  checkIn: CheckIn
}

export class CheckinService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    gymId,
  }: CheckinServiceRequest): Promise<CheckinServiceResponse> {
    const checkIn = await this.checkinsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    // TODO verify id user exists.
    return {
      checkIn,
    }
  }
}
