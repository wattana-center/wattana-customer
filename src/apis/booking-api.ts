import { BookingRequest, BookingResponse } from './interface/booking-interface'

import { AxiosResponse } from 'axios'
import { BOOKING_API } from '@app/config/common'
import { CommonApi } from './instance'

class BookingApi extends CommonApi {
  constructor() {
    super()
    this.apiName = BOOKING_API
  }

  async save(query: BookingRequest): Promise<AxiosResponse<BookingResponse>> {
    const response = this.instance().post<BookingResponse>(this.apiName, query)
    return response
  }

  async update(
    id: string,
    query: BookingRequest
  ): Promise<AxiosResponse<BookingResponse>> {
    const uqu = {
      status: query.status,
      payment_status: query.payment_status,
      payment_refernces: query.payment_refernces
    }

    const response = this.instance().put<BookingResponse>(
      `${this.apiName}/${id}`,
      uqu
    )
    return response
  }
}

export { BookingApi }
