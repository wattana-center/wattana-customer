import { AxiosResponse } from 'axios'
import { BUSINESS_API } from '@app/config/common'
import { BusinessGetAllRes } from './interface/business-interface'
import { CommonApi } from './instance'

export interface GetAll {
  name: string
  lat?: string
  lng?: string
  page?: string
  pagesize?: string
  end_date?: string
  start_date?: string
}

class BusinessApi extends CommonApi {
  constructor() {
    super()
    this.apiName = BUSINESS_API
  }

  async search(query: GetAll): Promise<AxiosResponse<BusinessGetAllRes>> {
    const data: string[][] = []

    if (query.page && query.pagesize) {
      data.push(['page', query.page], ['pagesize', query.pagesize])
    }
    if (query.name) {
      data.push(['name', query.name])
    }
    if (query.lat) {
      data.push(['lat', query.lat])
    }
    if (query.lng) {
      data.push(['lng', query.lng])
    }

    if (query.end_date) {
      data.push(['end_date', query.end_date])
    }

    if (query.start_date) {
      data.push(['start_date', query.start_date])
    }

    const params = new URLSearchParams(data)

    const response = this.instance().get<BusinessGetAllRes>(this.apiName, {
      params: params
    })

    return response
  }
}

export { BusinessApi }
