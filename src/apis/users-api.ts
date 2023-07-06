import { AxiosResponse } from 'axios'
import { CommonApi } from './instance'
import { SIGN_API } from '@app/config'

interface ResEmailVirificationResponse {
  code: number
  message: string
}

interface ResConfirmResponse {
  code: number
  message: string
}

interface ReqEmailVirification {
  email: string
}

class UsersApi extends CommonApi {
  constructor() {
    super()
    this.apiName = SIGN_API
  }

  async virifyEmail(
    data: ReqEmailVirification
  ): Promise<AxiosResponse<ResEmailVirificationResponse>> {
    const axios = this.instance()
    const result = await axios.post<ResEmailVirificationResponse>(
      this.apiName + '/send-verification',
      data
    )

    return result
  }

  async confirmEmail(
    secret_key: string
  ): Promise<AxiosResponse<ResConfirmResponse>> {
    const axios = this.instance()
    const result = await axios.post<ResConfirmResponse>(
      this.apiName + '/confirm-verification',
      {
        token: secret_key
      }
    )

    return result
  }
}

export { UsersApi }
