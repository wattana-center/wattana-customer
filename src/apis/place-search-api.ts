import axios, { AxiosResponse } from 'axios'

import { CommonApi } from '@app/apis/instance'
import { PlaceSearchRes } from '@app/apis/interface/place-search-interface'

class PlaceSearchApi extends CommonApi {
  constructor() {
    super()
    this.apiName = `/api/google-place-search`
  }

  async search(query: string): Promise<AxiosResponse<PlaceSearchRes>> {
    const data: string[][] = []

    data.push(['input', query])

    const params = new URLSearchParams(data)

    const response = axios.get<PlaceSearchRes>(this.apiName, {
      params: params,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers':
          'Origin, X-Requested-With, Content-Type, Accept, Authorization'
      }
    })

    return response
  }
}

export { PlaceSearchApi }
