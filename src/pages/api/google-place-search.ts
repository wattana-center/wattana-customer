import { NextApiRequest, NextApiResponse } from 'next'

import { PlaceSearchApi } from '@app/apis/server/place-search-api'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    const placeApi = new PlaceSearchApi()
    const response = await placeApi.search(req.query.input as string)

    if (response.status === 200) {
      return res.status(200).json(response.data)
    } else {
      return res.status(500).json({ error: 'Unexpected error.' })
    }
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' })
  }
}

export default handler
