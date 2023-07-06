import { NextApiRequest, NextApiResponse } from 'next'

import { unsetAuthCookies } from 'next-firebase-auth'

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await unsetAuthCookies(req, res)
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ status: true })
}

export default handler
