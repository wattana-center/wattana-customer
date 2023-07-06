import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { CommonApi } from './instance'
import FormData from 'form-data'
import { OMISE_API } from '@app/config/common'
import { OMISE_PRIVATEKEY } from '@app/config/omise'
import { OmiseResponse } from './interface/omise-interface'

type OmiseCharges = {
  amount: string
  currency: string
  card: string
}

class OmiseApi extends CommonApi {
  constructor() {
    super()
    this.apiName = OMISE_API
  }

  async charges(query: OmiseCharges): Promise<AxiosResponse<OmiseResponse>> {
    const formData = new FormData()
    formData.append('amount', `${query.amount}`)
    formData.append('card', query.card)
    formData.append('currency', query.currency)

    const config: AxiosRequestConfig = {
      auth: {
        username: OMISE_PRIVATEKEY,
        password: ''
      }
    }

    const response = axios
      .create({
        headers: formData.getHeaders()
      })
      .post<OmiseResponse>(this.apiName, formData, config)
    return response
  }
}

export { OmiseApi }
