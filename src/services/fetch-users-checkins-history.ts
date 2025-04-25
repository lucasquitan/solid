import { CheckInsRepository } from '@/repositories/checkin-repository'
import { CheckIn } from '@prisma/client'

export interface FetchUsersCheckinsHistoryServiceRequest {
  userId: string
  page: number
}

export interface FetchUsersCheckinsHistoryServiceResponse {
  checkins: CheckIn[]
}

export class FetchUsersCheckinsHistoryService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUsersCheckinsHistoryServiceRequest): Promise<FetchUsersCheckinsHistoryServiceResponse> {
    const checkins = await this.checkinsRepository.findManyByUserId(
      userId,
      page,
    )

    return { checkins }
  }
}
