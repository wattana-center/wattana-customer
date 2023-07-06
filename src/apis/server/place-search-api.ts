import axios, { AxiosResponse } from 'axios'

import { CommonApi } from '@app/apis/instance'
import { PlaceSearchRes } from '@app/apis/interface/place-search-interface'

class PlaceSearchApi extends CommonApi {
  constructor() {
    super()
    this.apiName = `https://maps.googleapis.com/maps/api/place/textsearch/json`
  }

  async search(query: string): Promise<AxiosResponse<PlaceSearchRes>> {
    const data: string[][] = []

    data.push(['query', query])
    data.push(['type', 'locality'])
    data.push(['language', 'th'])
    data.push(['key', 'AIzaSyBFpr6uzPGENaVmBbWdRcPdrBNxzhn08hU'])

    const params = new URLSearchParams(data)

    const response = axios.get<PlaceSearchRes>(this.apiName, {
      params: params
    })

    return response
  }
}

export { PlaceSearchApi }
