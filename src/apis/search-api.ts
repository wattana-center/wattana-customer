import { AxiosResponse } from 'axios'
import { CommonApi } from './instance'
import { SEARCH_BUSINESS_API } from '@app/config/common'
import { SearchRes } from './interface/place-search-interface'

class SearchApi extends CommonApi {
  constructor() {
    super()
    this.apiName = SEARCH_BUSINESS_API
  }

  async search(name: string): Promise<AxiosResponse<SearchRes>> {
    const query: string[][] = []

    query.push(['name', name])

    const params = new URLSearchParams(query)
    const response = this.instance().get<SearchRes>(this.apiName, {
      params: params
    })

    return response
  }
}

export { SearchApi }
