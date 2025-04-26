import { CheckInsRepository } from '@/repositories/checkin-repository'

export interface GetUserMetricsServiceRequest {
  userId: string
}

export interface GetUserMetricServiceResponse {
  checkInsCount: number
}

export class GetUserMetricService {
  constructor(private checkinsRepository: CheckInsRepository) {}

  async execute({
    userId,
  }: GetUserMetricsServiceRequest): Promise<GetUserMetricServiceResponse> {
    const checkInsCount = await this.checkinsRepository.countByUserId(userId)

    return { checkInsCount }
  }
}
